export interface Chapter {
  id: string;
  volume: number;
  number: number;
  title: string;
  releaseDate: string;
  slug: string;
  isNew?: boolean;
}

export const RECENT_CHAPTERS: Chapter[] = [
  {
    id: "1",
    volume: 1,
    number: 3,
    title: "O Despertar da Centelha",
    releaseDate: "18 Ago 2026",
    slug: "capitulo-3-o-despertar-da-centelha",
    isNew: true,
  },
  {
    id: "2",
    volume: 1,
    number: 2,
    title: "Ecos do Olimpo",
    releaseDate: "12 Ago 2026",
    slug: "capitulo-2-ecos-do-olimpo",
  },
  {
    id: "3",
    volume: 1,
    number: 1,
    title: "Prólogo: O Fim dos Tempos",
    releaseDate: "05 Ago 2026",
    slug: "capitulo-1-prologo-o-fim-dos-tempos",
  },
];
