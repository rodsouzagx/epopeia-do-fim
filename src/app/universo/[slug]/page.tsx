import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { getSanityLoreBySlug } from "../../../sanity/queries";
import { client, urlFor } from "../../../sanity/client";
import { LORE_ITEMS } from "../../../data/lore";
import { groq } from "next-sanity";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Pré-renderiza todas as páginas de Lore no momento do build
export async function generateStaticParams() {
  try {
    const slugs: string[] = await client.fetch(
      groq`*[_type == "lore" && defined(slug.current)][].slug.current`,
    );

    if (slugs && slugs.length > 0) {
      return slugs.map((slug) => ({ slug }));
    }
  } catch (error) {
    console.error("Erro ao gerar static params de Lore:", error);
  }

  // Fallback estático caso a API não responda durante o build
  return LORE_ITEMS.map((item) => ({
    slug: item.slug,
  }));
}

// Metadados dinâmicos para SEO, WhatsApp, Twitter/X e Discord
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  let item: any = null;
  try {
    item = await getSanityLoreBySlug(slug);
  } catch (error) {
    console.error("Erro ao gerar metadados de Lore:", error);
  }

  if (!item) {
    item = LORE_ITEMS.find((l) => l.slug === slug);
  }

  if (!item) {
    return {
      title: "Registro de Lore | Enciclopédia Epopeia do Fim",
    };
  }

  const title = `${item.name} (${item.category}) | Universo - Epopeia do Fim`;
  const description =
    item.description || `Conheça mais sobre ${item.name} no universo de Epopeia do Fim.`;
  const imageUrl = item.image ? urlFor(item.image).width(1200).height(630).url() : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630, alt: item.name }] : [],
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

export default async function LoreDetailPage({ params }: PageProps) {
  const { slug } = await params;

  let item: any = null;
  try {
    item = await getSanityLoreBySlug(slug);
  } catch (error) {
    console.error("Erro ao buscar item de Lore no Sanity:", error);
  }

  if (!item) {
    item = LORE_ITEMS.find((l) => l.slug === slug);
  }

  if (!item) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#070b14] text-slate-100">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-10">
        <Link
          href="/universo"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors mb-8"
        >
          ← Voltar para a Enciclopédia
        </Link>

        {/* Layout em Grid Ficha Wiki / RPG */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Coluna Esquerda: Retrato e Metadados */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 shadow-2xl overflow-hidden">
              {item.image ? (
                <div className="w-full h-80 sm:h-96 rounded-xl overflow-hidden border border-amber-500/30 shadow-lg shadow-amber-500/10 bg-slate-950 mb-5">
                  <img
                    src={urlFor(item.image)
                      .width(600)
                      .height(800)
                      .fit("crop")
                      .auto("format")
                      .quality(85)
                      .url()}
                    alt={item.name}
                    loading="eager"
                    decoding="sync"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              ) : (
                <div className="w-full h-80 sm:h-96 rounded-xl overflow-hidden border border-slate-800 bg-slate-950/80 flex items-center justify-center mb-5 text-slate-600 font-mono text-xs">
                  Sem Retrato
                </div>
              )}

              {/* Atributos da Ficha */}
              <div className="flex flex-col divide-y divide-slate-800/80 text-xs">
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-slate-500 uppercase tracking-wider font-mono">
                    Categoria
                  </span>
                  <span className="font-semibold text-amber-400 uppercase tracking-wider bg-slate-800/60 px-2.5 py-0.5 rounded border border-slate-700">
                    {item.category}
                  </span>
                </div>

                {item.affinity && (
                  <div className="py-2.5 flex justify-between items-center">
                    <span className="text-slate-500 uppercase tracking-wider font-mono">
                      Afinidade / Domínio
                    </span>
                    <span className="font-semibold text-amber-200">{item.affinity}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Coluna Direita: Lore, Citação e Registros */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <article className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl">
              {/* Título & Epíteto */}
              <div className="border-b border-slate-800 pb-6 mb-6">
                <h1
                  className="text-3xl md:text-5xl font-bold text-slate-100 tracking-wide"
                  style={{ fontFamily: "var(--font-cinzel)" }}
                >
                  {item.name}
                </h1>
                {item.title && (
                  <h2 className="text-lg md:text-xl text-amber-300 font-medium mt-1 tracking-wide">
                    {item.title}
                  </h2>
                )}
              </div>

              {/* Citação */}
              {item.quote && (
                <div className="mb-8 p-4 rounded-xl bg-slate-950/60 border-l-4 border-amber-500">
                  <p className="text-sm md:text-base italic text-slate-300">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>
              )}

              {/* Visão Geral */}
              <div className="mb-8">
                <h3
                  className="text-xs font-bold uppercase tracking-widest text-amber-400/90 mb-3"
                  style={{ fontFamily: "var(--font-cinzel)" }}
                >
                  Visão Geral
                </h3>
                <p className="text-sm md:text-base text-slate-300 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>

              {/* Registros & Arquivos */}
              {item.details && item.details.length > 0 && (
                <div className="pt-6 border-t border-slate-800">
                  <h3
                    className="text-xs font-bold uppercase tracking-widest text-amber-400/90 mb-4"
                    style={{ fontFamily: "var(--font-cinzel)" }}
                  >
                    Registros & Arquivos
                  </h3>
                  <ul className="flex flex-col gap-3">
                    {item.details.map((detail: string, idx: number) => (
                      <li
                        key={idx}
                        className="text-xs md:text-sm text-slate-300 flex items-start gap-3 bg-slate-950/40 p-3.5 rounded-lg border border-slate-800/60"
                      >
                        <span className="text-amber-400 font-bold mt-0.5">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
