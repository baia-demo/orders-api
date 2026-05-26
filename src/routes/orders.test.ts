import { describe, test, expect } from "vitest";
import Fastify from "fastify";
import { registerOrderRoutes } from "./orders.js";

async function buildApp() {
  const app = Fastify({ logger: false });
  await registerOrderRoutes(app);
  return app;
}

describe("GET /orders", () => {
  test("retorna total real do pedido (não zerado)", async () => {
    const app = await buildApp();

    await app.inject({
      method: "POST",
      url: "/orders",
      payload: {
        customerId: "c-1",
        items: [{ productId: "p-1", name: "Produto", price: 50, quantity: 2 }],
      },
    });

    const res = await app.inject({ method: "GET", url: "/orders" });
    const body = JSON.parse(res.body);
    const order = body.items.find((i: { customerId: string }) => i.customerId === "c-1");

    expect(order).toBeDefined();
    expect(order.total).toBeGreaterThan(0);
    expect(order.total).toBe(order.subtotal + order.shipping);
  });
});
