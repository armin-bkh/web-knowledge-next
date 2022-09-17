const webKnowledgeUrl =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_PROD_DOMAIN_URL
    : process.env.NEXT_PUBLIC_DEV_DOMAIN_URL;

const webKnowledgeApi =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_DEV_ADDRESS_API
    : process.env.NEXT_PUBLIC_PROD_ADDRESS_API;

const config = {
  webKnowledgeUrl,
  webKnowledgeApi,
};

export default config;
