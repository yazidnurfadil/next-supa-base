import { sql } from "drizzle-orm/sql";
import {
  text,
  uuid,
  json,
  inet,
  jsonb,
  check,
  index,
  unique,
  boolean,
  varchar,
  pgSchema,
  smallint,
  timestamp,
  bigserial,
  foreignKey,
  uniqueIndex,
} from "drizzle-orm/pg-core";

// Create basejump schema
const authSchemaName = "auth";
export const authSchema = pgSchema(authSchemaName);

export const aalLevelInAuth = authSchema.enum("aal_level", [
  "aal1",
  "aal2",
  "aal3",
]);
export const codeChallengeMethodInAuth = authSchema.enum(
  "code_challenge_method",
  ["s256", "plain"]
);
export const factorStatusInAuth = authSchema.enum("factor_status", [
  "unverified",
  "verified",
]);
export const factorTypeInAuth = authSchema.enum("factor_type", [
  "totp",
  "webauthn",
  "phone",
]);
export const oneTimeTokenTypeInAuth = authSchema.enum("one_time_token_type", [
  "confirmation_token",
  "reauthentication_token",
  "recovery_token",
  "email_change_token_new",
  "email_change_token_current",
  "phone_change_token",
]);

export const schemaMigrationsInAuth = authSchema.table("schema_migrations", {
  version: varchar({ length: 255 }).primaryKey().notNull(),
});

export const instancesInAuth = authSchema.table("instances", {
  uuid: uuid(),
  id: uuid().primaryKey().notNull(),
  rawBaseConfig: text("raw_base_config"),
  createdAt: timestamp("created_at", { mode: "string", withTimezone: true }),
  updatedAt: timestamp("updated_at", { mode: "string", withTimezone: true }),
});

export const usersInAuth = authSchema.table(
  "users",
  {
    aud: varchar({ length: 255 }),
    role: varchar({ length: 255 }),
    instanceId: uuid("instance_id"),
    email: varchar({ length: 255 }),
    phone: text().default(sql`NULL`),
    id: uuid().primaryKey().notNull(),
    isSuperAdmin: boolean("is_super_admin"),
    rawAppMetaData: jsonb("raw_app_meta_data"),
    rawUserMetaData: jsonb("raw_user_meta_data"),
    phoneChange: text("phone_change").default(""),
    emailChange: varchar("email_change", { length: 255 }),
    recoveryToken: varchar("recovery_token", { length: 255 }),
    isSsoUser: boolean("is_sso_user").default(false).notNull(),
    isAnonymous: boolean("is_anonymous").default(false).notNull(),
    encryptedPassword: varchar("encrypted_password", { length: 255 }),
    confirmationToken: varchar("confirmation_token", { length: 255 }),
    emailChangeTokenNew: varchar("email_change_token_new", { length: 255 }),
    invitedAt: timestamp("invited_at", { mode: "string", withTimezone: true }),
    createdAt: timestamp("created_at", { mode: "string", withTimezone: true }),
    updatedAt: timestamp("updated_at", { mode: "string", withTimezone: true }),
    deletedAt: timestamp("deleted_at", { mode: "string", withTimezone: true }),
    phoneChangeToken: varchar("phone_change_token", { length: 255 }).default(
      ""
    ),
    emailChangeConfirmStatus: smallint("email_change_confirm_status").default(
      0
    ),
    bannedUntil: timestamp("banned_until", {
      mode: "string",
      withTimezone: true,
    }),
    reauthenticationToken: varchar("reauthentication_token", {
      length: 255,
    }).default(""),
    lastSignInAt: timestamp("last_sign_in_at", {
      mode: "string",
      withTimezone: true,
    }),
    recoverySentAt: timestamp("recovery_sent_at", {
      mode: "string",
      withTimezone: true,
    }),
    emailChangeTokenCurrent: varchar("email_change_token_current", {
      length: 255,
    }).default(""),
    emailConfirmedAt: timestamp("email_confirmed_at", {
      mode: "string",
      withTimezone: true,
    }),
    phoneConfirmedAt: timestamp("phone_confirmed_at", {
      mode: "string",
      withTimezone: true,
    }),
    emailChangeSentAt: timestamp("email_change_sent_at", {
      mode: "string",
      withTimezone: true,
    }),
    phoneChangeSentAt: timestamp("phone_change_sent_at", {
      mode: "string",
      withTimezone: true,
    }),
    confirmationSentAt: timestamp("confirmation_sent_at", {
      mode: "string",
      withTimezone: true,
    }),
    reauthenticationSentAt: timestamp("reauthentication_sent_at", {
      mode: "string",
      withTimezone: true,
    }),
    confirmedAt: timestamp("confirmed_at", {
      mode: "string",
      withTimezone: true,
    }).generatedAlwaysAs(sql`LEAST(email_confirmed_at, phone_confirmed_at)`),
  },
  (table) => [
    uniqueIndex("confirmation_token_idx")
      .using("btree", table.confirmationToken.asc().nullsLast().op("text_ops"))
      .where(sql`((confirmation_token)::text !~ '^[0-9 ]*$'::text)`),
    uniqueIndex("email_change_token_current_idx")
      .using(
        "btree",
        table.emailChangeTokenCurrent.asc().nullsLast().op("text_ops")
      )
      .where(sql`((email_change_token_current)::text !~ '^[0-9 ]*$'::text)`),
    uniqueIndex("email_change_token_new_idx")
      .using(
        "btree",
        table.emailChangeTokenNew.asc().nullsLast().op("text_ops")
      )
      .where(sql`((email_change_token_new)::text !~ '^[0-9 ]*$'::text)`),
    uniqueIndex("reauthentication_token_idx")
      .using(
        "btree",
        table.reauthenticationToken.asc().nullsLast().op("text_ops")
      )
      .where(sql`((reauthentication_token)::text !~ '^[0-9 ]*$'::text)`),
    uniqueIndex("recovery_token_idx")
      .using("btree", table.recoveryToken.asc().nullsLast().op("text_ops"))
      .where(sql`((recovery_token)::text !~ '^[0-9 ]*$'::text)`),
    uniqueIndex("users_email_partial_key")
      .using("btree", table.email.asc().nullsLast().op("text_ops"))
      .where(sql`(is_sso_user = false)`),
    index("users_instance_id_email_idx").using(
      "btree",
      sql`instance_id`,
      sql`null`
    ),
    index("users_instance_id_idx").using(
      "btree",
      table.instanceId.asc().nullsLast().op("uuid_ops")
    ),
    index("users_is_anonymous_idx").using(
      "btree",
      table.isAnonymous.asc().nullsLast().op("bool_ops")
    ),
    unique("users_phone_key").on(table.phone),
    check(
      "users_email_change_confirm_status_check",
      sql`(email_change_confirm_status >= 0) AND (email_change_confirm_status <= 2)`
    ),
  ]
);

