import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[580px] flex items-center justify-center overflow-hidden border-b border-amber-500/15">
      {/* Banner de fundo */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/banner.png"
          alt="Banner Epopeia do Fim"
          fill
          priority
          className="object-cover object-center opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-[#070b14]/60 to-[#070b14]/80" />
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 flex flex-col items-center text-center">
        <h1
          className="text-4xl md:text-6xl font-bold tracking-wider text-amber-200 mb-6 drop-shadow-md"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          Epopeia do Fim
        </h1>

        <p className="max-w-2xl text-slate-200 text-base md:text-lg leading-relaxed mb-10 font-light">
          Uma web novel épica de fantasia mitológica. Acompanhe a jornada dos deuses e mortais em um
          mundo à beira do colapso.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-5">
          <Link
            href="/capitulos"
            className="px-8 py-3.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold tracking-wider uppercase text-xs md:text-sm transition-all"
          >
            Ler Agora
          </Link>
          <Link
            href="/universo"
            className="px-8 py-3.5 rounded-lg border border-amber-500/40 bg-slate-950/60 hover:bg-amber-500/10 text-amber-200 font-medium tracking-wider uppercase text-xs md:text-sm transition-all"
          >
            Conhecer o Universo
          </Link>
        </div>
      </div>
    </section>
  );
}
