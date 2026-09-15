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
    <main className="min-h-screen bg-gray-100">
      <header className="bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold">Find the Best Alternative Tools</h1>
          <p className="mt-3 text-slate-300 max-w-2xl mx-auto">
            Compare software alternatives by category, pricing, and features to find the right tool for your team.
          </p>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search tools..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-2/3 px-4 py-3 rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-1/3 px-4 py-3 rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === "all" ? "All Categories" : category}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <Link
              key={tool.id}
              href={`/tool/${tool.id}`}
              className="block bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-slate-300 transition"
            >
              <h2 className="text-lg font-semibold text-slate-900">{tool.name}</h2>
              <p className="mt-2 text-sm text-gray-600 line-clamp-3">{tool.tagline}</p>
              <span className="mt-4 inline-block text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                {tool.category}
              </span>
            </Link>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <p className="mt-10 text-center text-gray-500">No tools match your search.</p>
        )}
      </section>
    </main>
  );
}