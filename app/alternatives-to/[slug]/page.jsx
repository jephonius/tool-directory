import Link from "next/link";
import { notFound } from "next/navigation";
import toolsData from "../../../data.json";

export function generateStaticParams() {
  return toolsData.map((tool) => ({ slug: tool.id }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const tool = toolsData.find((t) => t.id === slug);
  if (!tool) return {};
  return {
    title: `${tool.alternatives.length} Best ${tool.name} Alternatives in 2026`,
    description: `Compare the top alternatives to ${tool.name}, including pricing and key differences, to find the right fit for your team.`,
  };
}

export default async function AlternativesPage({ params }) {
  const { slug } = await params;
  const tool = toolsData.find((t) => t.id === slug);

  if (!tool) {
    notFound();
  }

  const alternativeTools = tool.alternatives
    .map((altId) => toolsData.find((t) => t.id === altId))
    .filter(Boolean);

  const relatedTools = toolsData
    .filter((t) => t.category === tool.category && t.id !== tool.id)
    .slice(0, 3);

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${alternativeTools.length} Best ${tool.name} Alternatives in 2026`,
    itemListElement: alternativeTools.map((alt, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: alt.name,
      url: alt.websiteUrl,
    })),
  };

  return (
    <main className="min-h-screen bg-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <header className="bg-primary text-cream">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:py-20">
          <div className="mb-6 h-1.5 w-16 rounded-full bg-accent"></div>
          <h1 className="text-4xl sm:text-5xl font-bold">
            {alternativeTools.length} Best {tool.name} Alternatives in 2026
          </h1>
          <p className="mt-4 text-lg sm:text-xl">
            Comparing the top tools people switch to instead of {tool.name}.
          </p>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-4 py-10">
        <ol className="space-y-6">
          {alternativeTools.map((alt, index) => (
            <li key={alt.id} className="bg-white/60 rounded-2xl shadow-sm border border-gray-200 p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="inline-block rounded-full bg-accent px-3 py-0.5 text-sm font-medium text-gray-900">
                    #{index + 1}
                  </span>
                  <h2 className="text-2xl font-bold text-primary mt-3">
                    <Link href={`/tool/${alt.id}`} className="hover:underline">
                      {alt.name}
                    </Link>
                  </h2>
                  <p className="mt-2 text-gray-900">{alt.tagline}</p>
                </div>
                <span className="whitespace-nowrap text-sm font-medium text-cream bg-primary px-3 py-1 rounded-md">
                  {alt.pricingSummary}
                </span>
              </div>

              {tool.switchReasons && tool.switchReasons[alt.id] && (
                <p className="mt-4 text-gray-900 border-t border-gray-200 pt-4">
                  {tool.switchReasons[alt.id]}
                </p>
              )}

              <Link href={`/tool/${alt.id}`} className="mt-4 inline-block text-sm font-medium text-primary hover:underline">
                View full {alt.name} profile →
              </Link>
            </li>
          ))}
        </ol>

        {relatedTools.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-primary mb-4">Related tools in this category</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedTools.map((related) => (
                <Link
                  key={related.id}
                  href={`/tool/${related.id}`}
                  className="block bg-white/60 rounded-2xl border border-gray-200 p-6 hover:shadow-md hover:border-primary transition"
                >
                  <h3 className="text-lg font-bold text-primary">{related.name}</h3>
                  <p className="mt-2 text-sm text-gray-900 line-clamp-2">{related.tagline}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}