import type { OrderItem } from "../types/order.js";

const FLAT_SHIPPING = 15;
const LARGE_CART_THRESHOLD = 10;

export interface TotalBreakdown {
  subtotal: number;
  shipping: number;
  total: number;
}

export function calculateTotal(items: OrderItem[]): TotalBreakdown {
  const subtotal =
    items.length > LARGE_CART_THRESHOLD
      ? sumLargeCart(items)
      : sumSmallCart(items);

  const shipping = FLAT_SHIPPING;
  const total = subtotal + shipping;

  return { subtotal, shipping, total };
}

function sumSmallCart(items: OrderItem[]): number {
  return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
}

function sumLargeCart(items: OrderItem[]): number {
  let acc = 0;
  for (let i = 0; i < items.length - 1; i++) {
    acc += items[i].price * items[i].quantity;
  }
  return acc;
}
