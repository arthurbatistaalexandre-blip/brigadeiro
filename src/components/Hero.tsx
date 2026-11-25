import { ArrowDownRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { ArtisanImage } from './ArtisanImage';

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="inicio"
      className="relative overflow-hidden border-b border-[hsl(var(--border-subtle))] pt-8 pb-16 sm:pt-12 sm:pb-20 lg:pt-14 lg:pb-24"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Coluna Editorial Esquerda */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center lg:col-span-5"
          >
            <p className="mb-5 text-sm font-semibold tracking-wide text-[hsl(var(--accent-primary))]">
              Caldas Novas · Doceria Artesanal
            </p>

            <h1
              className="font-display font-semibold tracking-tight text-[hsl(var(--ink-primary))] text-balance"
              style={{
                fontSize: 'clamp(2.6rem, 4.8vw, 4.4rem)',
                lineHeight: 1.04,
              }}
            >
              Brigadeiro quente, feito na hora.
            </h1>

            <p className="mt-6 max-w-md text-base leading-relaxed text-[hsl(var(--ink-secondary))] sm:text-lg">
              Doces preparados diariamente na panela de cobre, com chocolate nobre e manteiga fresca para a sua mesa.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-5">
              <a
                href="#contato"
                className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[hsl(var(--accent-primary))] px-7 py-3.5 text-sm font-semibold text-[hsl(var(--accent-primary-ink))] whitespace-nowrap shrink-0 transition-all duration-150 hover:bg-[hsl(var(--accent-primary-hover))] hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(var(--accent-primary))]"
              >
                Entrar em contato
              </a>

              <a
                href="#produtos"
                className="group inline-flex min-h-12 items-center gap-2 px-2 py-3 text-sm font-semibold text-[hsl(var(--ink-primary))] whitespace-nowrap shrink-0 transition-colors hover:text-[hsl(var(--accent-primary))] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[hsl(var(--accent-primary))]"
              >
                <span>Ver cardápio</span>
                <ArrowDownRight
                  size={17}
                  aria-hidden="true"
                  className="text-[hsl(var(--accent-secondary))] transition-transform duration-150 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                />
              </a>
            </div>
          </motion.div>

          {/* Coluna Fotográfica Direita — Imagem Grande do Nicho */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <figure className="relative h-full overflow-hidden rounded-2xl bg-[hsl(var(--bg-surface))]">
              <div className="aspect-video w-full lg:h-full lg:min-h-[460px]">
                <ArtisanImage
                  src="/src/assets/images/hero_brigadeiro_copper_pan_1795575718519.jpg"
                  alt="Brigadeiro cremoso saindo da panela de cobre mexido com colher de madeira ao lado de brigadeiros enrolados na hora"
                  priority
                  fallbackTitle="Brigadeiro quente na panela"
                  className="h-full w-full object-cover"
                />
              </div>
              <figcaption className="flex items-center justify-between border-t border-[hsl(var(--border-subtle))] bg-[hsl(var(--bg-elevated))] px-5 py-3 text-xs text-[hsl(var(--ink-secondary))]">
                <span>Panela de cobre · Ponto de colher</span>
                <span className="font-semibold text-[hsl(var(--accent-primary))]">
                  Produção diária
                </span>
              </figcaption>
            </figure>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
