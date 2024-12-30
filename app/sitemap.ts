import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: "https://hyper.trade/sitemap",
      lastModified: new Date(),
    },
  ];
}
