
-- Create 4 users
INSERT INTO
    auth.users (
        instance_id,
        id,
        aud,
        role,
        email,
        encrypted_password,
        email_confirmed_at,
        recovery_sent_at,
        last_sign_in_at,
        raw_app_meta_data,
        raw_user_meta_data,
        created_at,
        updated_at,
        confirmation_token,
        email_change,
        email_change_token_new,
        recovery_token
    )
SELECT
    '00000000-0000-0000-0000-000000000000',
    uuid_generate_v4 (),
    'authenticated',
    'authenticated',
    'user' || i || '@example.com',
    crypt ('password123', gen_salt ('bf')),
    current_timestamp,
    current_timestamp,
    current_timestamp,
    '{"provider":"email","providers":["email"]}',
    '{}',
    current_timestamp,
    current_timestamp,
    '',
    '',
    '',
    ''
FROM
    generate_series(1, 20) AS t (i);

-- Update account data for each user
UPDATE basejump.accounts
SET
    public_metadata = jsonb_build_object(
        'image', 'cld-sample',
        'phone', '089123456780'
    )
WHERE
    id IN (
        SELECT id
        FROM auth.users
        WHERE email != 'super@example.com'
    );


-- Create 4 identities, one for each user exept superuser
INSERT INTO
    auth.identities (
        id,
        user_id,
        provider_id,
        identity_data,
        provider,
        last_sign_in_at,
        created_at,
        updated_at
    )
SELECT
    uuid_generate_v4 (),
    id,
    id,
    ('{"sub":"' || id :: text || '","email":"' || email || '"}') :: jsonb,
    'email',
    current_timestamp,
    current_timestamp,
    current_timestamp
FROM
    (SELECT * FROM auth.users WHERE email != 'super@example.com') u;

-- Disable the trigger function
ALTER TABLE basejump.accounts DISABLE TRIGGER basejump_set_accounts_user_tracking;

-- This DO block creates Business users with specific data
-- It loops through the created users (5-20), logs in as each user,
-- creates a Business using the create_account function,
-- and updates the metadata of the created account with the specified data
-- (image: cld-example-4, phone: 08999999999 + the loop counter)
DO $$
DECLARE
    account_result jsonb;
    account_id uuid;
BEGIN
    FOR i IN 5..20
    LOOP
        -- log in as the user
        RAISE NOTICE 'Logging in as user %', 'user' || i || '@example.com';
        CALL auth.login_as_user('user' || i || '@example.com');

        -- create a Business for the user
        RAISE NOTICE 'Creating Business for user %', 'user' || i || '@example.com';
        account_result := create_account('Production User ' || i, 'business-user-' || i);

        -- update the metadata of the created account
        RAISE NOTICE 'Updating metadata of created account for user %', 'user' || i || '@example.com';
        account_id := (account_result->>'account_id')::uuid;
        UPDATE basejump.accounts
        SET public_metadata = jsonb_build_object(
            'business_image', 'cld-sample-4',
            'business_phone', '08888888880' || i
        )
        WHERE id = account_id;

        -- log out
        RAISE NOTICE 'Logging out';
        CALL auth.logout();
    END LOOP;
END $$;

DO $$
DECLARE
    account_result jsonb;
    account_id uuid;
BEGIN
    -- This block of code creates Business users with specific data
    -- It logs in as each user, creates a Business using the create_account function,
    -- and updates the metadata of the created account with the specified data

    -- Create Mang Ijal Business Account
    CALL auth.login_as_user('user1@example.com');
    account_result := create_account('Mang Ijal', 'ijal-production');
    account_id := (account_result->>'account_id')::uuid;
    UPDATE basejump.accounts set public_metadata = jsonb_build_object(
                    'business_image', 'cld-sample-5',
                    'business_phone', '089999999909'
                ) where id = account_id;
    CALL auth.logout();

    -- Create Mang Usep Business Account
    CALL auth.login_as_user('user2@example.com');
    account_result := create_account('Mang Usep', 'usep-konveksi');
    account_id := (account_result->>'account_id')::uuid;
    UPDATE basejump.accounts set public_metadata = jsonb_build_object(
                    'business_image', 'cld-sample-4',
                    'business_phone', '089999999908'
                ) where id = account_id;
    CALL auth.logout();

    -- Create Amc Production Business Account
    CALL auth.login_as_user('user3@example.com');
    account_result := create_account('Amc Production', 'amc-production');
    account_id := (account_result->>'account_id')::uuid;
    UPDATE basejump.accounts set public_metadata = jsonb_build_object(
                    'business_image', 'cld-sample-3',
                    'business_phone', '089999999907'
                ) where id = account_id;
    CALL auth.logout();

    -- Create Bmx Production Business Account
    CALL auth.login_as_user('user4@example.com');
    account_result := create_account('Bmx Production', 'bmx-production');
    account_id := (account_result->>'account_id')::uuid;
    UPDATE basejump.accounts set public_metadata = jsonb_build_object(
                    'business_image', 'cld-sample-2',
                    'business_phone', '089999999906'
                ) where id = account_id;
    CALL auth.logout();
END $$;
-- Enable the trigger function
ALTER TABLE basejump.accounts ENABLE TRIGGER basejump_set_accounts_user_tracking;