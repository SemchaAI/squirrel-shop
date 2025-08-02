export const FILE_ROUTES = {
  PRODUCT: "productImageUploader",
  CATEGORY: "categoryImageUploader",
} as const;

type TFileRouteKeys = keyof typeof FILE_ROUTES;
export type TFileRoutes = (typeof FILE_ROUTES)[TFileRouteKeys];
