"use client";

import { useState } from "react";
import Link from "next/link";

interface LoreExplorerProps {
  items: any[];
}

export default function LoreExplorer({ items }: LoreExplorerProps) {
  const [activeTab, setActiveTab] = useState<"todos" | "personagens" | "deuses" | "locais">(
    "todos",
  );

  const filteredItems =
    activeTab === "todos" ? items : items.filter((item) => item.category === activeTab);

  return (
    <div>
      {/* Abas de Filtro */}
      <div className="flex flex-wrap items-center gap-2 mb-10">
        {[
          { key: "todos", label: "Todos" },
          { key: "personagens", label: "Personagens" },
          { key: "deuses", label: "Deuses & Divindades" },
          { key: "locais", label: "Locais & Facções" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as typeof activeTab)}
            className={`cursor-pointer px-5 py-2 rounded-lg text-xs md:text-sm font-semibold tracking-wider uppercase transition-all border ${
              activeTab === tab.key
                ? "bg-amber-500 border-amber-500 text-slate-950 shadow-lg shadow-amber-500/20"
                : "bg-slate-900/60 border-slate-800 text-slate-300 hover:border-amber-500/40 hover:text-amber-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid de Itens */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item: any) => (
          <Link
            key={item._id || item.slug}
            href={`/universo/${item.slug}`}
            className="group cursor-pointer p-6 rounded-2xl bg-slate-900/30 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-900/70 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-slate-800 text-amber-400 border border-slate-700">
                  {item.category}
                </span>
                {item.affinity && (
                  <span className="text-xs text-slate-400 font-mono text-right truncate">
                    {item.affinity}
                  </span>
                )}
              </div>

              <h3
                className="text-xl font-bold text-slate-100 group-hover:text-amber-300 transition-colors mt-2"
                style={{ fontFamily: "var(--font-cinzel)" }}
              >
                {item.name}
              </h3>
              <h4 className="text-xs text-amber-400/80 font-medium tracking-wide mb-4">
                {item.title}
              </h4>

              <p className="text-sm text-slate-300 leading-relaxed font-light line-clamp-3">
                {item.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span className="italic truncate max-w-[200px] text-slate-500">
                {item.quote ? `"${item.quote}"` : "Ver detalhes"}
              </span>
              <span className="font-medium text-amber-400/80 group-hover:text-amber-300 group-hover:translate-x-1 transition-all">
                Ver perfil →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
