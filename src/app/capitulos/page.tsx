import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";
import { ALL_CHAPTERS, Chapter } from "../../data/chapters";

export const metadata = {
  title: "Capítulos | Epopeia do Fim",
  description: "Índice completo de volumes e capítulos da Light Novel Epopeia do Fim.",
};

export default function ChaptersPage() {
  // Agrupar capítulos por volume dinamicamente
  const volumes = Array.from(new Set(ALL_CHAPTERS.map((c) => c.volume)));

  return (
    <div className="flex flex-col min-h-screen bg-[#070b14] text-slate-100">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12">
        {/* Cabeçalho da Página */}
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

        {/* Lista de Volumes */}
        <div className="flex flex-col gap-10">
          {volumes.map((volumeNum) => {
            const volumeChapters = ALL_CHAPTERS.filter((c) => c.volume === volumeNum);
            const volumeTitle = volumeChapters[0]?.volumeTitle || `Volume ${volumeNum}`;

            return (
              <section
                key={volumeNum}
                className="bg-slate-900/30 border border-slate-800/80 rounded-2xl p-6 md:p-8"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-4 mb-6 gap-2">
                  <div>
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                      Volume {volumeNum}
                    </span>
                    <h2
                      className="text-xl md:text-2xl font-bold text-slate-100"
                      style={{ fontFamily: "var(--font-cinzel)" }}
                    >
                      {volumeTitle}
                    </h2>
                  </div>
                  <span className="text-xs text-slate-400">
                    {volumeChapters.length} {volumeChapters.length === 1 ? "Capítulo" : "Capítulos"}
                  </span>
                </div>

                {/* Lista de Itens do Volume */}
                <div className="flex flex-col divide-y divide-slate-800/50">
                  {volumeChapters.map((chap: Chapter) => (
                    <Link
                      key={chap.id}
                      href={`/capitulos/${chap.slug}`}
                      className="group py-4 flex items-center justify-between hover:px-2 transition-all rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-xs font-bold text-amber-400/70 w-8">
                          #{chap.number.toString().padStart(2, "0")}
                        </span>
                        <div>
                          <h3 className="text-sm md:text-base font-medium text-slate-200 group-hover:text-amber-300 transition-colors">
                            {chap.title}
                          </h3>
                          <span className="text-xs text-slate-500 md:hidden">
                            {chap.releaseDate}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        {chap.isNew && (
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            Novo
                          </span>
                        )}
                        <span className="hidden md:inline text-xs text-slate-400">
                          {chap.releaseDate}
                        </span>
                        <span className="text-amber-400 group-hover:translate-x-1 transition-transform">
                          →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
