import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { LATEST_NEWS, NewsItem } from "../../data/news";

export const metadata = {
  title: "Notícias & Avisos | Epopeia do Fim",
  description: "Comunicados oficiais, cronograma e novidades do universo de Epopeia do Fim.",
};

export default function NewsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#070b14] text-slate-100">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12">
        {/* Cabeçalho */}
        <div className="border-b border-amber-500/20 pb-6 mb-10">
          <span className="text-xs font-semibold tracking-widest text-amber-400 uppercase">
            Mural da Obra
          </span>
          <h1
            className="text-3xl md:text-5xl font-bold text-amber-200 tracking-wide mt-2"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            Notícias & Avisos
          </h1>
          <p className="text-slate-400 text-sm md:text-base mt-2 font-light">
            Fique por dentro das atualizações de capítulos, eventos e comunicados do autor.
          </p>
        </div>

        {/* Lista de Notícias */}
        <div className="flex flex-col gap-6">
          {LATEST_NEWS.map((item: NewsItem) => (
            <Link
              key={item.id}
              href={`/noticias/${item.slug}`}
              className="group cursor-pointer p-6 md:p-8 rounded-2xl bg-slate-900/30 border border-slate-800 hover:border-amber-500/40 hover:bg-slate-900/60 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-800 text-amber-300 border border-slate-700">
                    {item.category}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{item.date}</span>
                </div>

                <h2
                  className="text-xl md:text-2xl font-bold text-slate-100 group-hover:text-amber-300 transition-colors mb-2"
                  style={{ fontFamily: "var(--font-cinzel)" }}
                >
                  {item.title}
                </h2>

                <p className="text-sm text-slate-300 leading-relaxed font-light line-clamp-2">
                  {item.excerpt}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 group-hover:text-amber-300 group-hover:translate-x-1 transition-all whitespace-nowrap self-end md:self-center">
                Ler comunicado →
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
