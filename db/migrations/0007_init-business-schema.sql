CREATE SCHEMA "business";
--> statement-breakpoint
 
GRANT USAGE ON SCHEMA business TO service_role;
GRANT ALL ON SCHEMA business TO postgres;
GRANT USAGE ON SCHEMA business TO authenticated;

--
-- Create run_new_user_business_setup function
--
/**
  * Before a user signs up, we need to create a personal account for them
  * and add them to the account_user table so they can act on it
 */
create or replace function business.run_new_user_business_setup()
    returns trigger
    language plpgsql
    security definer
    set search_path = public
as
$$
DECLARE
    sys_account_id uuid;
begin
    -- first check if user meta includes a business account dataset
    -- if so, we want to create an basejump team account for them
    if NEW.raw_user_meta_data->>'business_name' IS NOT NULL AND NEW.raw_user_meta_data->>'slug' IS NOT NULL then
      -- create the new users's team account
      select id into sys_account_id from auth.users where email = 'super@example.com' limit 1;
      
      insert into basejump.accounts (slug, name, primary_owner_user_id, private_metadata, public_metadata)
      values (
        NEW.raw_user_meta_data->>'slug',
        NEW.raw_user_meta_data->>'business_name',
        sys_account_id,
        json_build_object(
          'real_owner', NEW.email
        ),
        json_build_object(
          'business_phone', NEW.raw_user_meta_data->>'business_phone',
          'business_image', NEW.raw_user_meta_data->>'logo'
        )
      );

    end if;
    return NEW;
EXCEPTION
    WHEN unique_violation THEN
        raise exception 'An account with that unique ID already exists';
end;
$$;

-- trigger the function every time a user is created
create trigger before_create_auth_user
    before insert
    on auth.users
    for each row
execute procedure business.run_new_user_business_setup();

--
-- Create run_update_new_user_business function
--
/**
  * After a user signs up, we need to update the basejump team account for them
 */
create or replace function business.run_update_new_user_business()
    returns trigger
    language plpgsql
    security definer
    set search_path = public
as
$$
declare
    new_account_id uuid;
BEGIN
    -- first check basejump user account has a business account
    -- owner by new user
    IF EXISTS(SELECT 1
                FROM basejump.accounts a
                WHERE a.private_metadata->>'real_owner' = NEW.email
              ) THEN

        UPDATE basejump.accounts
        SET (
          primary_owner_user_id,
          private_metadata
        ) = (
          NEW.id, 
          private_metadata - 'real_owner'
        )
        WHERE private_metadata->>'real_owner' = NEW.email
        RETURNING id INTO new_account_id;

        UPDATE basejump.account_user au
        SET user_id = NEW.id
        WHERE au.account_id = new_account_id;

        insert into basejump.account_user (account_id, user_id, account_role)
        values (new_account_id, NEW.id, 'owner');
    end if;
    return NEW;
end;
$$;

-- trigger the function every time a user is created
create trigger after_create_auth_user_with_business
    after insert
    on auth.users
    for each row
execute procedure business.run_update_new_user_business();

CREATE OR REPLACE FUNCTION clear_custom_user_meta_data()
RETURNS TRIGGER
LANGUAGE plpgsql
security definer set search_path = public
AS $$
/**
 * After a user confirms their email, remove any custom user metadata
 * that was set before the user confirmed their email.
 *
 * This is done because, before a user confirms their email, we can't
 * be sure that the email is valid, and we don't want to let users set
 * arbitrary data on themselves before they've confirmed their email.
 *
 * This function is called as a trigger after the user confirms their
 * email.
 */
BEGIN 
  IF (NEW.confirmation_sent_at IS NOT NULL AND OLD.confirmation_sent_at IS NULL) THEN
    /**
     * If the user has just confirmed their email,
     * remove the custom user metadata that was set before
     * the user confirmed their email.
     */
    UPDATE auth.users
    SET
      /**
       * Remove the account related fields from the raw_user_meta_data
       */
      raw_user_meta_data = raw_user_meta_data - 'business_name' - 'slug' - 'logo' - 'business_phone' - 'email' - 'name' - 'avatar' - 'phone'
    WHERE id = NEW.id;
  END IF;

  RETURN NEW;
END;
$$;

/**
 * Trigger to call the above function after a user confirms their email.
 */
CREATE TRIGGER clear_custom_user_meta_data_trigger
AFTER UPDATE ON auth.users
FOR EACH ROW
EXECUTE FUNCTION clear_custom_user_meta_data();
