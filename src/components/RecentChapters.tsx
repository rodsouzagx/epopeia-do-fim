import Link from "next/link";
import Image from "next/image";
import { getSanityVolumesWithChapters } from "../sanity/queries";
import { urlFor } from "../sanity/client";

export default async function RecentChapters() {
  let volumes: any[] = [];
  try {
    volumes = (await getSanityVolumesWithChapters()) || [];
  } catch (error) {
    console.error("Erro ao carregar capítulos recentes do Sanity:", error);
  }

  const chapters = volumes
    .flatMap((v) =>
      (v.chapters || []).map((c: any) => ({
        _id: c._id,
        title: c.title,
        slug: c.slug,
        number: c.chapterNumber,
        releaseDate: c.releaseDate,
        isNew: c.isNew,
        volumeNumber: v.volumeNumber,
        coverImage: v.coverImage,
      })),
    )
    .reverse();

  const recentList = chapters.slice(0, 3);

  if (recentList.length === 0) {
    return null;
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recentList.map((chap: any, idx: number) => (
          <Link
            key={chap._id || chap.slug || idx}
            href={`/capitulos/${chap.slug}`}
            className="group relative p-4 rounded-xl bg-slate-900/40 border border-slate-800 hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-900/80 flex flex-col justify-between"
          >
            <div className="flex gap-4 items-start">
              {/* Miniatura Otimizada (sem piscada) */}
              {chap.coverImage && (
                <div className="shrink-0 w-16 h-24 rounded-lg overflow-hidden border border-amber-500/20 relative shadow-md bg-slate-950">
                  <Image
                    src={urlFor(chap.coverImage)
                      .width(120)
                      .height(180)
                      .auto("format")
                      .quality(80)
                      .url()}
                    alt={`Capa Volume ${chap.volumeNumber}`}
                    fill
                    sizes="64px"
                    priority={idx === 0}
                    className="object-cover"
                  />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className="text-[11px] font-medium tracking-wider text-slate-400 uppercase">
                    Vol. {chap.volumeNumber} • Cap. {chap.number}
                  </span>
                  {chap.isNew && (
                    <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-500 text-slate-950">
                      Novo
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-semibold text-slate-100 group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug">
                  {chap.title}
                </h3>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span className="text-[11px] font-mono">{chap.releaseDate}</span>
              <span className="font-medium text-amber-400/80 group-hover:text-amber-300 transition-colors text-[11px]">
                Ler capítulo →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
