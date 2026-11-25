import { MotionConfig } from 'motion/react';
import { useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { DigitalMenu } from './components/DigitalMenu';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { OrderDrawer, type CartItem } from './components/OrderDrawer';
import type { MenuVariant } from './data/brigaderia';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleAddItem = (variant: MenuVariant) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.variant.id === variant.id);
      if (existing) {
        return prev.map((item) =>
          item.variant.id === variant.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { variant, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (variantId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.variant.id === variantId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (variantId: string) => {
    setCartItems((prev) => prev.filter((item) => item.variant.id !== variantId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[hsl(var(--bg-canvas))] text-[hsl(var(--ink-primary))]">
        <Header />

        <main>
          <Hero />
          <DigitalMenu
            onAddItem={handleAddItem}
            totalItems={totalItems}
            onOpenDrawer={() => setIsDrawerOpen(true)}
          />
          <AboutSection />
          <ContactSection />
        </main>

        <Footer />

        <OrderDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClear={handleClearCart}
        />
      </div>
    </MotionConfig>
  );
}
