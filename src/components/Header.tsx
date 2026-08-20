import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#070b14]/80 border-b border-amber-500/15">
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-14 w-60">
            <Image
              src="/images/logo.png"
              alt="Epopeia do Fim"
              fill
              priority
              className="object-contain object-left"
            />
          </div>
        </Link>

        <nav className="flex items-center gap-8 text-xs md:text-sm font-semibold tracking-widest uppercase text-slate-300">
          <Link href="/" className="text-amber-400 border-b-2 border-amber-400 pb-1">
            Início
          </Link>
          <Link href="/capitulos" className="hover:text-amber-300 transition-colors">
            Capítulos
          </Link>
          <Link href="/universo" className="hover:text-amber-300 transition-colors">
            Universo
          </Link>
          <Link href="/noticias" className="hover:text-amber-300 transition-colors">
            Notícias
          </Link>
          <Link href="/sobre" className="hover:text-amber-300 transition-colors">
            Sobre
          </Link>
        </nav>
      </div>
    </header>
  );
}
