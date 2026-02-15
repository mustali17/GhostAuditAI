export enum UserTier {
  FREE = 'FREE',
  GROWTH = 'GROWTH',
  AGENCY = 'AGENCY',
}

export const TierLimits = {
  [UserTier.FREE]: { docLimit: 3 },
  [UserTier.GROWTH]: { docLimit: 50 },
  [UserTier.AGENCY]: { docLimit: Infinity },
};
