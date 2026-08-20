import Link from "next/link";
import { getSanityNews } from "../sanity/queries";

// 1. Tipagem real dos dados que vêm do Sanity
export interface NewsItem {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  category?: string;
  date?: string;
}

export default async function LatestNews() {
  // 2. Chamada limpa e fortemente tipada sem "let" e sem "any"
  const newsList: NewsItem[] = (await getSanityNews().catch(() => [])) || [];
  const recentNews = newsList.slice(0, 2);

  // 3. Fallback amigável em vez de sumir com a seção ou dar erro
  return (
    <section className="max-w-7xl mx-auto px-6 py-12 border-t border-amber-500/10">
      <div className="flex items-end justify-between mb-8 border-b border-amber-500/20 pb-4">
        <div>
          <span className="text-xs font-semibold tracking-widest text-amber-400 uppercase">
            Comunicados
          </span>
          <h2
            className="text-2xl md:text-3xl font-bold text-slate-100 tracking-wide mt-1"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            Últimas Notícias
          </h2>
        </div>

        <Link
          href="/noticias"
          className="text-xs md:text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors uppercase tracking-wider flex items-center gap-1 group"
        >
          Ver todas
          <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>

      {recentNews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recentNews.map((item) => (
            <Link
              key={item._id}
              href={`/noticias/${item.slug}`}
              className="group p-6 rounded-xl bg-slate-900/30 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 hover:bg-slate-900/60 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-800 text-amber-300 border border-slate-700">
                    {item.category || "Aviso"}
                  </span>
                  {item.date && (
                    <span className="text-xs text-slate-400 font-mono">{item.date}</span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-100 group-hover:text-amber-300 transition-colors mb-2">
                  {item.title}
                </h3>

                {item.excerpt && (
                  <p className="text-sm text-slate-300 leading-relaxed line-clamp-2">
                    {item.excerpt}
                  </p>
                )}
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800/60 flex items-center justify-end text-xs font-medium text-amber-400/80 group-hover:text-amber-300 transition-colors">
                Ler notícia completa →
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center rounded-xl bg-slate-900/20 border border-slate-800/60 text-slate-500 text-sm">
          Nenhuma notícia publicada no momento.
        </div>
      )}
    </section>
  );
}
