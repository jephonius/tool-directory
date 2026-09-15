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
    <main className="min-h-screen bg-gray-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <header className="bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 py-10">
          <h1 className="text-3xl sm:text-4xl font-bold">
            {alternativeTools.length} Best {tool.name} Alternatives in 2026
          </h1>
          <p className="mt-3 text-slate-300">
            Comparing the top tools people switch to instead of {tool.name}.
          </p>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-4 py-10">
        <ol className="space-y-6">
          {alternativeTools.map((alt, index) => (
            <li key={alt.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-sm font-medium text-slate-500">#{index + 1}</span>
                  <h2 className="text-xl font-semibold text-slate-900 mt-1">
                    <Link href={`/tool/${alt.id}`} className="hover:underline">
                      {alt.name}
                    </Link>
                  </h2>
                  <p className="mt-1 text-gray-600">{alt.tagline}</p>
                </div>
                <span className="whitespace-nowrap text-sm font-medium text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
                  {alt.pricingSummary}
                </span>
              </div>

              {tool.switchReasons && tool.switchReasons[alt.id] && (
                <p className="mt-4 text-gray-700 border-t border-gray-100 pt-4">
                  {tool.switchReasons[alt.id]}
                </p>
              )}

              <Link href={`/tool/${alt.id}`} className="mt-4 inline-block text-sm font-medium text-slate-900 hover:underline">
                View full {alt.name} profile →
              </Link>
            </li>
          ))}
        </ol>

        {relatedTools.length > 0 && (
          <div className="mt-10">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Related tools in this category</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedTools.map((related) => (
                <Link
                  key={related.id}
                  href={`/tool/${related.id}`}
                  className="block bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md hover:border-slate-300 transition"
                >
                  <h3 className="font-medium text-slate-900">{related.name}</h3>
                  <p className="mt-1 text-sm text-gray-600 line-clamp-2">{related.tagline}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}