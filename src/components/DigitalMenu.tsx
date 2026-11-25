import { Plus, ShoppingBag, Check } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';
import {
  CATEGORY_FILTERS,
  MENU_COLLECTIONS,
  STANDALONE_BOMBONS_ITEMS,
  formatBRL,
  type MenuCategory,
  type MenuVariant,
} from '../data/brigaderia';
import { ArtisanImage } from './ArtisanImage';

interface DigitalMenuProps {
  onAddItem: (item: MenuVariant) => void;
  totalItems: number;
  onOpenDrawer: () => void;
}

export function DigitalMenu({
  onAddItem,
  totalItems,
  onOpenDrawer,
}: DigitalMenuProps) {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('todos');
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const handleAdd = (variant: MenuVariant) => {
    onAddItem(variant);
    setRecentlyAddedId(variant.id);
    window.setTimeout(() => {
      setRecentlyAddedId((curr) => (curr === variant.id ? null : curr));
    }, 900);
  };

  const showBrigadeiros = activeCategory === 'todos' || activeCategory === 'brigadeiros';
  const showBolos = activeCategory === 'todos' || activeCategory === 'bolos';
  const showDocinhos = activeCategory === 'todos' || activeCategory === 'docinhos';
  const showBombons = activeCategory === 'todos' || activeCategory === 'bombons';

  const brigadeirosCol = MENU_COLLECTIONS[0];
  const bolosCol = MENU_COLLECTIONS[1];
  const docinhosCol = MENU_COLLECTIONS[2];

  return (
    <section
      id="produtos"
      className="border-b border-[hsl(var(--border-subtle))] py-24 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Cabeçalho do Cardápio + Barra de Filtro */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-8 border-b border-[hsl(var(--border-subtle))] pb-10 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-xl">
            <p className="mb-3 text-sm font-semibold text-[hsl(var(--accent-primary))]">
              Cardápio Digital
            </p>
            <h2
              className="font-display font-semibold tracking-tight text-[hsl(var(--ink-primary))] text-balance"
              style={{ fontSize: 'clamp(2rem, 3.6vw, 3.1rem)', lineHeight: 1.08 }}
            >
              Feitos todos os dias para encantar.
            </h2>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Abas interativas funcionais */}
            <div
              role="tablist"
              aria-label="Filtrar cardápio por categoria"
              className="flex flex-wrap items-center gap-1.5 rounded-xl bg-[hsl(var(--bg-surface))] p-1.5"
            >
              {CATEGORY_FILTERS.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`min-h-10 rounded-lg px-4 py-2 text-sm font-semibold whitespace-nowrap shrink-0 transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(var(--accent-primary))] ${
                      isActive
                        ? 'bg-[hsl(var(--bg-elevated))] text-[hsl(var(--ink-primary))] shadow-xs'
                        : 'text-[hsl(var(--ink-secondary))] hover:text-[hsl(var(--ink-primary))]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Botão do Pedido */}
            <button
              type="button"
              onClick={onOpenDrawer}
              className="inline-flex min-h-11 items-center gap-2.5 rounded-lg border border-[hsl(var(--border-subtle))] bg-[hsl(var(--bg-elevated))] px-4 py-2.5 text-sm font-semibold text-[hsl(var(--ink-primary))] whitespace-nowrap shrink-0 transition-colors duration-150 hover:border-[hsl(var(--accent-primary))] hover:text-[hsl(var(--accent-primary))] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(var(--accent-primary))]"
            >
              <ShoppingBag size={17} aria-hidden="true" className="text-[hsl(var(--accent-primary))]" />
              <span>Seu pedido</span>
              {totalItems > 0 && (
                <span className="tabular-nums font-bold text-[hsl(var(--accent-primary))]">
                  ({totalItems})
                </span>
              )}
            </button>
          </div>
        </motion.div>

        {/* Bloco 1: Destaque Assimétrico — Brigadeiros */}
        {showBrigadeiros && (
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-14 grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12"
          >
            <div className="lg:col-span-6">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[hsl(var(--bg-surface))] lg:h-full">
                <ArtisanImage
                  src={brigadeirosCol.imageSrc}
                  alt={brigadeirosCol.imageAlt}
                  fallbackTitle={brigadeirosCol.title}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                />
              </div>
            </div>

            <div className="flex flex-col justify-between lg:col-span-6">
              <div>
                <p className="text-xs font-semibold tracking-wider uppercase text-[hsl(var(--accent-primary))]">
                  {brigadeirosCol.categoryLabel} · Carro-chefe
                </p>
                <h3 className="mt-2 font-display text-3xl font-semibold tracking-tight text-[hsl(var(--ink-primary))]">
                  {brigadeirosCol.title}
                </h3>
                <p className="mt-3 max-w-lg text-base text-[hsl(var(--ink-secondary))]">
                  {brigadeirosCol.subtitle}
                </p>
              </div>

              <div className="mt-8 divide-y divide-[hsl(var(--border-subtle))] border-y border-[hsl(var(--border-subtle))]">
                {brigadeirosCol.variants.map((variant) => {
                  const isAdded = recentlyAddedId === variant.id;
                  return (
                    <div
                      key={variant.id}
                      className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-baseline gap-2">
                          <span className="font-semibold text-[hsl(var(--ink-primary))]">
                            {variant.name}
                          </span>
                          <span className="text-xs text-[hsl(var(--ink-muted))]">
                            {variant.unitLabel}
                          </span>
                        </div>
                        <p className="mt-0.5 text-sm text-[hsl(var(--ink-secondary))]">
                          {variant.note}
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-4 sm:justify-end shrink-0">
                        <span className="tabular-nums text-base font-semibold text-[hsl(var(--ink-primary))]">
                          {formatBRL(variant.price)}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleAdd(variant)}
                          className={`inline-flex min-h-10 items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold whitespace-nowrap shrink-0 transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(var(--accent-primary))] ${
                            isAdded
                              ? 'bg-[hsl(var(--accent-secondary))] text-[hsl(var(--accent-secondary-ink))]'
                              : 'bg-[hsl(var(--bg-surface))] text-[hsl(var(--ink-primary))] hover:bg-[hsl(var(--accent-primary))] hover:text-[hsl(var(--accent-primary-ink))]'
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check size={14} aria-hidden="true" />
                              <span>Adicionado</span>
                            </>
                          ) : (
                            <>
                              <Plus size={14} aria-hidden="true" />
                              <span>Adicionar</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* Bloco 2: Dupla Editorial — Bolos & Docinhos/Bombons */}
        {(showBolos || showDocinhos) && (
          <div className="mt-20 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-14">
            {[showBolos ? bolosCol : null, showDocinhos ? docinhosCol : null]
              .filter((col): col is NonNullable<typeof col> => col !== null)
              .map((collection, idx) => (
                <motion.article
                  key={collection.id}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.6,
                    delay: idx * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex flex-col"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[hsl(var(--bg-surface))]">
                    <ArtisanImage
                      src={collection.imageSrc}
                      alt={collection.imageAlt}
                      fallbackTitle={collection.title}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                    />
                  </div>

                  <div className="mt-6">
                    <p className="text-xs font-semibold tracking-wider uppercase text-[hsl(var(--accent-primary))]">
                      {collection.categoryLabel}
                    </p>
                    <h3 className="mt-1.5 font-display text-2xl font-semibold tracking-tight text-[hsl(var(--ink-primary))] sm:text-3xl">
                      {collection.title}
                    </h3>
                    <p className="mt-2.5 text-base text-[hsl(var(--ink-secondary))]">
                      {collection.subtitle}
                    </p>
                  </div>

                  <div className="mt-6 divide-y divide-[hsl(var(--border-subtle))] border-y border-[hsl(var(--border-subtle))]">
                    {collection.variants.map((variant) => {
                      const isAdded = recentlyAddedId === variant.id;
                      return (
                        <div
                          key={variant.id}
                          className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
                        >
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-baseline gap-2">
                              <span className="font-semibold text-[hsl(var(--ink-primary))]">
                                {variant.name}
                              </span>
                              <span className="text-xs text-[hsl(var(--ink-muted))]">
                                {variant.unitLabel}
                              </span>
                            </div>
                            <p className="mt-0.5 text-sm text-[hsl(var(--ink-secondary))]">
                              {variant.note}
                            </p>
                          </div>

                          <div className="flex items-center justify-between gap-4 sm:justify-end shrink-0">
                            <span className="tabular-nums text-base font-semibold text-[hsl(var(--ink-primary))]">
                              {formatBRL(variant.price)}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleAdd(variant)}
                              className={`inline-flex min-h-10 items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold whitespace-nowrap shrink-0 transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(var(--accent-primary))] ${
                                isAdded
                                  ? 'bg-[hsl(var(--accent-secondary))] text-[hsl(var(--accent-secondary-ink))]'
                                  : 'bg-[hsl(var(--bg-surface))] text-[hsl(var(--ink-primary))] hover:bg-[hsl(var(--accent-primary))] hover:text-[hsl(var(--accent-primary-ink))]'
                              }`}
                            >
                              {isAdded ? (
                                <>
                                  <Check size={14} aria-hidden="true" />
                                  <span>Adicionado</span>
                                </>
                              ) : (
                                <>
                                  <Plus size={14} aria-hidden="true" />
                                  <span>Adicionar</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.article>
              ))}
          </div>
        )}

        {/* Bloco 3: Bombons & Trufas Temperadas (Cardápio em Lista Editorial) */}
        {showBombons && (
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-20 rounded-2xl border border-[hsl(var(--border-subtle))] bg-[hsl(var(--bg-elevated))] p-6 sm:p-10"
          >
            <div className="flex flex-col gap-3 border-b border-[hsl(var(--border-subtle))] pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold tracking-wider uppercase text-[hsl(var(--accent-primary))]">
                  Bombons Finos
                </p>
                <h3 className="mt-1 font-display text-2xl font-semibold text-[hsl(var(--ink-primary))] sm:text-3xl">
                  Chocolate temperado e recheios artesanais
                </h3>
              </div>
              <p className="text-sm text-[hsl(var(--ink-secondary))]">
                Sob encomenda para mesas e presentes
              </p>
            </div>

            <div className="mt-2 divide-y divide-[hsl(var(--border-subtle))]">
              {STANDALONE_BOMBONS_ITEMS.map((variant) => {
                const isAdded = recentlyAddedId === variant.id;
                return (
                  <div
                    key={variant.id}
                    className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <div className="flex flex-wrap items-baseline gap-2.5">
                        <span className="font-semibold text-[hsl(var(--ink-primary))]">
                          {variant.name}
                        </span>
                        <span className="text-xs text-[hsl(var(--ink-muted))]">
                          {variant.unitLabel}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-[hsl(var(--ink-secondary))]">
                        {variant.note}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-5 sm:justify-end shrink-0">
                      <span className="tabular-nums text-base font-semibold text-[hsl(var(--ink-primary))]">
                        {formatBRL(variant.price)}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleAdd(variant)}
                        className={`inline-flex min-h-10 items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold whitespace-nowrap shrink-0 transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(var(--accent-primary))] ${
                          isAdded
                            ? 'bg-[hsl(var(--accent-secondary))] text-[hsl(var(--accent-secondary-ink))]'
                            : 'bg-[hsl(var(--bg-surface))] text-[hsl(var(--ink-primary))] hover:bg-[hsl(var(--accent-primary))] hover:text-[hsl(var(--accent-primary-ink))]'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check size={14} aria-hidden="true" />
                            <span>Adicionado</span>
                          </>
                        ) : (
                          <>
                            <Plus size={14} aria-hidden="true" />
                            <span>Adicionar</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
