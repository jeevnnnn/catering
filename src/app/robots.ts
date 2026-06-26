import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/services", "/weddings", "/corporate", "/birthdays", "/gallery", "/contact", "/inquiry"],
      disallow: ["/admin", "/api/"],
    },
    sitemap: "https://kaeonstudios.com/sitemap.xml",
  };
}
