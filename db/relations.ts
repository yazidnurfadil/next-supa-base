import { relations } from "drizzle-orm/relations";

import {
  users,
  usersInAuth,
  sessionsInAuth,
  flowStateInAuth,
  usersInNextAuth,
  mfaFactorsInAuth,
  identitiesInAuth,
  ssoDomainsInAuth,
  ssoProvidersInAuth,
  mfaAmrClaimsInAuth,
  accountsInBasejump,
  sessionsInNextAuth,
  accountsInNextAuth,
  refreshTokensInAuth,
  mfaChallengesInAuth,
  samlProvidersInAuth,
  oneTimeTokensInAuth,
  samlRelayStatesInAuth,
  invitationsInBasejump,
  accountUserInBasejump,
  billingCustomersInBasejump,
  billingSubscriptionsInBasejump,
} from "./schema";

export const refreshTokensInAuthRelations = relations(
  refreshTokensInAuth,
  ({ one }) => ({
    sessionsInAuth: one(sessionsInAuth, {
      references: [sessionsInAuth.id],
      fields: [refreshTokensInAuth.sessionId],
    }),
  })
);

export const sessionsInAuthRelations = relations(
  sessionsInAuth,
  ({ one, many }) => ({
    mfaAmrClaimsInAuths: many(mfaAmrClaimsInAuth),
    refreshTokensInAuths: many(refreshTokensInAuth),
    usersInAuth: one(usersInAuth, {
      references: [usersInAuth.id],
      fields: [sessionsInAuth.userId],
    }),
  })
);

export const mfaFactorsInAuthRelations = relations(
  mfaFactorsInAuth,
  ({ one, many }) => ({
    mfaChallengesInAuths: many(mfaChallengesInAuth),
    usersInAuth: one(usersInAuth, {
      references: [usersInAuth.id],
      fields: [mfaFactorsInAuth.userId],
    }),
  })
);

export const usersInAuthRelations = relations(usersInAuth, ({ many }) => ({
  sessionsInAuths: many(sessionsInAuth),
  mfaFactorsInAuths: many(mfaFactorsInAuth),
  identitiesInAuths: many(identitiesInAuth),
  oneTimeTokensInAuths: many(oneTimeTokensInAuth),
  invitationsInBasejumps: many(invitationsInBasejump),
  accountUserInBasejumps: many(accountUserInBasejump),
  accountsInBasejumps_createdBy: many(accountsInBasejump, {
    relationName: "accountsInBasejump_createdBy_usersInAuth_id",
  }),
  accountsInBasejumps_updatedBy: many(accountsInBasejump, {
    relationName: "accountsInBasejump_updatedBy_usersInAuth_id",
  }),
  accountsInBasejumps_primaryOwnerUserId: many(accountsInBasejump, {
    relationName: "accountsInBasejump_primaryOwnerUserId_usersInAuth_id",
  }),
}));

export const identitiesInAuthRelations = relations(
  identitiesInAuth,
  ({ one }) => ({
    usersInAuth: one(usersInAuth, {
      references: [usersInAuth.id],
      fields: [identitiesInAuth.userId],
    }),
  })
);

export const mfaChallengesInAuthRelations = relations(
  mfaChallengesInAuth,
  ({ one }) => ({
    mfaFactorsInAuth: one(mfaFactorsInAuth, {
      references: [mfaFactorsInAuth.id],
      fields: [mfaChallengesInAuth.factorId],
    }),
  })
);

export const ssoDomainsInAuthRelations = relations(
  ssoDomainsInAuth,
  ({ one }) => ({
    ssoProvidersInAuth: one(ssoProvidersInAuth, {
      references: [ssoProvidersInAuth.id],
      fields: [ssoDomainsInAuth.ssoProviderId],
    }),
  })
);

export const ssoProvidersInAuthRelations = relations(
  ssoProvidersInAuth,
  ({ many }) => ({
    ssoDomainsInAuths: many(ssoDomainsInAuth),
    samlProvidersInAuths: many(samlProvidersInAuth),
    samlRelayStatesInAuths: many(samlRelayStatesInAuth),
  })
);

export const mfaAmrClaimsInAuthRelations = relations(
  mfaAmrClaimsInAuth,
  ({ one }) => ({
    sessionsInAuth: one(sessionsInAuth, {
      references: [sessionsInAuth.id],
      fields: [mfaAmrClaimsInAuth.sessionId],
    }),
  })
);

export const samlProvidersInAuthRelations = relations(
  samlProvidersInAuth,
  ({ one }) => ({
    ssoProvidersInAuth: one(ssoProvidersInAuth, {
      references: [ssoProvidersInAuth.id],
      fields: [samlProvidersInAuth.ssoProviderId],
    }),
  })
);

