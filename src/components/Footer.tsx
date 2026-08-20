import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-amber-500/15 bg-slate-950/80 text-slate-400 py-12 mt-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {/* Coluna 1: Marca & Resumo */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <div className="h-10 w-44 flex items-center">
            <img
              src="/images/logo.png"
              alt="Epopeia do Fim"
              width={176}
              height={40}
              loading="eager"
              decoding="sync"
              className="h-10 w-auto object-contain"
            />
          </div>
          <p className="text-xs md:text-sm text-slate-400 max-w-sm leading-relaxed">
            Uma web novel épica de fantasia mitológica. Acompanhe a jornada dos deuses e mortais em
            um mundo à beira do colapso.
          </p>
        </div>

        {/* Coluna 2: Navegação Rápida */}
        <div>
          <h4
            className="text-sm font-semibold text-slate-100 uppercase tracking-wider mb-4"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            Navegação
          </h4>
          <ul className="flex flex-col gap-2.5 text-xs md:text-sm">
            <li>
              <Link href="/" className="hover:text-amber-300 transition-colors">
                Início
              </Link>
            </li>
            <li>
              <Link href="/capitulos" className="hover:text-amber-300 transition-colors">
                Lista de Capítulos
              </Link>
            </li>
            <li>
              <Link href="/universo" className="hover:text-amber-300 transition-colors">
                Universo & Lore
              </Link>
            </li>
            <li>
              <Link href="/noticias" className="hover:text-amber-300 transition-colors">
                Notícias & Avisos
              </Link>
            </li>
          </ul>
        </div>

        {/* Coluna 3: Links Úteis / Comunidade */}
        <div>
          <h4
            className="text-sm font-semibold text-slate-100 uppercase tracking-wider mb-4"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            Comunidade
          </h4>
          <ul className="flex flex-col gap-2.5 text-xs md:text-sm">
            <li>
              <a
                href="https://discord.gg"
                target="_blank"
                rel="noreferrer"
                className="hover:text-amber-300 transition-colors"
              >
                Discord Oficial
              </a>
            </li>
            <li>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-amber-300 transition-colors"
              >
                Twitter / X
              </a>
            </li>
            <li>
              <Link href="/sobre" className="hover:text-amber-300 transition-colors">
                Sobre o Autor
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Linha de Copyright */}
      <div className="max-w-7xl mx-auto px-6 pt-6 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p>© {new Date().getFullYear()} Epopeia do Fim. Todos os direitos reservados.</p>
        <p className="text-slate-600">Desenvolvido com Next.js, Tailwind CSS e TypeScript</p>
      </div>
    </footer>
  );
}
