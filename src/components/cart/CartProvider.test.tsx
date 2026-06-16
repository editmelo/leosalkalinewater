import { describe, it, expect } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { CartProvider, useCart } from "./CartProvider";
import type { OrderSelection } from "@/lib/order/types";

const SAMPLE: OrderSelection = {
  planId: "payg",
  jugCount: 2,
  zip: "46204",
};

function TestHarness() {
  const { count, items, addItem, clear } = useCart();
  return (
    <div>
      <span data-testid="count">{count}</span>
      <span data-testid="first-zip">{items[0]?.zip ?? ""}</span>
      <span data-testid="first-plan">{items[0]?.planId ?? ""}</span>
      <span data-testid="first-jugs">{items[0]?.jugCount ?? ""}</span>
      <button onClick={() => addItem(SAMPLE)}>add</button>
      <button onClick={clear}>clear</button>
    </div>
  );
}

describe("CartProvider", () => {
  it("starts with count 0, increments on addItem, resets on clear", () => {
    render(
      <CartProvider>
        <TestHarness />
      </CartProvider>
    );

    expect(screen.getByTestId("count").textContent).toBe("0");

    act(() => {
      screen.getByRole("button", { name: "add" }).click();
    });

    expect(screen.getByTestId("count").textContent).toBe("1");
    expect(screen.getByTestId("first-zip").textContent).toBe("46204");
    expect(screen.getByTestId("first-plan").textContent).toBe("payg");
    expect(screen.getByTestId("first-jugs").textContent).toBe("2");

    act(() => {
      screen.getByRole("button", { name: "clear" }).click();
    });

    expect(screen.getByTestId("count").textContent).toBe("0");
  });
});
