"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname() || "/";

  const isLinkActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const navLinks = [
    { label: "Início", href: "/" },
    { label: "Capítulos", href: "/capitulos" },
    { label: "Universo", href: "/universo" },
    { label: "Notícias", href: "/noticias" },
    { label: "Sobre", href: "/sobre" },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#070b14]/80 border-b border-amber-500/15">
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-14 w-60 flex items-center">
            <img
              src="/images/logo.png"
              alt="Epopeia do Fim"
              className="w-full h-full object-contain object-left"
              loading="eager"
              decoding="sync"
            />
          </div>
        </Link>

        <nav className="flex items-center gap-8 text-xs md:text-sm font-semibold tracking-widest uppercase">
          {navLinks.map((link) => {
            const active = isLinkActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-all duration-300 ${
                  active
                    ? "text-amber-400 drop-shadow-[0_0_10px_rgba(245,158,11,0.6)]"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
