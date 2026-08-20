"use client";

import { useState } from "react";

interface ReaderControlsProps {
  children: React.ReactNode;
}

export default function ReaderControls({ children }: ReaderControlsProps) {
  const [theme, setTheme] = useState<"dark" | "sepia" | "light">("dark");
  const [fontSize, setFontSize] = useState<number>(18);

  const themeClasses = {
    dark: "bg-[#0c1220] text-slate-200 border-slate-800",
    sepia: "bg-[#f4ecd8] text-[#433422] border-[#e0d3b8]",
    light: "bg-[#f8fafc] text-slate-800 border-slate-200",
  };

  return (
    <div className="w-full">
      {/* Barra de Ferramentas de Leitura */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800 mb-8 backdrop-blur-md">
        {/* Ajuste do Tamanho da Fonte */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Fonte:
          </span>
          <button
            type="button"
            onClick={() => setFontSize((prev) => Math.max(14, prev - 2))}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 transition-colors cursor-pointer"
          >
            A-
          </button>
          <span className="text-xs font-mono px-1">{fontSize}px</span>
          <button
            type="button"
            onClick={() => setFontSize((prev) => Math.min(28, prev + 2))}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 transition-colors cursor-pointer"
          >
            A+
          </button>
        </div>

        {/* Alternador de Temas */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Tema:
          </span>
          <button
            type="button"
            onClick={() => setTheme("dark")}
            className={`px-3 py-1 rounded text-xs font-semibold transition-all cursor-pointer border ${
              theme === "dark"
                ? "bg-slate-950 text-amber-300 border-amber-500/50"
                : "bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200"
            }`}
          >
            Escuro
          </button>
          <button
            type="button"
            onClick={() => setTheme("sepia")}
            className={`px-3 py-1 rounded text-xs font-semibold transition-all cursor-pointer border ${
              theme === "sepia"
                ? "bg-[#ebdcb9] text-[#433422] border-[#bda67b]"
                : "bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200"
            }`}
          >
            Sépia
          </button>
          <button
            type="button"
            onClick={() => setTheme("light")}
            className={`px-3 py-1 rounded text-xs font-semibold transition-all cursor-pointer border ${
              theme === "light"
                ? "bg-white text-slate-900 border-slate-300"
                : "bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200"
            }`}
          >
            Claro
          </button>
        </div>
      </div>

      {/* Container de Texto com Tema e Tamanho Aplicados */}
      <div
        className={`p-6 md:p-12 rounded-2xl border transition-colors duration-300 shadow-2xl leading-relaxed font-serif ${themeClasses[theme]}`}
        style={{ fontSize: `${fontSize}px` }}
      >
        {children}
      </div>
    </div>
  );
}
