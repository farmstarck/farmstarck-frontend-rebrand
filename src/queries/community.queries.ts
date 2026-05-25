import Services from "@/services/community.service";

export const communityMutations = {
  contactUs: () => ({
    mutationFn: Services.contactUs,
  }),

  subscribe: () => ({
    mutationFn: Services.subscribeToNewsletter,
  }),

  unsubscribe: () => ({
    mutationFn: Services.unsubscribeFromNewsletter,
  }),
};