export const auditLogEntriesInAuth = authSchema.table(
  "audit_log_entries",
  {
    payload: json(),
    instanceId: uuid("instance_id"),
    id: uuid().primaryKey().notNull(),
    ipAddress: varchar("ip_address", { length: 64 }).default("").notNull(),
    createdAt: timestamp("created_at", { mode: "string", withTimezone: true }),
  },
  (table) => [
    index("audit_logs_instance_id_idx").using(
      "btree",
      table.instanceId.asc().nullsLast().op("uuid_ops")
    ),
  ]
);

export const samlRelayStatesInAuth = authSchema.table(
  "saml_relay_states",
  {
    forEmail: text("for_email"),
    redirectTo: text("redirect_to"),
    id: uuid().primaryKey().notNull(),
    flowStateId: uuid("flow_state_id"),
    requestId: text("request_id").notNull(),
    ssoProviderId: uuid("sso_provider_id").notNull(),
    createdAt: timestamp("created_at", { mode: "string", withTimezone: true }),
    updatedAt: timestamp("updated_at", { mode: "string", withTimezone: true }),
  },
  (table) => [
    index("saml_relay_states_created_at_idx").using(
      "btree",
      table.createdAt.desc().nullsFirst().op("timestamptz_ops")
    ),
    index("saml_relay_states_for_email_idx").using(
      "btree",
      table.forEmail.asc().nullsLast().op("text_ops")
    ),
    index("saml_relay_states_sso_provider_id_idx").using(
      "btree",
      table.ssoProviderId.asc().nullsLast().op("uuid_ops")
    ),
    foreignKey({
      columns: [table.ssoProviderId],
      foreignColumns: [ssoProvidersInAuth.id],
      name: "saml_relay_states_sso_provider_id_fkey",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.flowStateId],
      foreignColumns: [flowStateInAuth.id],
      name: "saml_relay_states_flow_state_id_fkey",
    }).onDelete("cascade"),
    check("request_id not empty", sql`char_length(request_id) > 0`),
  ]
);

