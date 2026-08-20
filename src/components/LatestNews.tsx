import Link from "next/link";
import { getSanityNews } from "../sanity/queries";
import { LATEST_NEWS, NewsItem } from "../data/news";

export default async function LatestNews() {
  // 1. Busca as notícias do Sanity
  let newsList: any[] = [];
  try {
    newsList = await getSanityNews();
  } catch (error) {
    console.error("Erro ao carregar notícias do Sanity:", error);
  }

  // 2. Fallback para os dados estáticos caso o Sanity esteja vazio
  const items = newsList && newsList.length > 0 ? newsList : LATEST_NEWS;

  // Limita aos 2 comunicados mais recentes na Home
  const recentNews = items.slice(0, 2);

  return (
    <section className="max-w-7xl mx-auto px-6 py-12 border-t border-amber-500/10">
      {/* Cabeçalho */}
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

      {/* Grid de Notícias */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recentNews.map((item: any) => (
          <Link
            key={item._id || item.id || item.slug}
            href={`/noticias/${item.slug}`}
            className="group p-6 rounded-xl bg-slate-900/30 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 hover:bg-slate-900/60 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-800 text-amber-300 border border-slate-700">
                  {item.category}
                </span>
                <span className="text-xs text-slate-400">{item.date}</span>
              </div>

              <h3 className="text-lg font-bold text-slate-100 group-hover:text-amber-300 transition-colors mb-2">
                {item.title}
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed line-clamp-2">{item.excerpt}</p>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800/60 flex items-center justify-end text-xs font-medium text-amber-400/80 group-hover:text-amber-300 transition-colors">
              Ler notícia completa →
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
