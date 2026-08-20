import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export const metadata = {
  title: "Sobre o Autor | Epopeia do Fim",
  description: "Conheça a mente por trás da web novel mitológica Epopeia do Fim.",
};

export default function AboutPage() {
  const faqs = [
    {
      q: "Com que frequência saem novos capítulos?",
      a: "Os lançamentos são quinzenais, sempre às quartas-feiras às 20h00 (horário de Brasília). Qualquer imprevisto será avisado na página de Notícias e no Discord.",
    },
    {
      q: "A obra será impressa ou lançada em e-book?",
      a: "O foco inicial é a publicação digital gratuita em formato web novel. Compilações completas de cada volume em e-book estão nos planos futuros.",
    },
    {
      q: "Quais são as principais inspirações da história?",
      a: "Mitologia clássica grega e nórdica, cosmologia fantástica, além da influência de clássicos da literatura épica e dark fantasy contemporânea.",
    },
    {
      q: "Onde posso interagir e enviar teorias sobre a lore?",
      a: "A comunidade se reúne no nosso servidor oficial do Discord e nas discussões pelo X (Twitter). Leitores e teóricos são sempre bem-vindos!",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#070b14] text-slate-100">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12">
        {/* Cabeçalho */}
        <div className="border-b border-amber-500/20 pb-6 mb-10 text-center md:text-left">
          <span className="text-xs font-semibold tracking-widest text-amber-400 uppercase">
            Bastidores & Concepção
          </span>
          <h1
            className="text-3xl md:text-5xl font-bold text-amber-200 tracking-wide mt-2"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            Sobre a Obra & o Autor
          </h1>
          <p className="text-slate-400 text-sm md:text-base mt-2 font-light">
            Conheça o processo de criação e o universo por trás de Epopeia do Fim.
          </p>
        </div>

        {/* Card do Autor / Manifesto */}
        <section className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 md:p-10 mb-12 shadow-xl">
          <div className="flex flex-col gap-6">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-amber-400 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
                O Autor
              </span>
              <h2
                className="text-2xl md:text-3xl font-bold text-slate-100 mt-4"
                style={{ fontFamily: "var(--font-cinzel)" }}
              >
                A Forja das Lendas
              </h2>
            </div>

            <div className="flex flex-col gap-4 text-slate-300 leading-relaxed font-light text-sm md:text-base">
              <p>
                <strong className="text-amber-200 font-semibold">Epopeia do Fim</strong> nasceu da
                paixão por narrativas mitológicas, tragédias cósmicas e mundos construídos com
                atenção meticulosa aos detalhes de lore e ambientação.
              </p>
              <p>
                A proposta central é apresentar uma jornada onde deuses não são intocáveis e mortais
                não são meros peões. Cada capítulo é escrito com o objetivo de equilibrar prosa
                imersiva, ritmo narrativo dinâmico e combates épicos contra forças primordiais.
              </p>
              <p>
                Este site foi idealizado tanto como uma casa dedicada para a leitura contínua da
                história quanto como uma enciclopédia viva de seus mistérios.
              </p>
            </div>

            {/* Redes & Contato */}
            <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center gap-4">
              <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                Canais Oficiais:
              </span>
              <a
                href="https://discord.gg"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-lg bg-slate-950/80 border border-slate-800 hover:border-amber-500/50 text-xs font-semibold text-slate-300 hover:text-amber-300 transition-all"
              >
                Discord
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-lg bg-slate-950/80 border border-slate-800 hover:border-amber-500/50 text-xs font-semibold text-slate-300 hover:text-amber-300 transition-all"
              >
                Twitter / X
              </a>
              <Link
                href="/capitulos"
                className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all ml-auto"
              >
                Começar a Leitura →
              </Link>
            </div>
          </div>
        </section>

        {/* Seção de FAQ */}
        <section>
          <div className="mb-6">
            <span className="text-xs font-semibold tracking-widest text-amber-400 uppercase">
              Dúvidas
            </span>
            <h2
              className="text-2xl md:text-3xl font-bold text-slate-100 mt-1"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              Perguntas Frequentes (FAQ)
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-slate-900/30 border border-slate-800/80 hover:border-slate-700 transition-colors"
              >
                <h3 className="text-base font-semibold text-amber-200 mb-2">{faq.q}</h3>
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-light">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
