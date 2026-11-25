import { Clock, MapPin, MessageCircle, Send } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useState, type FormEvent } from 'react';
import {
  BUSINESS_INFO,
  OPENING_HOURS,
  buildWhatsAppUrl,
} from '../data/brigaderia';

export function ContactSection() {
  const prefersReducedMotion = useReducedMotion();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [details, setDetails] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const todayIndex = new Date().getDay();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    const cleanPhone = phone.trim();
    const cleanDetails = details.trim();

    if (cleanName.length < 2) {
      setErrorMessage('Por favor, informe o seu nome.');
      return;
    }
    if (cleanPhone.replace(/\D/g, '').length < 8) {
      setErrorMessage('Informe um número de telefone ou WhatsApp válido.');
      return;
    }
    if (cleanDetails.length < 4) {
      setErrorMessage('Conte brevemente o que gostaria de encomendar.');
      return;
    }

    setErrorMessage('');
    const whatsappMessage = `Olá! Vim pelo site da ${BUSINESS_INFO.name}.\n\nNome: ${cleanName}\nTelefone: ${cleanPhone}\nPedido / Dúvida: ${cleanDetails}`;
    const url = buildWhatsAppUrl(whatsappMessage);

    setSubmitted(true);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const directWhatsAppUrl = buildWhatsAppUrl(
    `Olá! Gostaria de fazer uma encomenda na ${BUSINESS_INFO.name}.`
  );

  return (
    <section
      id="contato"
      className="bg-[hsl(var(--bg-dark))] py-24 text-[hsl(var(--ink-on-dark))] sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Coluna Esquerda: Encomendas, Endereço & Horário */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <p className="text-sm font-semibold text-[hsl(var(--accent-secondary))]">
              Encomendas & Contato
            </p>
            <h2
              className="mt-3 font-display font-semibold tracking-tight text-[hsl(var(--ink-on-dark))] text-balance"
              style={{ fontSize: 'clamp(2rem, 3.6vw, 3.1rem)', lineHeight: 1.08 }}
            >
              Encomende para a sua próxima celebração.
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-[hsl(var(--ink-muted-on-dark))]">
              Atendemos pedidos para festas, presentes e café da tarde direto pelo WhatsApp ou no balcão.
            </p>

            {/* Botão Direto WhatsApp */}
            <div className="mt-8">
              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-3 rounded-lg bg-[hsl(var(--accent-secondary))] px-6 py-3.5 text-sm font-bold text-[hsl(var(--accent-secondary-ink))] whitespace-nowrap shrink-0 transition-all duration-150 hover:bg-[hsl(var(--accent-secondary-hover))] hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(var(--accent-secondary))]"
              >
                <MessageCircle size={18} aria-hidden="true" />
                <span>Chamar no WhatsApp · {BUSINESS_INFO.phoneDisplay}</span>
              </a>
            </div>

            {/* Endereço e Horário */}
            <div className="mt-12 space-y-8 border-t border-[hsl(var(--border-dark))] pt-8">
              <div className="flex items-start gap-3.5">
                <MapPin
                  size={19}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-[hsl(var(--accent-secondary))]"
                />
                <div>
                  <h3 className="text-sm font-semibold text-[hsl(var(--ink-on-dark))]">
                    Endereço
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-[hsl(var(--ink-muted-on-dark))]">
                    {BUSINESS_INFO.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Clock
                  size={19}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-[hsl(var(--accent-secondary))]"
                />
                <div className="w-full max-w-sm">
                  <h3 className="text-sm font-semibold text-[hsl(var(--ink-on-dark))]">
                    Horário de funcionamento
                  </h3>
                  <dl className="mt-3 divide-y divide-[hsl(var(--border-dark))] text-sm">
                    {OPENING_HOURS.map((entry) => {
                      const isToday = entry.jsDayIndex === todayIndex;
                      return (
                        <div
                          key={entry.day}
                          className="flex items-center justify-between py-2"
                        >
                          <dt
                            className={
                              isToday
                                ? 'font-semibold text-[hsl(var(--accent-secondary))]'
                                : 'text-[hsl(var(--ink-muted-on-dark))]'
                            }
                          >
                            {entry.day}
                            {isToday ? ' (Hoje)' : ''}
                          </dt>
                          <dd
                            className={`tabular-nums ${
                              entry.isClosed
                                ? 'text-[hsl(var(--ink-muted-on-dark)/0.75)]'
                                : isToday
                                  ? 'font-semibold text-[hsl(var(--ink-on-dark))]'
                                  : 'text-[hsl(var(--ink-on-dark))]'
                            }`}
                          >
                            {entry.hours}
                          </dd>
                        </div>
                      );
                    })}
                  </dl>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Coluna Direita: Formulário de Pedido / Contato */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <div className="rounded-2xl border border-[hsl(var(--border-dark))] bg-[hsl(var(--bg-dark-elevated))] p-6 sm:p-10">
              <h3 className="font-display text-2xl font-semibold text-[hsl(var(--ink-on-dark))]">
                Solicitar encomenda
              </h3>
              <p className="mt-2 text-sm text-[hsl(var(--ink-muted-on-dark))]">
                Preencha os dados abaixo para abrir seu pedido pronto no nosso WhatsApp.
              </p>

              <form onSubmit={handleSubmit} noValidate className="mt-7 space-y-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-sm font-semibold text-[hsl(var(--ink-on-dark))]"
                  >
                    Seu nome
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex.: Maria Clara"
                    className="mt-2 w-full rounded-lg border border-[hsl(var(--border-dark))] bg-[hsl(var(--bg-dark))] px-4 py-3 text-sm text-[hsl(var(--ink-on-dark))] placeholder:text-[hsl(var(--ink-muted-on-dark)/0.55)] focus:border-[hsl(var(--accent-secondary))] focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-phone"
                    className="block text-sm font-semibold text-[hsl(var(--ink-on-dark))]"
                  >
                    Telefone ou WhatsApp
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(64) 99999-9999"
                    className="mt-2 w-full rounded-lg border border-[hsl(var(--border-dark))] bg-[hsl(var(--bg-dark))] px-4 py-3 text-sm text-[hsl(var(--ink-on-dark))] placeholder:text-[hsl(var(--ink-muted-on-dark)/0.55)] focus:border-[hsl(var(--accent-secondary))] focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-details"
                    className="block text-sm font-semibold text-[hsl(var(--ink-on-dark))]"
                  >
                    O que você gostaria de encomendar?
                  </label>
                  <textarea
                    id="contact-details"
                    rows={4}
                    required
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Ex.: 1 cento de brigadeiro tradicional e 1 bolo de 1,5 kg para sábado às 10h."
                    className="mt-2 w-full rounded-lg border border-[hsl(var(--border-dark))] bg-[hsl(var(--bg-dark))] px-4 py-3 text-sm text-[hsl(var(--ink-on-dark))] placeholder:text-[hsl(var(--ink-muted-on-dark)/0.55)] focus:border-[hsl(var(--accent-secondary))] focus:outline-none"
                  />
                </div>

                {errorMessage && (
                  <p
                    role="alert"
                    className="rounded-lg border border-[hsl(var(--accent-secondary)/0.45)] bg-[hsl(var(--bg-dark))] px-4 py-2.5 text-sm text-[hsl(var(--accent-secondary))]"
                  >
                    {errorMessage}
                  </p>
                )}

                {submitted && !errorMessage && (
                  <p
                    role="status"
                    className="rounded-lg border border-[hsl(var(--accent-secondary)/0.45)] bg-[hsl(var(--bg-dark))] px-4 py-2.5 text-sm text-[hsl(var(--accent-secondary))]"
                  >
                    Pedido preparado! Caso a nova aba não tenha aberto, clique no botão do WhatsApp ao lado.
                  </p>
                )}

                <button
                  type="submit"
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-lg bg-[hsl(var(--accent-primary))] px-6 py-3.5 text-sm font-semibold text-[hsl(var(--accent-primary-ink))] transition-colors duration-150 hover:bg-[hsl(var(--accent-primary-hover))] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(var(--accent-secondary))]"
                >
                  <Send size={16} aria-hidden="true" />
                  <span>Enviar pelo WhatsApp</span>
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
