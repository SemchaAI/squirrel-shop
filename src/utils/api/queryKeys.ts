export const queryKeys = {
  product: (slug: string) => ["product", slug] as const,
  media: (query: string) => ["media", query],
};
