import Link from "next/link";
import { RECENT_CHAPTERS, Chapter } from "../data/chapters";

export default function RecentChapters() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      {/* Cabeçalho */}
      <div className="flex items-end justify-between mb-8 border-b border-amber-500/20 pb-4">
        <div>
          <span className="text-xs font-semibold tracking-widest text-amber-400 uppercase">
            Atualizações
          </span>
          <h2
            className="text-2xl md:text-3xl font-bold text-slate-100 tracking-wide mt-1"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            Capítulos Recentes
          </h2>
        </div>

        <Link
          href="/capitulos"
          className="text-xs md:text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors uppercase tracking-wider flex items-center gap-1 group"
        >
          Ver todos
          <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>

      {/* Grid de Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {RECENT_CHAPTERS.map((chap: Chapter) => (
          <Link
            key={chap.id}
            href={`/capitulos/${chap.slug}`}
            className="group relative p-6 rounded-xl bg-slate-900/40 border border-slate-800 hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-900/80 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-medium tracking-wider text-slate-400 uppercase">
                  Volume {chap.volume} • Cap. {chap.number}
                </span>
                {chap.isNew && (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Novo
                  </span>
                )}
              </div>

              <h3 className="text-lg font-semibold text-slate-100 group-hover:text-amber-300 transition-colors line-clamp-2">
                {chap.title}
              </h3>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>{chap.releaseDate}</span>
              <span className="font-medium text-amber-400/80 group-hover:text-amber-300 transition-colors">
                Ler capítulo →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
