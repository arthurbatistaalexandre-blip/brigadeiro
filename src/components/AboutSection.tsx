import { motion, useReducedMotion } from 'motion/react';
import { ArtisanImage } from './ArtisanImage';

const CRAFT_PILLARS = [
  {
    index: '01',
    title: 'Ponto de colher na panela',
    description:
      'Cozinhamos cada receita em fogo baixo até atingir brilho sedoso e maciez que não açucara.',
  },
  {
    index: '02',
    title: 'Chocolate nobre e manteiga fresca',
    description:
      'Usamos apenas cacau selecionado, leite condensado integral e ingredientes puros, sem conservantes.',
  },
  {
    index: '03',
    title: 'Enrolados no dia do pedido',
    description:
      'Cada cento de docinhos, bolo ou caixa de bombons sai da nossa cozinha fresco para a sua festa.',
  },
];

export function AboutSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="sobre"
      className="bg-[hsl(var(--bg-surface)/0.55)] py-24 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Coluna Fotográfica Esquerda (Ritmo Invertido) */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="aspect-[3/4] w-full overflow-hidden rounded-2xl bg-[hsl(var(--bg-surface))] lg:h-full">
              <ArtisanImage
                src="/src/assets/images/about_doceria_atelier_1795575719846.jpg"
                alt="Confeiteira da Brigaderia enrolando brigadeiros frescos à mão na bancada de mármore com panelas de cobre ao fundo"
                fallbackTitle="Cozinha artesanal da Brigaderia"
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>

          {/* Coluna Editorial Direita */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center lg:col-span-7"
          >
            <p className="text-sm font-semibold text-[hsl(var(--accent-primary))]">
              Nossa Tradição
            </p>
            <h2
              className="mt-3 font-display font-semibold tracking-tight text-[hsl(var(--ink-primary))] text-balance"
              style={{ fontSize: 'clamp(2rem, 3.6vw, 3.1rem)', lineHeight: 1.08 }}
            >
              Receita de casa, cuidado de confeitaria.
            </h2>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-[hsl(var(--ink-secondary))] sm:text-lg">
              Na Brigaderia, cada doce guarda o tempo certo da cozinha caseira em Caldas Novas — da escolha do chocolate ao toque final na forminha.
            </p>

            <div className="mt-10 divide-y divide-[hsl(var(--border-subtle))] border-y border-[hsl(var(--border-subtle))]">
              {CRAFT_PILLARS.map((pillar) => (
                <div
                  key={pillar.index}
                  className="grid grid-cols-1 gap-2 py-6 sm:grid-cols-12 sm:gap-6"
                >
                  <span className="tabular-nums font-display text-lg font-semibold text-[hsl(var(--accent-primary))] sm:col-span-2">
                    {pillar.index}.
                  </span>
                  <div className="sm:col-span-10">
                    <h3 className="text-base font-semibold text-[hsl(var(--ink-primary))]">
                      {pillar.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[hsl(var(--ink-secondary))]">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
