import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { getSanityNewsBySlug } from "../../../sanity/queries";
import { LATEST_NEWS } from "../../../data/news";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // 1. Tenta buscar no Sanity
  let newsItem: any = null;
  try {
    newsItem = await getSanityNewsBySlug(slug);
  } catch (error) {
    console.error("Erro ao buscar notícia no Sanity:", error);
  }

  // 2. Fallback para os dados estáticos locais se não encontrar no Sanity
  if (!newsItem) {
    newsItem = LATEST_NEWS.find((n) => n.slug === slug);
  }

  if (!newsItem) {
    notFound();
  }

  // Verifica se o conteúdo é o formato Block Content do Sanity (array de objetos com _type)
  const isPortableText =
    Array.isArray(newsItem.content) &&
    newsItem.content.length > 0 &&
    typeof newsItem.content[0] === "object";

  return (
    <div className="flex flex-col min-h-screen bg-[#070b14] text-slate-100">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12">
        <Link
          href="/noticias"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors mb-8 cursor-pointer"
        >
          ← Voltar para Notícias
        </Link>

        <article className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 md:p-12 shadow-2xl">
          {/* Cabeçalho da Notícia */}
          <header className="border-b border-slate-800 pb-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-800 text-amber-300 border border-slate-700">
                {newsItem.category}
              </span>
              <span className="text-xs text-slate-400 font-mono">{newsItem.date}</span>
            </div>

            <h1
              className="text-2xl md:text-4xl font-bold text-slate-100 tracking-wide"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              {newsItem.title}
            </h1>
          </header>

          {/* Conteúdo Renderizado (Sanity PortableText ou Array de Strings) */}
          <div className="flex flex-col gap-6 text-slate-300 leading-relaxed text-base font-light">
            {isPortableText ? (
              <PortableText value={newsItem.content} />
            ) : (
              Array.isArray(newsItem.content) &&
              newsItem.content.map((paragraph: string, index: number) => (
                <p key={index}>{paragraph}</p>
              ))
            )}
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
