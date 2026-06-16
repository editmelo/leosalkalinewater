import { describe, it, expect } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { CartProvider, useCart } from "./CartProvider";
import type { OrderSelection } from "@/lib/order/types";

const SAMPLE: OrderSelection = {
  jugCount: 4,
  frequency: "weekly",
  customerType: "residential",
  starterPackage: false,
  zip: "46204",
};

function TestHarness() {
  const { count, items, addItem, clear } = useCart();
  return (
    <div>
      <span data-testid="count">{count}</span>
      <span data-testid="first-zip">{items[0]?.zip ?? ""}</span>
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

    act(() => {
      screen.getByRole("button", { name: "clear" }).click();
    });

    expect(screen.getByTestId("count").textContent).toBe("0");
  });
});
