import { describe, test, expect } from "vitest";
import { calculateTotal } from "./totalCalculator.js";
import type { OrderItem } from "../types/order.js";

function item(price: number, quantity: number): OrderItem {
  return {
    productId: `p-${price}-${quantity}`,
    name: `Item ${price}`,
    price,
    quantity,
  };
}

describe("calculateTotal", () => {
  test("subtotal é a soma de price * quantity", () => {
    const { subtotal } = calculateTotal([item(10, 2), item(5, 3)]);
    expect(subtotal).toBe(35);
  });

  test("subtotal de carrinho vazio é 0", () => {
    const { subtotal } = calculateTotal([]);
    expect(subtotal).toBe(0);
  });

  test("total é subtotal + shipping", () => {
    const result = calculateTotal([item(100, 1)]);
    expect(result.total).toBe(result.subtotal + result.shipping);
  });

  test("subtotal lida com quantidade alta", () => {
    const { subtotal } = calculateTotal([item(9.9, 100)]);
    expect(subtotal).toBeCloseTo(990, 2);
  });

  test("retorna estrutura completa", () => {
    const result = calculateTotal([item(10, 1)]);
    expect(result).toHaveProperty("subtotal");
    expect(result).toHaveProperty("shipping");
    expect(result).toHaveProperty("total");
  });
});
