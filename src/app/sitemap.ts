import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://kaeonstudios.com";
  
  const pages = [
    "",
    "/services",
    "/weddings",
    "/corporate",
    "/birthdays",
    "/gallery",
    "/contact",
    "/inquiry"
  ];

  return pages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: page === "" ? 1.0 : 0.8,
  }));
}
