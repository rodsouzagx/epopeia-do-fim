import Header from "../../components/Header";
import Footer from "../../components/Footer";
import LoreExplorer from "../../components/LoreExplorer";
import { getSanityLore } from "../../sanity/queries";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Enciclopédia & Universo | Epopeia do Fim",
  description: "Explore as lendas, divindades, personagens e cenários de Epopeia do Fim.",
};

export default async function LorePage() {
  let items: any[] = [];
  try {
    items = (await getSanityLore()) || [];
  } catch (error) {
    console.error("Erro ao carregar dados do Universo do Sanity:", error);
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#070b14] text-slate-100">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12">
        {/* Cabeçalho */}
        <div className="border-b border-amber-500/20 pb-6 mb-10 text-center md:text-left">
          <span className="text-xs font-semibold tracking-widest text-amber-400 uppercase">
            Enciclopédia & Arquivos
          </span>
          <h1
            className="text-3xl md:text-5xl font-bold text-amber-200 tracking-wide mt-2"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            O Universo de Epopeia
          </h1>
          <p className="text-slate-400 text-sm md:text-base mt-2 font-light max-w-2xl">
            Explore as lendas, divindades, personagens e cenários esquecidos que compõem este mundo
            em colapso.
          </p>
        </div>

        {/* Componente com Filtros e Dados Prontos */}
        <LoreExplorer items={items} />
      </main>

      <Footer />
    </div>
  );
}