export const refreshTokensInAuth = authSchema.table(
  "refresh_tokens",
  {
    revoked: boolean(),
    sessionId: uuid("session_id"),
    instanceId: uuid("instance_id"),
    token: varchar({ length: 255 }),
    parent: varchar({ length: 255 }),
    userId: varchar("user_id", { length: 255 }),
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    createdAt: timestamp("created_at", { mode: "string", withTimezone: true }),
    updatedAt: timestamp("updated_at", { mode: "string", withTimezone: true }),
  },
  (table) => [
    index("refresh_tokens_instance_id_idx").using(
      "btree",
      table.instanceId.asc().nullsLast().op("uuid_ops")
    ),
    index("refresh_tokens_instance_id_user_id_idx").using(
      "btree",
      table.instanceId.asc().nullsLast().op("uuid_ops"),
      table.userId.asc().nullsLast().op("text_ops")
    ),
    index("refresh_tokens_parent_idx").using(
      "btree",
      table.parent.asc().nullsLast().op("text_ops")
    ),
    index("refresh_tokens_session_id_revoked_idx").using(
      "btree",
      table.sessionId.asc().nullsLast().op("uuid_ops"),
      table.revoked.asc().nullsLast().op("bool_ops")
    ),
    index("refresh_tokens_updated_at_idx").using(
      "btree",
      table.updatedAt.desc().nullsFirst().op("timestamptz_ops")
    ),
    foreignKey({
      columns: [table.sessionId],
      foreignColumns: [sessionsInAuth.id],
      name: "refresh_tokens_session_id_fkey",
    }).onDelete("cascade"),
    unique("refresh_tokens_token_unique").on(table.token),
  ]
);

export const sessionsInAuth = authSchema.table(
  "sessions",
  {
    ip: inet(),
    tag: text(),
    aal: aalLevelInAuth(),
    factorId: uuid("factor_id"),
    userAgent: text("user_agent"),
    id: uuid().primaryKey().notNull(),
    userId: uuid("user_id").notNull(),
    refreshedAt: timestamp("refreshed_at", { mode: "string" }),
    notAfter: timestamp("not_after", { mode: "string", withTimezone: true }),
    createdAt: timestamp("created_at", { mode: "string", withTimezone: true }),
    updatedAt: timestamp("updated_at", { mode: "string", withTimezone: true }),
  },
  (table) => [
    index("sessions_not_after_idx").using(
      "btree",
      table.notAfter.desc().nullsFirst().op("timestamptz_ops")
    ),
    index("sessions_user_id_idx").using(
      "btree",
      table.userId.asc().nullsLast().op("uuid_ops")
    ),
    index("user_id_created_at_idx").using(
      "btree",
      table.userId.asc().nullsLast().op("uuid_ops"),
      table.createdAt.asc().nullsLast().op("uuid_ops")
    ),
    foreignKey({
      columns: [table.userId],
      name: "sessions_user_id_fkey",
      foreignColumns: [usersInAuth.id],
    }).onDelete("cascade"),
  ]
);

export const ssoProvidersInAuth = authSchema.table(
  "sso_providers",
  {
    resourceId: text("resource_id"),
    id: uuid().primaryKey().notNull(),
    createdAt: timestamp("created_at", { mode: "string", withTimezone: true }),
    updatedAt: timestamp("updated_at", { mode: "string", withTimezone: true }),
  },
  (_table) => [
    uniqueIndex("sso_providers_resource_id_idx").using(
      "btree",
      sql`lower(resource_id)`
    ),
    check(
      "resource_id not empty",
      sql`(resource_id = NULL::text) OR (char_length(resource_id) > 0)`
    ),
  ]
);

export const ssoDomainsInAuth = authSchema.table(
  "sso_domains",
  {
    domain: text().notNull(),
    id: uuid().primaryKey().notNull(),
    ssoProviderId: uuid("sso_provider_id").notNull(),
    createdAt: timestamp("created_at", { mode: "string", withTimezone: true }),
    updatedAt: timestamp("updated_at", { mode: "string", withTimezone: true }),
  },
  (table) => [
    uniqueIndex("sso_domains_domain_idx").using("btree", sql`lower(domain)`),
    index("sso_domains_sso_provider_id_idx").using(
      "btree",
      table.ssoProviderId.asc().nullsLast().op("uuid_ops")
    ),
    foreignKey({
      columns: [table.ssoProviderId],
      foreignColumns: [ssoProvidersInAuth.id],
      name: "sso_domains_sso_provider_id_fkey",
    }).onDelete("cascade"),
    check("domain not empty", sql`char_length(domain) > 0`),
  ]
);

