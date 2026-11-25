import { BUSINESS_INFO } from '../data/brigaderia';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[hsl(var(--border-dark))] bg-[hsl(var(--bg-dark))] py-10 text-[hsl(var(--ink-muted-on-dark))]">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-5 sm:flex-row sm:items-center sm:px-8 lg:px-12">
        <div>
          <span className="font-display text-xl font-semibold text-[hsl(var(--ink-on-dark))]">
            {BUSINESS_INFO.name}
          </span>
          <p className="mt-1 text-xs text-[hsl(var(--ink-muted-on-dark))]">
            {BUSINESS_INFO.city} · {BUSINESS_INFO.phoneDisplay}
          </p>
        </div>

        <nav
          aria-label="Links do rodapé"
          className="flex flex-wrap items-center gap-6 text-xs font-semibold"
        >
          <a href="#inicio" className="hover:text-[hsl(var(--accent-secondary))]">
            Início
          </a>
          <a href="#produtos" className="hover:text-[hsl(var(--accent-secondary))]">
            Cardápio
          </a>
          <a href="#sobre" className="hover:text-[hsl(var(--accent-secondary))]">
            Sobre
          </a>
          <a href="#contato" className="hover:text-[hsl(var(--accent-secondary))]">
            Contato
          </a>
        </nav>

        <p className="text-xs text-[hsl(var(--ink-muted-on-dark)/0.8)]">
          © {currentYear} {BUSINESS_INFO.name}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
