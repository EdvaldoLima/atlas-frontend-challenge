export const useHomeSeo = () => {
  const requestUrl = useRequestURL();
  const canonicalUrl = `${requestUrl.origin}/`;
  const pageTitle = "Catálogo de Profissionais Autônomos";
  const pageDescription =
    "Encontre profissionais autônomos para o seu projeto, compare especialidades, valores de serviço e contatos em um catálogo rápido e responsivo.";

  useSeoMeta({
    title: pageTitle,
    description: pageDescription,
    robots: "index, follow",
    ogTitle: pageTitle,
    ogDescription: pageDescription,
    ogType: "website",
    ogUrl: canonicalUrl,
    ogLocale: "pt_BR",
    twitterCard: "summary",
    twitterTitle: pageTitle,
    twitterDescription: pageDescription,
  });

  useHead({
    link: [
      {
        rel: "canonical",
        href: canonicalUrl,
      },
    ],
    script: [
      {
        type: "application/ld+json",
        innerHTML: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Atlas Profissionais",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          url: canonicalUrl,
          inLanguage: "pt-BR",
          description: pageDescription,
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "BRL",
          },
        }),
      },
    ],
  });
};
