"use client";

import { useState } from "react";
import Link from "next/link";
import toolsData from "../data.json";

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", ...new Set(toolsData.map((tool) => tool.category))];

  const filteredTools = toolsData.filter((tool) => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-cream">
      <header className="bg-primary text-cream">
        <div className="max-w-6xl mx-auto px-4 py-20 sm:py-24 text-center">
             <p className="mb-8 inline-block rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-gray-900">
     Made by Jeph PhoneMyat
   </p>
          <h1 className="text-4xl sm:text-6xl font-bold">Find the Best Alternative Tools</h1>
          <p className="mt-6 text-lg sm:text-xl max-w-2xl mx-auto">
            Compare software alternatives by category, pricing, and features to find the right tool for your team.
          </p>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-4 py-10">
        <input
          type="text"
          placeholder="Search tools..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-5 py-3 rounded-full border-2 border-primary/30 bg-white/60 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-primary"
        />

        <div className="mt-6 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full border-2 border-primary px-5 py-2 font-medium transition ${
                selectedCategory === category
                  ? "bg-accent text-gray-900"
                  : "text-primary hover:bg-primary/10"
              }`}
            >
              {category === "all" ? "All Categories" : category}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <Link
              key={tool.id}
              href={`/tool/${tool.id}`}
              className="block bg-white/60 rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-md hover:border-primary transition"
            >
              <h2 className="text-2xl font-bold text-primary">{tool.name}</h2>
              <p className="mt-4 text-gray-900 line-clamp-3">{tool.tagline}</p>
              <span className="mt-6 inline-block text-sm font-medium text-cream bg-primary px-3 py-1 rounded-md">
                {tool.category}
              </span>
            </Link>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <p className="mt-10 text-center text-gray-600">No tools match your search.</p>
        )}
      </section>
    </main>
  );
}