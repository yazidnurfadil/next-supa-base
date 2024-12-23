-- Create super user
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
    'super@example.com',
    crypt ('superpassword123', gen_salt ('bf')),
    current_timestamp,
    current_timestamp,
    current_timestamp,
    '{"provider":"email","providers":["email"]}',
    '{"avatar":"samples/man-portrait","phone":"08000000000"}',
    current_timestamp,
    current_timestamp,
    '',
    '',
    '',
    '';

UPDATE basejump.account_user au
SET account_role = 'super'
FROM auth.users u
WHERE au.user_id = u.id AND u.email = 'super@example.com';
