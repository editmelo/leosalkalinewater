"use client";
import { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";
import type { OrderSelection } from "@/lib/order/types";

type CartState = { items: OrderSelection[] };
type CartCtx = {
  items: OrderSelection[];
  count: number;
  addItem: (sel: OrderSelection) => void;
  removeItem: (index: number) => void;
  clear: () => void;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "law-cart-v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CartState>({ items: [] });
  const hydrated = useRef(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setState(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    if (!hydrated.current) {
      hydrated.current = true;
      return;
    }
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {}
  }, [state]);

  const addItem = useCallback((sel: OrderSelection) => setState(s => ({ items: [...s.items, sel] })), []);
  const removeItem = useCallback((i: number) => setState(s => ({ items: s.items.filter((_, idx) => idx !== i) })), []);
  const clear = useCallback(() => setState({ items: [] }), []);

  return (
    <Ctx.Provider value={{ items: state.items, count: state.items.length, addItem, removeItem, clear }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
