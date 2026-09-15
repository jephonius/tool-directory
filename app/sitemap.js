import toolsData from "../data.json";

export default function sitemap() {
  const baseUrl = "https://your-site-name.vercel.app";

  const toolUrls = toolsData.map((tool) => ({
    url: `${baseUrl}/tool/${tool.id}`,
    lastModified: new Date(),
  }));

  const alternativeUrls = toolsData.map((tool) => ({
    url: `${baseUrl}/alternatives-to/${tool.id}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...toolUrls,
    ...alternativeUrls,
  ];
}