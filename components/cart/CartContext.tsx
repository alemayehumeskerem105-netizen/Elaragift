"use client";

import { createContext, useContext, useMemo, useState, ReactNode } from "react";

export type GiftCategory = "Cakes" | "Flowers" | "Dolls" | "Scarves" | "Chocolates";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: GiftCategory;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  total: number;
  count: number;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const value = useMemo<CartContextValue>(() => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const count = items.reduce((sum, item) => sum + item.quantity, 0);

    return {
      items,
      total,
      count,
      addItem: (item, quantity = 1) => {
        setItems((prev) => {
          const existing = prev.find((i) => i.id === item.id);
          if (existing) {
            return prev.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i,
            );
          }
          return [...prev, { ...item, quantity }];
        });
      },
      removeItem: (id) => {
        setItems((prev) => prev.filter((i) => i.id !== id));
      },
      updateQuantity: (id, quantity) => {
        setItems((prev) =>
          prev
            .map((i) => (i.id === id ? { ...i, quantity } : i))
            .filter((i) => i.quantity > 0),
        );
      },
      clear: () => setItems([]),
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}

