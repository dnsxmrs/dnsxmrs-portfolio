import type { MetadataRoute } from "next";

const siteUrl = "https://dnsxmrs.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
    const routes = ["/", "/about", "/projects"];
    const lastModified = new Date();

    return routes.map((route) => ({
        url: `${siteUrl}${route}`,
        lastModified,
        changeFrequency: route === "/" ? "weekly" : "monthly",
        priority: route === "/" ? 1 : 0.8,
    }));
}
