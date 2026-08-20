export interface NewsItem {
  id: string;
  category: "Aviso" | "Lançamento" | "Lore" | "Ilustração";
  title: string;
  excerpt: string;
  date: string;
  slug: string;
}

export const LATEST_NEWS: NewsItem[] = [
  {
    id: "1",
    category: "Lançamento",
    title: "Volume 1 agora disponível para leitura completa",
    excerpt:
      "Confira todos os detalhes do lançamento oficial e as primeiras ilustrações dos personagens divinos.",
    date: "19 Ago 2026",
    slug: "volume-1-disponivel-leitura",
  },
  {
    id: "2",
    category: "Aviso",
    title: "Cronograma de publicação dos próximos capítulos",
    excerpt:
      "Os novos capítulos serão disponibilizados quinzenalmente às quartas-feiras a partir das 20h.",
    date: "15 Ago 2026",
    slug: "cronograma-publicacao-capitulos",
  },
];
