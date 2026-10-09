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
    <main className="min-h-screen bg-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <header className="bg-primary text-cream">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:py-20">
          <div className="mb-6 h-1.5 w-16 rounded-full bg-accent"></div>
          <h1 className="text-4xl sm:text-5xl font-bold">{tool.name}</h1>
          <p className="mt-4 text-lg sm:text-xl">{tool.tagline}</p>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white/60 rounded-2xl border border-gray-200 shadow-sm p-8">
          <h2 className="text-2xl font-bold text-primary mb-3">About {tool.name}</h2>
          <p className="text-gray-900 whitespace-pre-line leading-relaxed">{tool.description}</p>

          <h2 className="text-2xl font-bold text-primary mt-8 mb-3">Key Features</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-900 marker:text-primary">
            {tool.keyFeatures.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>

          <h2 className="text-2xl font-bold text-primary mt-8 mb-3">Pricing</h2>
          <p className="text-gray-900">{tool.pricingSummary}</p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a
              href={tool.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-center bg-accent text-gray-900 px-6 py-3 rounded-full font-medium hover:brightness-95 transition"
            >
              Visit {tool.name} Website
            </a>

            <Link
              href={`/alternatives-to/${tool.id}`}
              className="inline-block text-center border-2 border-primary text-primary px-6 py-3 rounded-full font-medium hover:bg-primary/10 transition"
            >
              Looking for alternatives?
            </Link>
          </div>
        </div>

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