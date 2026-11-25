export type MenuCategory = 'todos' | 'brigadeiros' | 'bolos' | 'docinhos' | 'bombons';

export interface MenuVariant {
  id: string;
  name: string;
  unitLabel: string;
  price: number;
  note: string;
}

export interface MenuCollection {
  id: string;
  category: Exclude<MenuCategory, 'todos'>;
  categoryLabel: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  variants: MenuVariant[];
}

export interface HoursEntry {
  day: string;
  shortDay: string;
  hours: string;
  isClosed?: boolean;
  jsDayIndex: number; // 0 = Sunday, 1 = Monday, ...
}

export const BUSINESS_INFO = {
  name: 'Brigaderia',
  city: 'Caldas Novas · GO',
  address: 'R. Dois, qd.06 - lt.13 - Jardim Esmeralda, Caldas Novas - GO, 75687-644',
  phoneDisplay: '(64) 99228-6784',
  whatsappDigits: '5564992286784',
} as const;

export const OPENING_HOURS: HoursEntry[] = [
  { day: 'Segunda-feira', shortDay: 'Seg', hours: '08:00–18:00', jsDayIndex: 1 },
  { day: 'Terça-feira', shortDay: 'Ter', hours: '08:00–18:00', jsDayIndex: 2 },
  { day: 'Quarta-feira', shortDay: 'Qua', hours: '08:00–18:00', jsDayIndex: 3 },
  { day: 'Quinta-feira', shortDay: 'Qui', hours: '08:00–18:00', jsDayIndex: 4 },
  { day: 'Sexta-feira', shortDay: 'Sex', hours: '08:00–18:00', jsDayIndex: 5 },
  { day: 'Sábado', shortDay: 'Sáb', hours: '08:00–12:00', jsDayIndex: 6 },
  { day: 'Domingo', shortDay: 'Dom', hours: 'Fechado', isClosed: true, jsDayIndex: 0 },
];

export const CATEGORY_FILTERS: { id: MenuCategory; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'brigadeiros', label: 'Brigadeiros' },
  { id: 'bolos', label: 'Bolos' },
  { id: 'docinhos', label: 'Docinhos' },
  { id: 'bombons', label: 'Bombons' },
];

export const MENU_COLLECTIONS: MenuCollection[] = [
  {
    id: 'collection-brigadeiros',
    category: 'brigadeiros',
    categoryLabel: 'Brigadeiros',
    title: 'Brigadeiros de Colher e Festa',
    subtitle: 'Enrolados à mão com chocolate nobre, cacau selecionado e manteiga fresca.',
    imageSrc: '/src/assets/images/product_brigadeiros_gourmet_1795575719019.jpg',
    imageAlt: 'Brigadeiros artesanais variados em prato de cerâmica: chocolate tradicional, pistache, lascas ao leite e castanhas',
    variants: [
      {
        id: 'brig-tradicional-cento',
        name: 'Tradicional Belga (Cento)',
        unitLabel: '100 unidades',
        price: 165.0,
        note: 'Granulado macio de chocolate puro',
      },
      {
        id: 'brig-caixa-presente',
        name: 'Caixa Degustação Gourmet',
        unitLabel: '12 unidades',
        price: 42.0,
        note: 'Tradicional, pistache, ao leite e castanha caramelizada',
      },
      {
        id: 'brig-pistache-cento',
        name: 'Pistache Torrado (Cento)',
        unitLabel: '100 unidades',
        price: 210.0,
        note: 'Massa branca cremosa envolta em pistache moído na hora',
      },
      {
        id: 'brig-ninho-nutella',
        name: 'Leite Ninho com Avelã (25 unid.)',
        unitLabel: '25 unidades',
        price: 58.0,
        note: 'Recheio cremoso de creme de avelã artesanal',
      },
    ],
  },
  {
    id: 'collection-bolos',
    category: 'bolos',
    categoryLabel: 'Bolos',
    title: 'Bolos Caseiros com Cobertura Farta',
    subtitle: 'Massa fofinha de cacau 50% com calda quente de brigadeiro direto da panela.',
    imageSrc: '/src/assets/images/product_bolo_artesanal_1795575719467.jpg',
    imageAlt: 'Bolo artesanal de chocolate com cobertura brilhante de brigadeiro e brigadeiros enrolados no topo',
    variants: [
      {
        id: 'bolo-brigadeiro-p',
        name: 'Bolo Brigadeiro Clássico (1,5 kg)',
        unitLabel: 'Serve até 12 fatias',
        price: 128.0,
        note: 'Duas camadas de recheio e brigadeiros no topo',
      },
      {
        id: 'bolo-brigadeiro-g',
        name: 'Bolo de Festa (2,5 kg)',
        unitLabel: 'Serve até 22 fatias',
        price: 198.0,
        note: 'Massa úmida de chocolate com dupla camada de brigadeiro mole',
      },
      {
        id: 'bolo-caseiro-tarde',
        name: 'Bolo Vulcão para o Café',
        unitLabel: 'Forma média · 1 kg',
        price: 68.0,
        note: 'Cobertura abundante que escorre ao cortar',
      },
    ],
  },
  {
    id: 'collection-docinhos-bombons',
    category: 'docinhos',
    categoryLabel: 'Docinhos & Bombons',
    title: 'Docinhos Clássicos e Bombons Finos',
    subtitle: 'Beijinhos de coco fresco, bombons temperados de caramelo e avelãs tostadas.',
    imageSrc: '/src/assets/images/product_docinhos_bombons_1795575720015.jpg',
    imageAlt: 'Docinhos beijinho de coco com cravo, bombons quadrados com avelã e trufas de caramelo dourado em pedra travertino',
    variants: [
      {
        id: 'docinho-beijinho-cento',
        name: 'Beijinho de Coco Fresco (Cento)',
        unitLabel: '100 unidades',
        price: 155.0,
        note: 'Coco ralado úmido com toque sutil de cravo-da-índia',
      },
      {
        id: 'docinho-casadinho-50',
        name: 'Meio a Meio Festa (50 unid.)',
        unitLabel: '50 unidades',
        price: 84.0,
        note: '25 brigadeiros tradicionais + 25 beijinhos',
      },
      {
        id: 'bombom-caramelo-caixa',
        name: 'Bombons de Caramelo e Avelã',
        unitLabel: 'Caixa com 16 unidades',
        price: 64.0,
        note: 'Casca crocante de chocolate meio amargo temperado',
      },
    ],
  },
];

export const STANDALONE_BOMBONS_ITEMS: MenuVariant[] = [
  {
    id: 'bombom-avela-unidade',
    name: 'Bombom Avelã Inteira (25 unid.)',
    unitLabel: '25 unidades',
    price: 89.0,
    note: 'Ganache cremosa com avelã torrada inteira',
  },
  {
    id: 'bombom-caramelo-flor-sal',
    name: 'Bombom Caramelo Salgado (25 unid.)',
    unitLabel: '25 unidades',
    price: 85.0,
    note: 'Recheio fluido de caramelo dourado em chocolate 54%',
  },
  {
    id: 'bombom-morango-festa',
    name: 'Bombom Aberto de Morango (25 unid.)',
    unitLabel: '25 unidades',
    price: 92.0,
    note: 'Morango fresco envolvido em brigadeiro branco e chocolate',
  },
];

export function formatBRL(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export function buildWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${BUSINESS_INFO.whatsappDigits}?text=${encoded}`;
}
