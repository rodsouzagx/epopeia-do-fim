import Link from "next/link";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getSanityVolumesWithChapters } from "../../sanity/queries";
import { urlFor } from "../../sanity/client";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Índice de Capítulos | Epopeia do Fim",
  description: "Explore todos os volumes e capítulos da web novel mitológica Epopeia do Fim.",
};

export default async function ChaptersPage() {
  let sanityVolumes: any[] = [];
  try {
    sanityVolumes = (await getSanityVolumesWithChapters()) || [];
  } catch (error) {
    console.error("Erro ao buscar volumes do Sanity:", error);
  }

  const volumesToDisplay = sanityVolumes;

  return (
    <div className="flex flex-col min-h-screen bg-[#070b14] text-slate-100">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12">
        {/* Cabeçalho */}
        <div className="border-b border-amber-500/20 pb-6 mb-10">
          <span className="text-xs font-semibold tracking-widest text-amber-400 uppercase">
            Índice de Leitura
          </span>
          <h1
            className="text-3xl md:text-5xl font-bold text-amber-200 tracking-wide mt-2"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            Todos os Capítulos
          </h1>
          <p className="text-slate-400 text-sm md:text-base mt-2 font-light">
            Selecione um capítulo abaixo para iniciar ou continuar a sua jornada.
          </p>
        </div>

        {/* Listagem de Volumes */}
        <div className="flex flex-col gap-10">
          {volumesToDisplay.length > 0 ? (
            volumesToDisplay.map((vol: any, idx: number) => (
              <div
                key={vol._id || `volume-${vol.volumeNumber || idx}`}
                className="rounded-2xl bg-slate-900/40 border border-slate-800 p-6 md:p-8 backdrop-blur-sm shadow-xl"
              >
                {/* Cabeçalho do Volume */}
                <div className="flex flex-col md:flex-row gap-6 items-start border-b border-slate-800/80 pb-6 mb-6">
                  {vol.coverImage && (
                    <div className="inline-block rounded-xl overflow-hidden border border-amber-500/30 shadow-lg shrink-0">
                      <Image
                        src={urlFor(vol.coverImage).url()}
                        alt={vol.title}
                        width={120}
                        height={180}
                        className="w-24 md:w-28 h-auto object-cover"
                      />
                    </div>
                  )}

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase font-bold tracking-widest text-amber-400">
                        Volume {vol.volumeNumber}
                      </span>
                      <span className="text-xs text-slate-500 font-mono">
                        {vol.chapters?.length || 0}{" "}
                        {vol.chapters?.length === 1 ? "Capítulo" : "Capítulos"}
                      </span>
                    </div>

                    <h2
                      className="text-2xl md:text-3xl font-bold text-slate-100 mt-1"
                      style={{ fontFamily: "var(--font-cinzel)" }}
                    >
                      {vol.title}
                    </h2>

                    {vol.synopsis && (
                      <p className="text-xs md:text-sm text-slate-400 mt-2 font-light line-clamp-3">
                        {vol.synopsis}
                      </p>
                    )}
                  </div>
                </div>

                {/* Lista de Capítulos do Volume */}
                <div className="flex flex-col divide-y divide-slate-800/40">
                  {vol.chapters && vol.chapters.length > 0 ? (
                    vol.chapters.map((chapter: any, cIdx: number) => (
                      <Link
                        key={chapter._id || chapter.slug || `cap-${cIdx}`}
                        href={`/capitulos/${chapter.slug}`}
                        className="py-4 flex items-center justify-between group hover:pl-2 transition-all cursor-pointer"
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-xs font-mono text-amber-500/70 font-semibold">
                            #{String(chapter.chapterNumber).padStart(2, "0")}
                          </span>
                          <span className="text-sm md:text-base font-medium text-slate-200 group-hover:text-amber-300 transition-colors">
                            {chapter.title}
                          </span>
                        </div>

                        <div className="flex items-center gap-4">
                          {chapter.isNew && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-slate-950">
                              Novo
                            </span>
                          )}
                          <span className="text-xs text-slate-500 font-mono hidden sm:inline">
                            {chapter.releaseDate}
                          </span>
                          <span className="text-amber-400 text-xs group-hover:translate-x-1 transition-transform">
                            →
                          </span>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="py-4 text-xs text-slate-500 italic">
                      Nenhum capítulo publicado neste volume ainda.
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center rounded-2xl bg-slate-900/20 border border-slate-800 text-slate-500 italic text-sm">
              Nenhum volume ou capítulo publicado no momento.
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
