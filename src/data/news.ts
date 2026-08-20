export interface NewsItem {
  id: string;
  category: "Aviso" | "Lançamento" | "Lore" | "Ilustração";
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  content: string[];
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
    content: [
      "É com grande entusiasmo que anunciamos a disponibilização do Volume 1 completo da web novel Epopeia do Fim.",
      "Neste primeiro arco, 'O Crepúsculo dos Deuses', acompanhamos os eventos iniciais que levaram à ruptura da abóbada celeste e ao despertar da centelha primordial.",
      "Agradecemos imensamente a todos os leitores que acompanharam os primeiros rascunhos. Novos capítulos e materiais complementares continuarão sendo publicados regularmente.",
    ],
  },
  {
    id: "2",
    category: "Aviso",
    title: "Cronograma de publicação dos próximos capítulos",
    excerpt:
      "Os novos capítulos serão disponibilizados quinzenalmente às quartas-feiras a partir das 20h.",
    date: "15 Ago 2026",
    slug: "cronograma-publicacao-capitulos",
    content: [
      "Para manter a consistência e a alta qualidade da narrativa e revisão, definimos o calendário oficial de lançamentos.",
      "As publicações ocorrerão quinzenalmente, sempre às quartas-feiras às 20h00 (horário de Brasília).",
      "Qualquer alteração pontual no cronograma devido a revisões estendidas ou ilustrações especiais será comunicada previamente aqui no mural de notícias e no servidor do Discord.",
    ],
  },
  {
    id: "3",
    category: "Ilustração",
    title: "Primeiros rascunhos visuais de Kaelen e Astraeos",
    excerpt:
      "Veja as artes conceituais produzidas para o protagonista e a entidade celestial do primeiro volume.",
    date: "10 Ago 2026",
    slug: "primeiros-rascunhos-visuais",
    content: [
      "Compartilhamos hoje os primeiros conceitos visuais das vestimentas rúnicas de Kaelen e da aura luminosa de Astraeos.",
      "Essas ilustrações estão sendo utilizadas como referência para enriquecer a descrição dos cenários e as fichas oficiais da Enciclopédia.",
      "Em breve disponibilizaremos uma galeria dedicada para os leitores conferirem mais detalhes da arte conceitual.",
    ],
  },
];
