import type { ComputedRef } from "vue";
import type { Professional } from "~~/shared/types/professional";

export const useProfessionalSeo = (
  professional: ComputedRef<Professional>,
  professionalId: ComputedRef<number>,
) => {
  const requestUrl = useRequestURL();
  const canonicalUrl = `${requestUrl.origin}/professionals/${professionalId.value}`;
  const fullName = computed(
    () => `${professional.value.firstName} ${professional.value.lastName}`,
  );

  useSeoMeta({
    title: () => fullName.value,
    description: () => professional.value.description,
    robots: "index, follow",
    ogTitle: () => fullName.value,
    ogDescription: () => professional.value.description,
    ogType: "profile",
    ogUrl: canonicalUrl,
    ogImage: () => professional.value.image,
    ogLocale: "pt_BR",
    twitterCard: "summary",
    twitterTitle: () => fullName.value,
    twitterDescription: () => professional.value.description,
  });

  useHead({
    link: [
      {
        rel: "canonical",
        href: canonicalUrl,
      },
    ],
  });

  return {
    fullName,
  };
};
