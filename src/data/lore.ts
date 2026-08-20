export interface LoreItem {
  id: string;
  slug: string;
  category: "personagens" | "deuses" | "locais";
  name: string;
  title: string;
  affinity?: string;
  description: string;
  quote?: string;
  details?: string[];
}

export const LORE_ITEMS: LoreItem[] = [
  // Personagens
  {
    id: "1",
    slug: "kaelen",
    category: "personagens",
    name: "Kaelen",
    title: "O Portador da Centelha",
    affinity: "Fogo Primordial / Éter",
    description:
      "Um jovem guardião que despertou a marca da chama esquecida durante a queda do primeiro santuário. Carrega consigo o fardo de reacender as constelações caídas.",
    quote: "A centelha não busca a glória, apenas se recusa a virar cinzas.",
    details: [
      "Nascido nas cercanias da Cidadela de Aethelgard, Kaelen serviu nos batalhões de vigília exterior.",
      "Durante o cataclismo inicial, sua lâmina quebrou-se contra as sombras cósmicas, manifestando a centelha primordial adormecida em sua linhagem.",
      "Atualmente busca os templos esquecidos para reunir os fragmentos celestes antes que o firmamento se apague completamente.",
    ],
  },
  {
    id: "2",
    slug: "selene-de-manto-cinzento",
    category: "personagens",
    name: "Selene de Manto Cinzento",
    title: "A Tecedora de Ecos",
    affinity: "Sombras / Relíquias Antigas",
    description:
      "Misteriosa andarilha que conhece os segredos dos templos perdidos. Guiou guerreiros através do abismo mantendo sua verdadeira linhagem oculta.",
    quote: "As ruínas não guardam apenas pedras, guardam os lamentos dos que caíram.",
    details: [
      "Pouco se sabe sobre sua verdadeira origem antes da grande ruína.",
      "Ela é capaz de decifrar as runas primordiais dos templos caídos e manipular resíduos de éter espiritual.",
      "Age como conselheira e guia através dos territórios corrompidos pela entropia.",
    ],
  },

  // Deuses
  {
    id: "3",
    slug: "astraeos",
    category: "deuses",
    name: "Astraeos",
    title: "Soberano dos Céus Partidos",
    affinity: "Luz Divina / Ordem",
    description:
      "O último dos deuses primordiais que ainda mantém vigília sobre o firmamento, enquanto seu poder se dissipa lentamente na escuridão cósmica.",
    quote: "O firmamento cairá, mas até o último suspiro, haverá luz.",
    details: [
      "Foi o arquiteto da abóbada celeste que manteve a entropia contida por milênios.",
      "Com a quebra das primeiras estrelas, sua forma física manifesta-se apenas como um eco distante nos picos mais altos do mundo.",
    ],
  },
  {
    id: "4",
    slug: "nyxarath",
    category: "deuses",
    name: "Nyxarath",
    title: "A Entropia Rastejante",
    affinity: "Vazio Cósmico / Caos",
    description:
      "Uma entidade primordial que emergiu do vácuo entre as estrelas apagadas, alimentando-se do silêncio deixado pela morte das divindades.",
    quote: "O silêncio não é ausência; é o estado perfeito de tudo o que finda.",
    details: [
      "Não possui corpo material, manifestando-se através de sombras densas que consomem a energia etérea.",
      "Sua presença corrompe relíquias sagradas e distorce a passagem do tempo ao redor de suas aparições.",
    ],
  },

  // Locais
  {
    id: "5",
    slug: "cidadela-de-aethelgard",
    category: "locais",
    name: "Cidadela de Aethelgard",
    title: "O Último Bastião dos Homens",
    affinity: "Muralhas de Pedra Rúnica",
    description:
      "A fortaleza construída no sopé do monte sagrado, protegida por barreiras antigas de éter que sustentam os últimos refugiados do continente.",
    quote: "Enquanto as tochas arderem nos muros, a humanidade resistirá.",
    details: [
      "As muralhas foram esculpidas em pedra enriquecida com veios de éter natural.",
      "Abriga os últimos eruditos dedicados a catalogar as constelações remanescentes.",
    ],
  },
  {
    id: "6",
    slug: "o-abismo-da-estrela-caida",
    category: "locais",
    name: "O Abismo da Estrela Caída",
    title: "Cratera do Fim",
    affinity: "Cinzas e Fragmentos Celestes",
    description:
      "O ponto de impacto onde a primeira constelação colidiu contra a terra, transformando terras férteis em um deserto gélido de cinzas luminescentes.",
    quote: "A terra onde o céu sangrou.",
    details: [
      "Um local inóspito onde o solo emite uma luminescência azulada constante.",
      "Monólitos de gelo e cinzas cobrem a extensão da cratera, atraindo criaturas corrompidas pelo vazio.",
    ],
  },
];
