import { MessageCircle, Minus, Plus, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import {
  BUSINESS_INFO,
  buildWhatsAppUrl,
  formatBRL,
  type MenuVariant,
} from '../data/brigaderia';

export interface CartItem {
  variant: MenuVariant;
  quantity: number;
}

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (variantId: string, delta: number) => void;
  onRemoveItem: (variantId: string) => void;
  onClear: () => void;
}

export function OrderDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClear,
}: OrderDrawerProps) {
  const [customerName, setCustomerName] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.variant.price * item.quantity,
    0
  );

  const handleCheckoutWhatsApp = () => {
    const lines = items.map(
      (item) =>
        `• ${item.quantity}x ${item.variant.name} (${formatBRL(
          item.variant.price * item.quantity
        )})`
    );

    const greeting = customerName.trim()
      ? `Olá! Sou ${customerName.trim()} e gostaria de encomendar na ${BUSINESS_INFO.name}:`
      : `Olá! Gostaria de fazer a seguinte encomenda na ${BUSINESS_INFO.name}:`;

    const fullMessage = `${greeting}\n\n${lines.join(
      '\n'
    )}\n\nTotal estimado: ${formatBRL(subtotal)}`;

    window.open(buildWhatsAppUrl(fullMessage), '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-drawer-title"
      className="fixed inset-0 z-50 flex justify-end bg-black/45 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="flex h-full w-full max-w-md flex-col bg-[hsl(var(--bg-canvas))] text-[hsl(var(--ink-primary))] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[hsl(var(--border-subtle))] px-6 py-5">
          <div>
            <h2
              id="order-drawer-title"
              className="font-display text-2xl font-semibold text-[hsl(var(--ink-primary))]"
            >
              Seu pedido
            </h2>
            <p className="text-xs text-[hsl(var(--ink-muted))]">
              {BUSINESS_INFO.name} · {BUSINESS_INFO.city}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar resumo do pedido"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[hsl(var(--border-subtle))] text-[hsl(var(--ink-primary))] transition-colors hover:bg-[hsl(var(--bg-surface))]"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center py-12 text-center">
              <p className="font-display text-xl font-medium text-[hsl(var(--ink-primary))]">
                Sua seleção está vazia.
              </p>
              <p className="mt-2 max-w-xs text-sm text-[hsl(var(--ink-secondary))]">
                Escolha brigadeiros, bolos ou docinhos no cardápio para montar sua encomenda.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 rounded-lg bg-[hsl(var(--accent-primary))] px-5 py-2.5 text-sm font-semibold text-[hsl(var(--accent-primary-ink))]"
              >
                Voltar ao cardápio
              </button>
            </div>
          ) : (
            <div className="divide-y divide-[hsl(var(--border-subtle))]">
              {items.map(({ variant, quantity }) => (
                <div key={variant.id} className="py-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-[hsl(var(--ink-primary))]">
                        {variant.name}
                      </p>
                      <p className="text-xs text-[hsl(var(--ink-muted))]">
                        {variant.unitLabel} · {formatBRL(variant.price)}
                      </p>
                    </div>
                    <span className="tabular-nums text-sm font-semibold text-[hsl(var(--ink-primary))]">
                      {formatBRL(variant.price * quantity)}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="inline-flex items-center rounded-lg border border-[hsl(var(--border-subtle))] bg-[hsl(var(--bg-elevated))]">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(variant.id, -1)}
                        aria-label={`Diminuir quantidade de ${variant.name}`}
                        className="inline-flex h-9 w-9 items-center justify-center text-[hsl(var(--ink-primary))] hover:bg-[hsl(var(--bg-surface))]"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="tabular-nums w-8 text-center text-sm font-semibold">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(variant.id, 1)}
                        aria-label={`Aumentar quantidade de ${variant.name}`}
                        className="inline-flex h-9 w-9 items-center justify-center text-[hsl(var(--ink-primary))] hover:bg-[hsl(var(--bg-surface))]"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemoveItem(variant.id)}
                      aria-label={`Remover ${variant.name}`}
                      className="inline-flex items-center gap-1 text-xs text-[hsl(var(--ink-muted))] hover:text-[hsl(var(--accent-primary))]"
                    >
                      <Trash2 size={14} />
                      <span>Remover</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-[hsl(var(--border-subtle))] bg-[hsl(var(--bg-elevated))] px-6 py-5">
            <div className="mb-4">
              <label
                htmlFor="drawer-customer-name"
                className="block text-xs font-semibold text-[hsl(var(--ink-secondary))]"
              >
                Seu nome (opcional)
              </label>
              <input
                id="drawer-customer-name"
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Para identificarmos seu pedido"
                className="mt-1.5 w-full rounded-lg border border-[hsl(var(--border-subtle))] bg-[hsl(var(--bg-canvas))] px-3.5 py-2.5 text-sm text-[hsl(var(--ink-primary))] focus:border-[hsl(var(--accent-primary))] focus:outline-none"
              />
            </div>

            <div className="mb-4 flex items-baseline justify-between">
              <span className="text-sm font-semibold text-[hsl(var(--ink-secondary))]">
                Total estimado
              </span>
              <span className="tabular-nums font-display text-2xl font-semibold text-[hsl(var(--ink-primary))]">
                {formatBRL(subtotal)}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCheckoutWhatsApp}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-lg bg-[hsl(var(--accent-primary))] px-5 py-3 text-sm font-semibold text-[hsl(var(--accent-primary-ink))] transition-colors hover:bg-[hsl(var(--accent-primary-hover))]"
            >
              <MessageCircle size={18} aria-hidden="true" />
              <span>Enviar pedido no WhatsApp</span>
            </button>

            <button
              type="button"
              onClick={onClear}
              className="mt-2.5 w-full py-1.5 text-center text-xs font-semibold text-[hsl(var(--ink-muted))] hover:text-[hsl(var(--ink-primary))]"
            >
              Limpar seleção
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
