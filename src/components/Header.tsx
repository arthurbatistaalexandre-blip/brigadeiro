import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { BUSINESS_INFO } from '../data/brigaderia';

const NAV_LINKS = [
  { href: '#inicio', label: 'Início' },
  { href: '#produtos', label: 'Cardápio' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#contato', label: 'Contato' },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[hsl(var(--border-subtle))] bg-[hsl(var(--bg-canvas)/0.92)] backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-5 py-3.5 sm:px-8 lg:px-12">
        {/* Zona 1: Wordmark único */}
        <a
          href="#inicio"
          className="font-display text-2xl font-semibold tracking-tight text-[hsl(var(--ink-primary))] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[hsl(var(--accent-primary))]"
        >
          {BUSINESS_INFO.name}
        </a>

        {/* Zona 2: Links limpos em linha única */}
        <nav
          aria-label="Navegação principal"
          className="hidden md:flex items-center gap-8 text-sm font-semibold text-[hsl(var(--ink-secondary))]"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[hsl(var(--accent-primary))] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 after:bg-[hsl(var(--accent-primary))] after:transition-all after:duration-200 hover:after:w-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[hsl(var(--accent-primary))]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zona 3: 1 ação primária */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#contato"
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-[hsl(var(--accent-primary))] px-5 py-2.5 text-sm font-semibold text-[hsl(var(--accent-primary-ink))] whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[hsl(var(--accent-primary-hover))] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(var(--accent-primary))]"
          >
            Entrar em contato
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[hsl(var(--border-subtle))] text-[hsl(var(--ink-primary))] md:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(var(--accent-primary))]"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Menu mobile recolhível */}
      {mobileOpen && (
        <nav
          aria-label="Navegação móvel"
          className="border-t border-[hsl(var(--border-subtle))] bg-[hsl(var(--bg-canvas))] px-5 py-5 md:hidden"
        >
          <div className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-2 text-base font-semibold text-[hsl(var(--ink-primary))] transition-colors hover:text-[hsl(var(--accent-primary))]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contato"
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-flex min-h-11 items-center justify-center rounded-lg bg-[hsl(var(--accent-primary))] px-5 py-3 text-sm font-semibold text-[hsl(var(--accent-primary-ink))]"
            >
              Entrar em contato
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