export const samlRelayStatesInAuthRelations = relations(
  samlRelayStatesInAuth,
  ({ one }) => ({
    flowStateInAuth: one(flowStateInAuth, {
      references: [flowStateInAuth.id],
      fields: [samlRelayStatesInAuth.flowStateId],
    }),
    ssoProvidersInAuth: one(ssoProvidersInAuth, {
      references: [ssoProvidersInAuth.id],
      fields: [samlRelayStatesInAuth.ssoProviderId],
    }),
  })
);

export const flowStateInAuthRelations = relations(
  flowStateInAuth,
  ({ many }) => ({
    samlRelayStatesInAuths: many(samlRelayStatesInAuth),
  })
);

export const oneTimeTokensInAuthRelations = relations(
  oneTimeTokensInAuth,
  ({ one }) => ({
    usersInAuth: one(usersInAuth, {
      references: [usersInAuth.id],
      fields: [oneTimeTokensInAuth.userId],
    }),
  })
);

export const invitationsInBasejumpRelations = relations(
  invitationsInBasejump,
  ({ one }) => ({
    usersInAuth: one(usersInAuth, {
      references: [usersInAuth.id],
      fields: [invitationsInBasejump.invitedByUserId],
    }),
    accountsInBasejump: one(accountsInBasejump, {
      references: [accountsInBasejump.id],
      fields: [invitationsInBasejump.accountId],
    }),
  })
);

export const accountsInBasejumpRelations = relations(
  accountsInBasejump,
  ({ one, many }) => ({
    invitationsInBasejumps: many(invitationsInBasejump),
    accountUserInBasejumps: many(accountUserInBasejump),
    billingCustomersInBasejumps: many(billingCustomersInBasejump),
    billingSubscriptionsInBasejumps: many(billingSubscriptionsInBasejump),
    usersInAuth_createdBy: one(usersInAuth, {
      references: [usersInAuth.id],
      fields: [accountsInBasejump.createdBy],
      relationName: "accountsInBasejump_createdBy_usersInAuth_id",
    }),
    usersInAuth_updatedBy: one(usersInAuth, {
      references: [usersInAuth.id],
      fields: [accountsInBasejump.updatedBy],
      relationName: "accountsInBasejump_updatedBy_usersInAuth_id",
    }),
    usersInAuth_primaryOwnerUserId: one(usersInAuth, {
      references: [usersInAuth.id],
      fields: [accountsInBasejump.primaryOwnerUserId],
      relationName: "accountsInBasejump_primaryOwnerUserId_usersInAuth_id",
    }),
  })
);

export const sessionsInNextAuthRelations = relations(
  sessionsInNextAuth,
  ({ one }) => ({
    usersInNextAuth: one(usersInNextAuth, {
      references: [usersInNextAuth.id],
      fields: [sessionsInNextAuth.userId],
    }),
  })
);

export const usersInNextAuthRelations = relations(
  usersInNextAuth,
  ({ many }) => ({
    users: many(users),
    sessionsInNextAuths: many(sessionsInNextAuth),
    accountsInNextAuths: many(accountsInNextAuth),
  })
);

export const billingCustomersInBasejumpRelations = relations(
  billingCustomersInBasejump,
  ({ one, many }) => ({
    billingSubscriptionsInBasejumps: many(billingSubscriptionsInBasejump),
    accountsInBasejump: one(accountsInBasejump, {
      references: [accountsInBasejump.id],
      fields: [billingCustomersInBasejump.accountId],
    }),
  })
);

export const accountsInNextAuthRelations = relations(
  accountsInNextAuth,
  ({ one }) => ({
    usersInNextAuth: one(usersInNextAuth, {
      references: [usersInNextAuth.id],
      fields: [accountsInNextAuth.userId],
    }),
  })
);

export const usersRelations = relations(users, ({ one }) => ({
  usersInNextAuth: one(usersInNextAuth, {
    fields: [users.id],
    references: [usersInNextAuth.id],
  }),
}));

export const billingSubscriptionsInBasejumpRelations = relations(
  billingSubscriptionsInBasejump,
  ({ one }) => ({
    accountsInBasejump: one(accountsInBasejump, {
      references: [accountsInBasejump.id],
      fields: [billingSubscriptionsInBasejump.accountId],
    }),
    billingCustomersInBasejump: one(billingCustomersInBasejump, {
      references: [billingCustomersInBasejump.id],
      fields: [billingSubscriptionsInBasejump.billingCustomerId],
    }),
  })
);

export const accountUserInBasejumpRelations = relations(
  accountUserInBasejump,
  ({ one }) => ({
    usersInAuth: one(usersInAuth, {
      references: [usersInAuth.id],
      fields: [accountUserInBasejump.userId],
    }),
    accountsInBasejump: one(accountsInBasejump, {
      references: [accountsInBasejump.id],
      fields: [accountUserInBasejump.accountId],
    }),
  })
);
