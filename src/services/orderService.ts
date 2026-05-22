import { randomUUID } from "node:crypto";
import type { CreateOrderInput, Order } from "../types/order.js";
import { calculateTotal } from "./totalCalculator.js";
import * as repo from "../repositories/orderRepository.js";

export function createOrder(input: CreateOrderInput): Order {
  const { subtotal, shipping, total } = calculateTotal(input.items);

  const order: Order = {
    id: `ord-${randomUUID().slice(0, 8)}`,
    customerId: input.customerId,
    items: input.items,
    subtotal,
    shipping,
    total,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  repo.save(order);
  return order;
}

export function getOrder(id: string): Order | undefined {
  return repo.findById(id);
}

export function listOrders(): Order[] {
  return repo.listAll();
}