export const mfaAmrClaimsInAuth = authSchema.table(
  "mfa_amr_claims",
  {
    id: uuid().primaryKey().notNull(),
    sessionId: uuid("session_id").notNull(),
    authenticationMethod: text("authentication_method").notNull(),
    createdAt: timestamp("created_at", {
      mode: "string",
      withTimezone: true,
    }).notNull(),
    updatedAt: timestamp("updated_at", {
      mode: "string",
      withTimezone: true,
    }).notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.sessionId],
      foreignColumns: [sessionsInAuth.id],
      name: "mfa_amr_claims_session_id_fkey",
    }).onDelete("cascade"),
    unique("mfa_amr_claims_session_id_authentication_method_pkey").on(
      table.sessionId,
      table.authenticationMethod
    ),
  ]
);

export const samlProvidersInAuth = authSchema.table(
  "saml_providers",
  {
    id: uuid().primaryKey().notNull(),
    metadataUrl: text("metadata_url"),
    nameIdFormat: text("name_id_format"),
    entityId: text("entity_id").notNull(),
    metadataXml: text("metadata_xml").notNull(),
    attributeMapping: jsonb("attribute_mapping"),
    ssoProviderId: uuid("sso_provider_id").notNull(),
    createdAt: timestamp("created_at", { mode: "string", withTimezone: true }),
    updatedAt: timestamp("updated_at", { mode: "string", withTimezone: true }),
  },
  (table) => [
    index("saml_providers_sso_provider_id_idx").using(
      "btree",
      table.ssoProviderId.asc().nullsLast().op("uuid_ops")
    ),
    foreignKey({
      columns: [table.ssoProviderId],
      foreignColumns: [ssoProvidersInAuth.id],
      name: "saml_providers_sso_provider_id_fkey",
    }).onDelete("cascade"),
    unique("saml_providers_entity_id_key").on(table.entityId),
    check("metadata_xml not empty", sql`char_length(metadata_xml) > 0`),
    check(
      "metadata_url not empty",
      sql`(metadata_url = NULL::text) OR (char_length(metadata_url) > 0)`
    ),
    check("entity_id not empty", sql`char_length(entity_id) > 0`),
  ]
);

export const flowStateInAuth = authSchema.table(
  "flow_state",
  {
    userId: uuid("user_id"),
    id: uuid().primaryKey().notNull(),
    authCode: text("auth_code").notNull(),
    providerType: text("provider_type").notNull(),
    codeChallenge: text("code_challenge").notNull(),
    providerAccessToken: text("provider_access_token"),
    providerRefreshToken: text("provider_refresh_token"),
    authenticationMethod: text("authentication_method").notNull(),
    createdAt: timestamp("created_at", { mode: "string", withTimezone: true }),
    updatedAt: timestamp("updated_at", { mode: "string", withTimezone: true }),
    codeChallengeMethod: codeChallengeMethodInAuth(
      "code_challenge_method"
    ).notNull(),
    authCodeIssuedAt: timestamp("auth_code_issued_at", {
      mode: "string",
      withTimezone: true,
    }),
  },
  (table) => [
    index("flow_state_created_at_idx").using(
      "btree",
      table.createdAt.desc().nullsFirst().op("timestamptz_ops")
    ),
    index("idx_auth_code").using(
      "btree",
      table.authCode.asc().nullsLast().op("text_ops")
    ),
    index("idx_user_id_auth_method").using(
      "btree",
      table.userId.asc().nullsLast().op("text_ops"),
      table.authenticationMethod.asc().nullsLast().op("text_ops")
    ),
  ]
);

export const identitiesInAuth = authSchema.table(
  "identities",
  {
    provider: text().notNull(),
    userId: uuid("user_id").notNull(),
    providerId: text("provider_id").notNull(),
    identityData: jsonb("identity_data").notNull(),
    id: uuid().defaultRandom().primaryKey().notNull(),
    createdAt: timestamp("created_at", { mode: "string", withTimezone: true }),
    updatedAt: timestamp("updated_at", { mode: "string", withTimezone: true }),
    email: text().generatedAlwaysAs(
      sql`lower((identity_data ->> 'email'::text))`
    ),
    lastSignInAt: timestamp("last_sign_in_at", {
      mode: "string",
      withTimezone: true,
    }),
  },
  (table) => [
    index("identities_email_idx").using(
      "btree",
      table.email.asc().nullsLast().op("text_pattern_ops")
    ),
    index("identities_user_id_idx").using(
      "btree",
      table.userId.asc().nullsLast().op("uuid_ops")
    ),
    foreignKey({
      columns: [table.userId],
      name: "identities_user_id_fkey",
      foreignColumns: [usersInAuth.id],
    }).onDelete("cascade"),
    unique("identities_provider_id_provider_unique").on(
      table.providerId,
      table.provider
    ),
  ]
);

