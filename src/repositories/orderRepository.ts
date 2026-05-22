import type { Order } from "../types/order.js";

const store = new Map<string, Order>();

export function save(order: Order): void {
  store.set(order.id, order);
}

export function findById(id: string): Order | undefined {
  return store.get(id);
}

export function listAll(): Order[] {
  return Array.from(store.values()).sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt)
  );
}
