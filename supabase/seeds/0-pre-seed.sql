GRANT anon, authenticated TO postgres;

CREATE OR REPLACE PROCEDURE auth.login_as_user (user_email TEXT)
    LANGUAGE plpgsql
    AS $$
DECLARE
    auth_user auth.users;
BEGIN
    SELECT
        * INTO auth_user
    FROM
        auth.users
    WHERE
        email = user_email;
    EXECUTE FORMAT('SET request.jwt.claim.sub=%L', (auth_user).id::TEXT);
    EXECUTE FORMAT('SET request.jwt.claim.role=%I', (auth_user).role);
    EXECUTE FORMAT('SET request.jwt.claim.email=%L', (auth_user).email);
    EXECUTE FORMAT('SET request.jwt.claims=%L', json_strip_nulls(json_build_object('app_metadata', (auth_user).raw_app_meta_data))::TEXT);

    RAISE NOTICE '%', FORMAT('SET ROLE %I; -- logging in as %L (%L)', (auth_user).role, (auth_user).id, (auth_user).email);
    EXECUTE FORMAT('SET ROLE %I', (auth_user).role);
END;
$$;

CREATE OR REPLACE PROCEDURE auth.login_as_anon ()
    LANGUAGE plpgsql
    AS $$
BEGIN
    SET request.jwt.claim.sub='';
    SET request.jwt.claim.role='';
    SET request.jwt.claim.email='';
    SET request.jwt.claims='';
    SET ROLE anon;
END;
$$;

CREATE OR REPLACE PROCEDURE auth.logout ()
    LANGUAGE plpgsql
    AS $$
BEGIN
    SET request.jwt.claim.sub='';
    SET request.jwt.claim.role='';
    SET request.jwt.claim.email='';
    SET request.jwt.claims='';
    SET ROLE postgres;
END;
$$;

GRANT EXECUTE ON PROCEDURE auth.logout() TO authenticated;