export const oneTimeTokensInAuth = authSchema.table(
  "one_time_tokens",
  {
    id: uuid().primaryKey().notNull(),
    userId: uuid("user_id").notNull(),
    tokenHash: text("token_hash").notNull(),
    relatesTo: text("relates_to").notNull(),
    tokenType: oneTimeTokenTypeInAuth("token_type").notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("one_time_tokens_relates_to_hash_idx").using(
      "hash",
      table.relatesTo.asc().nullsLast().op("text_ops")
    ),
    index("one_time_tokens_token_hash_hash_idx").using(
      "hash",
      table.tokenHash.asc().nullsLast().op("text_ops")
    ),
    uniqueIndex("one_time_tokens_user_id_token_type_key").using(
      "btree",
      table.userId.asc().nullsLast().op("uuid_ops"),
      table.tokenType.asc().nullsLast().op("enum_ops")
    ),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [usersInAuth.id],
      name: "one_time_tokens_user_id_fkey",
    }).onDelete("cascade"),
    check("one_time_tokens_token_hash_check", sql`char_length(token_hash) > 0`),
  ]
);

export const mfaFactorsInAuth = authSchema.table(
  "mfa_factors",
  {
    phone: text(),
    secret: text(),
    id: uuid().primaryKey().notNull(),
    userId: uuid("user_id").notNull(),
    friendlyName: text("friendly_name"),
    status: factorStatusInAuth().notNull(),
    webAuthnAaguid: uuid("web_authn_aaguid"),
    webAuthnCredential: jsonb("web_authn_credential"),
    factorType: factorTypeInAuth("factor_type").notNull(),
    createdAt: timestamp("created_at", {
      mode: "string",
      withTimezone: true,
    }).notNull(),
    updatedAt: timestamp("updated_at", {
      mode: "string",
      withTimezone: true,
    }).notNull(),
    lastChallengedAt: timestamp("last_challenged_at", {
      mode: "string",
      withTimezone: true,
    }),
  },
  (table) => [
    index("factor_id_created_at_idx").using(
      "btree",
      table.userId.asc().nullsLast().op("timestamptz_ops"),
      table.createdAt.asc().nullsLast().op("uuid_ops")
    ),
    uniqueIndex("mfa_factors_user_friendly_name_unique")
      .using(
        "btree",
        table.friendlyName.asc().nullsLast().op("text_ops"),
        table.userId.asc().nullsLast().op("uuid_ops")
      )
      .where(sql`(TRIM(BOTH FROM friendly_name) <> ''::text)`),
    index("mfa_factors_user_id_idx").using(
      "btree",
      table.userId.asc().nullsLast().op("uuid_ops")
    ),
    uniqueIndex("unique_phone_factor_per_user").using(
      "btree",
      table.userId.asc().nullsLast().op("text_ops"),
      table.phone.asc().nullsLast().op("text_ops")
    ),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [usersInAuth.id],
      name: "mfa_factors_user_id_fkey",
    }).onDelete("cascade"),
    unique("mfa_factors_last_challenged_at_key").on(table.lastChallengedAt),
  ]
);

export const mfaChallengesInAuth = authSchema.table(
  "mfa_challenges",
  {
    otpCode: text("otp_code"),
    id: uuid().primaryKey().notNull(),
    factorId: uuid("factor_id").notNull(),
    ipAddress: inet("ip_address").notNull(),
    webAuthnSessionData: jsonb("web_authn_session_data"),
    verifiedAt: timestamp("verified_at", {
      mode: "string",
      withTimezone: true,
    }),
    createdAt: timestamp("created_at", {
      mode: "string",
      withTimezone: true,
    }).notNull(),
  },
  (table) => [
    index("mfa_challenge_created_at_idx").using(
      "btree",
      table.createdAt.desc().nullsFirst().op("timestamptz_ops")
    ),
    foreignKey({
      columns: [table.factorId],
      foreignColumns: [mfaFactorsInAuth.id],
      name: "mfa_challenges_auth_factor_id_fkey",
    }).onDelete("cascade"),
  ]
);
