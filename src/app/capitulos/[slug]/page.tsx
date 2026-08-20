"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { ALL_CHAPTERS } from "../../../data/chapters";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ChapterReaderPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const currentSlug = resolvedParams.slug;

  const chapterIndex = ALL_CHAPTERS.findIndex((c) => c.slug === currentSlug);

  if (chapterIndex === -1) {
    notFound();
  }

  const chapter = ALL_CHAPTERS[chapterIndex];
  const previousChapter = chapterIndex > 0 ? ALL_CHAPTERS[chapterIndex - 1] : null;
  const nextChapter =
    chapterIndex < ALL_CHAPTERS.length - 1 ? ALL_CHAPTERS[chapterIndex + 1] : null;

  // Estados de customização do leitor
  const [fontSize, setFontSize] = useState<number>(18);
  const [readerTheme, setReaderTheme] = useState<"dark" | "sepia" | "light">("dark");

  // Configuração visual dos temas
  const themeStyles = {
    dark: "bg-[#0b101b] text-slate-200 border-slate-800",
    sepia: "bg-[#f4ecd8] text-[#3c2f2f] border-[#d8ccb0]",
    light: "bg-[#ffffff] text-[#1a1a1a] border-gray-200",
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#070b14] text-slate-100">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 md:px-6 py-8">
        {/* Barra Superior de Controles e Navegação */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800 mb-8 backdrop-blur-sm">
          <Link
            href="/capitulos"
            className="text-xs font-semibold uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1"
          >
            ← Voltar ao Índice
          </Link>

          {/* Ferramentas de Leitura */}
          <div className="flex items-center gap-4">
            {/* Ajuste de Fonte */}
            <div className="flex items-center gap-2 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800 text-xs">
              <button
                onClick={() => setFontSize((prev) => Math.max(14, prev - 2))}
                className="hover:text-amber-400 font-bold px-1 transition-colors"
                title="Diminuir fonte"
              >
                A-
              </button>
              <span className="text-slate-500 font-mono">|</span>
              <button
                onClick={() => setFontSize((prev) => Math.min(26, prev + 2))}
                className="hover:text-amber-400 font-bold px-1 transition-colors"
                title="Aumentar fonte"
              >
                A+
              </button>
            </div>

            {/* Alternador de Tema */}
            <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => setReaderTheme("dark")}
                className={`w-6 h-6 rounded-full bg-[#0b101b] border ${
                  readerTheme === "dark"
                    ? "border-amber-400 ring-2 ring-amber-400/20"
                    : "border-slate-700"
                }`}
                title="Tema Escuro"
              />
              <button
                onClick={() => setReaderTheme("sepia")}
                className={`w-6 h-6 rounded-full bg-[#f4ecd8] border ${
                  readerTheme === "sepia"
                    ? "border-amber-400 ring-2 ring-amber-400/20"
                    : "border-slate-700"
                }`}
                title="Tema Sépia"
              />
              <button
                onClick={() => setReaderTheme("light")}
                className={`w-6 h-6 rounded-full bg-[#ffffff] border ${
                  readerTheme === "light"
                    ? "border-amber-400 ring-2 ring-amber-400/20"
                    : "border-slate-700"
                }`}
                title="Tema Claro"
              />
            </div>
          </div>
        </div>

        {/* Container do Texto do Capítulo */}
        <article
          className={`p-6 md:p-12 rounded-2xl border transition-colors duration-300 shadow-xl ${themeStyles[readerTheme]}`}
        >
          {/* Cabeçalho do Capítulo */}
          <header className="text-center pb-8 mb-8 border-b border-inherit">
            <span className="text-xs uppercase tracking-widest font-semibold opacity-70">
              Volume {chapter.volume} • Capítulo {chapter.number}
            </span>
            <h1
              className="text-2xl md:text-4xl font-bold mt-2 mb-3"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              {chapter.title}
            </h1>
            <span className="text-xs opacity-60 font-light">
              Publicado em {chapter.releaseDate}
            </span>
          </header>

          {/* Parágrafos do Conteúdo */}
          <div
            className="flex flex-col gap-6 leading-relaxed font-serif"
            style={{ fontSize: `${fontSize}px` }}
          >
            {chapter.content.map((paragraph, index) => (
              <p key={index} className="indent-6 text-justify">
                {paragraph}
              </p>
            ))}
          </div>
        </article>

        {/* Navegação Inferior (Anterior / Próximo) */}
        <div className="flex items-center justify-between mt-10 gap-4">
          {previousChapter ? (
            <Link
              href={`/capitulos/${previousChapter.slug}`}
              className="px-5 py-3 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 text-xs md:text-sm font-semibold tracking-wider text-slate-300 hover:text-amber-300 transition-all flex items-center gap-2"
            >
              ← Anterior
            </Link>
          ) : (
            <div />
          )}

          <Link
            href="/capitulos"
            className="text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-amber-400 transition-colors"
          >
            Lista de Capítulos
          </Link>

          {nextChapter ? (
            <Link
              href={`/capitulos/${nextChapter.slug}`}
              className="px-5 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs md:text-sm font-bold tracking-wider transition-all flex items-center gap-2"
            >
              Próximo →
            </Link>
          ) : (
            <div />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
