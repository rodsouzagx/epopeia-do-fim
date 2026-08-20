export interface Chapter {
  id: string;
  volume: number;
  volumeTitle: string;
  number: number;
  title: string;
  releaseDate: string;
  slug: string;
  isNew?: boolean;
  content: string[]; // Parágrafos do capítulo
}

export const ALL_CHAPTERS: Chapter[] = [
  {
    id: "1",
    volume: 1,
    volumeTitle: "O Crepúsculo dos Deuses",
    number: 1,
    title: "Prólogo: O Fim dos Tempos",
    releaseDate: "05 Ago 2026",
    slug: "capitulo-1-prologo-o-fim-dos-tempos",
    content: [
      "O céu não desabou com trovões ou tempestades, mas com um silêncio absoluto. Quando as constelações começaram a se apagar uma a uma, os sábios da cidadela entenderam que a era dos homens havia chegado ao seu crepúsculo.",
      "No alto do monte sagrado, as chamas eternas que ardiam desde a primeira era vacilaram. O ar tornou-se pesado, impregnado com o cheiro de cinzas antigas e éter estagnado.",
      "— Se os deuses caírem hoje — sussurrou o jovem guardião, apertando o punho de sua espada gasta —, quem herdará as cinzas deste mundo?",
      "Nenhuma resposta veio dos céus, apenas o sussurro gélido do vento que varria os degraus de mármore do templo esquecido.",
    ],
  },
  {
    id: "2",
    volume: 1,
    volumeTitle: "O Crepúsculo dos Deuses",
    number: 2,
    title: "Ecos do Olimpo",
    releaseDate: "12 Ago 2026",
    slug: "capitulo-2-ecos-do-olimpo",
    content: [
      "As ruínas ainda fumegavam quando os primeiros passos ressoaram no santuário quebrado.",
      "Cada estátua destruída contava a história de uma divindade esquecida. A terra parecia pulsar sob os pés, como se o próprio coração do mundo estivesse lutando para continuar batendo diante do abismo iminente.",
      "— Não podemos permanecer aqui por muito tempo — alertou a mulher de manto cinzento, recolhendo um fragmento brilhante de relíquia divina. — As sombras deste lugar não dormem.",
    ],
  },
  {
    id: "3",
    volume: 1,
    volumeTitle: "O Crepúsculo dos Deuses",
    number: 3,
    title: "O Despertar da Centelha",
    releaseDate: "18 Ago 2026",
    slug: "capitulo-3-o-despertar-da-centelha",
    isNew: true,
    content: [
      "A escuridão foi subitamente cortada por um clarão dourado. No peito do guerreiro ferido, a marca antiga brilhou com intensidade renovada.",
      "Não era magia comum. Era a própria centelha primordial reagindo ao perigo mortal que se aproximava pelas colinas.",
      "— O destino pode ter sido escrito pelos deuses antigos, mas a tinta já secou — declarou ele, erguendo a lâmina recém-forjada em direção ao horizonte negro.",
    ],
  },
];

// Capítulos recentes ordenados do mais recente para o mais antigo
export const RECENT_CHAPTERS: Chapter[] = [...ALL_CHAPTERS].reverse();
