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
    title: tool.metaTitle,
    description: tool.metaDescription,
  };
}

export default async function ToolPage({ params }) {
  const { slug } = await params;
  const tool = toolsData.find((t) => t.id === slug);

  if (!tool) {
    notFound();
  }

  const relatedTools = toolsData
    .filter((t) => t.category === tool.category && t.id !== tool.id)
    .slice(0, 3);

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.description,
    applicationCategory: tool.category,
    url: tool.websiteUrl,
    offers: {
      "@type": "Offer",
      description: tool.pricingSummary,
    },
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <header className="bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 py-10">
          <h1 className="text-3xl sm:text-4xl font-bold">{tool.name}</h1>
          <p className="mt-3 text-slate-300">{tool.tagline}</p>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">About {tool.name}</h2>
          <p className="text-gray-700 whitespace-pre-line leading-relaxed">{tool.description}</p>

          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Key Features</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {tool.keyFeatures.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>

          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Pricing</h2>
          <p className="text-gray-700">{tool.pricingSummary}</p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            
              href={tool.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-center bg-slate-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-700 transition"
            >
              Visit {tool.name} Website
            </a>

            <Link
              href={`/alternatives-to/${tool.id}`}
              className="inline-block text-center border border-slate-900 text-slate-900 px-6 py-3 rounded-lg font-medium hover:bg-slate-100 transition"
            >
              Looking for alternatives?
            </Link>
          </div>
        </div>

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