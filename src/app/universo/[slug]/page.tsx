import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { LORE_ITEMS } from "../../../data/lore";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function LoreDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const item = LORE_ITEMS.find((l) => l.slug === resolvedParams.slug);

  if (!item) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#070b14] text-slate-100">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-10">
        <Link
          href="/universo"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors mb-8"
        >
          ← Voltar para a Enciclopédia
        </Link>

        {/* Ficha Principal */}
        <article className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 md:p-10 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-6 mb-8">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-amber-400 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
                {item.category}
              </span>
              <h1
                className="text-3xl md:text-5xl font-bold text-slate-100 tracking-wide mt-4"
                style={{ fontFamily: "var(--font-cinzel)" }}
              >
                {item.name}
              </h1>
              <h2 className="text-base md:text-lg text-amber-300/90 font-medium mt-1">
                {item.title}
              </h2>
            </div>

            {item.affinity && (
              <div className="bg-slate-950/70 border border-slate-800 px-4 py-2 rounded-xl text-right">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 block">
                  Afinidade / Domínio
                </span>
                <span className="text-xs md:text-sm font-semibold text-amber-200">
                  {item.affinity}
                </span>
              </div>
            )}
          </div>

          {/* Citação */}
          {item.quote && (
            <div className="mb-8 p-4 rounded-xl bg-slate-950/50 border-l-4 border-amber-500">
              <p className="text-sm md:text-base italic text-slate-300">
                &ldquo;{item.quote}&rdquo;
              </p>
            </div>
          )}

          {/* Visão Geral */}
          <div className="mb-8">
            <h3
              className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              Visão Geral
            </h3>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed font-light">
              {item.description}
            </p>
          </div>

          {/* Detalhes e Registros Históricos */}
          {item.details && item.details.length > 0 && (
            <div className="pt-6 border-t border-slate-800/80">
              <h3
                className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4"
                style={{ fontFamily: "var(--font-cinzel)" }}
              >
                Registros & Arquivos
              </h3>
              <ul className="flex flex-col gap-3">
                {item.details.map((detail, idx) => (
                  <li
                    key={idx}
                    className="text-xs md:text-sm text-slate-300 flex items-start gap-3 bg-slate-950/30 p-3 rounded-lg border border-slate-800/40"
                  >
                    <span className="text-amber-400 font-bold mt-0.5">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </article>
      </main>

      <Footer />
    </div>
  );
}
