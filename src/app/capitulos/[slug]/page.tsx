import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import ReaderControls from "../../../components/ReaderControls";
import SanityPortableText from "../../../components/SanityPortableText";
import { getSanityChapterBySlug } from "../../../sanity/queries";
import { client, urlFor } from "../../../sanity/client";
import { ALL_CHAPTERS, Chapter } from "../../../data/chapters";
import { groq } from "next-sanity";

// Mantém cache incremental rápido de 60 segundos
export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Pré-renderiza todos os capítulos no momento do build
export async function generateStaticParams() {
  try {
    const slugs: string[] = await client.fetch(
      groq`*[_type == "chapter" && defined(slug.current)][].slug.current`,
    );

    if (slugs && slugs.length > 0) {
      return slugs.map((slug) => ({ slug }));
    }
  } catch (error) {
    console.error("Erro ao gerar static params de Capítulos:", error);
  }

  // Fallback caso a API não responda durante o build
  return ALL_CHAPTERS.map((chapter) => ({
    slug: chapter.slug,
  }));
}

// Metadados dinâmicos para SEO, WhatsApp, Twitter/X e Discord
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  let data: any = null;
  try {
    data = await getSanityChapterBySlug(slug);
  } catch (e) {
    console.error("Erro ao gerar metadados:", e);
  }

  const chapter = data?.chapter;

  if (!chapter) {
    return {
      title: "Capítulo | Epopeia do Fim",
    };
  }

  const title = `${chapter.title} - Vol. ${chapter.volumeNumber} | Epopeia do Fim`;
  const description = `Leia o capítulo ${chapter.chapterNumber}: ${chapter.title} da web novel Epopeia do Fim.`;
  const imageUrl = chapter.displayImage
    ? urlFor(chapter.displayImage).width(1200).height(630).url()
    : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630, alt: chapter.title }] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function ChapterReaderPage({ params }: PageProps) {
  const { slug } = await params;

  // 1. Busca no Sanity com o Volume relacionado
  let data: any = null;
  try {
    data = await getSanityChapterBySlug(slug);
  } catch (e) {
    console.error("Erro ao buscar capítulo no Sanity:", e);
  }

  let chapter: any = data?.chapter;
  let previousChapter: any = data?.previousChapter;
  let nextChapter: any = data?.nextChapter;

  // 2. Fallback para os dados estáticos locais se não encontrar no Sanity
  if (!chapter) {
    const localIndex = ALL_CHAPTERS.findIndex((c: Chapter) => c.slug === slug);
    if (localIndex !== -1) {
      const local = ALL_CHAPTERS[localIndex];
      chapter = {
        title: local.title,
        slug: local.slug,
        volumeNumber: local.volume,
        volumeTitle: local.volumeTitle,
        chapterNumber: local.number,
        releaseDate: local.releaseDate,
        content: local.content,
        displayImage: null,
      };
      const prev = localIndex > 0 ? ALL_CHAPTERS[localIndex - 1] : null;
      const next = localIndex < ALL_CHAPTERS.length - 1 ? ALL_CHAPTERS[localIndex + 1] : null;

      previousChapter = prev ? { title: prev.title, slug: prev.slug } : null;
      nextChapter = next ? { title: next.title, slug: next.slug } : null;
    }
  }

  if (!chapter) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#070b14] text-slate-100">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 md:px-8 py-10">
        {/* Navegação Superior */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-8">
          <Link
            href="/capitulos"
            className="text-xs uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors font-semibold"
          >
            ← Índice de Capítulos
          </Link>
          <div className="text-xs text-slate-500 font-mono">
            Volume {chapter.volumeNumber} • Cap. {chapter.chapterNumber}
          </div>
        </div>

        {/* Capa do Volume / Ilustração do Capítulo */}
        {chapter.displayImage && (
          <div className="flex justify-center mb-10">
            <div className="w-64 sm:w-72 md:w-80 h-96 sm:h-[430px] md:h-[480px] rounded-2xl overflow-hidden border-2 border-amber-500/40 shadow-2xl shadow-amber-950/20 bg-slate-900">
              <img
                src={urlFor(chapter.displayImage)
                  .width(640)
                  .height(960)
                  .fit("crop")
                  .auto("format")
                  .quality(85)
                  .url()}
                alt={chapter.title}
                className="w-full h-full object-cover"
                loading="eager"
                decoding="sync"
              />
            </div>
          </div>
        )}

        {/* Cabeçalho do Capítulo */}
        <header className="text-center mb-10">
          <span className="text-xs uppercase font-bold tracking-widest text-amber-400">
            {chapter.volumeTitle}
          </span>
          <h1
            className="text-3xl md:text-5xl font-bold text-slate-100 mt-2 tracking-wide"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            {chapter.title}
          </h1>
          <p className="text-xs text-slate-500 mt-3 font-mono">
            Publicado em {chapter.releaseDate}
          </p>
        </header>

        {/* Leitor com Controles e Renderizador de Conteúdo */}
        <ReaderControls>
          {chapter.body ? (
            <SanityPortableText value={chapter.body} />
          ) : (
            chapter.content?.map((paragraph: string, idx: number) => (
              <p key={idx} className="mb-6 leading-relaxed font-light">
                {paragraph}
              </p>
            ))
          )}
        </ReaderControls>

        {/* Navegação Inferior (Anterior / Próximo) */}
        <nav className="flex items-center justify-between border-t border-slate-800 pt-8 mt-12">
          {previousChapter ? (
            <Link
              href={`/capitulos/${previousChapter.slug}`}
              className="flex flex-col text-left group cursor-pointer"
            >
              <span className="text-xs uppercase tracking-wider text-slate-500 group-hover:text-amber-400 transition-colors">
                ← Capítulo Anterior
              </span>
              <span className="text-sm font-semibold text-slate-200 group-hover:text-amber-200 transition-colors">
                {previousChapter.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {nextChapter ? (
            <Link
              href={`/capitulos/${nextChapter.slug}`}
              className="flex flex-col text-right group cursor-pointer"
            >
              <span className="text-xs uppercase tracking-wider text-slate-500 group-hover:text-amber-400 transition-colors">
                Próximo Capítulo →
              </span>
              <span className="text-sm font-semibold text-slate-200 group-hover:text-amber-200 transition-colors">
                {nextChapter.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </main>

      <Footer />
    </div>
  );
}
