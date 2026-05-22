import Fastify from "fastify";
import { registerOrderRoutes } from "./routes/orders.js";

const app = Fastify({
  logger: {
    level: process.env.LOG_LEVEL ?? "info",
  },
});

await registerOrderRoutes(app);

const port = Number(process.env.PORT ?? 3000);
const host = process.env.HOST ?? "0.0.0.0";

try {
  await app.listen({ port, host });
  app.log.info({ port, host }, "orders-api up");
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
