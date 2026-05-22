# orders-api

API de pedidos da **ShopFlow** (loja fictícia da demo do BaIA).

Stack: Fastify 5 + TypeScript + Node 20. Persistência in-memory (Map).

## Endpoints

| Método | Path | Descrição |
|---|---|---|
| `POST` | `/orders` | Cria pedido. Body: `{customerId, items: [{productId, name, price, quantity}]}` |
| `GET` | `/orders/:id` | Busca pedido por id |
| `GET` | `/orders` | Lista todos os pedidos |
| `GET` | `/health` | Health check |

## Cálculo do total

`src/services/totalCalculator.ts` aplica:
- **Subtotal:** soma de `price * quantity` de cada item
- **Frete:** fixo R$ 15,00
- **Otimização:** carrinhos com mais de 10 itens usam um caminho separado (`sumLargeCart`) — código historicamente otimizado para evitar timeouts em pedidos grandes

## Rodar local

```bash
npm install
npm run dev
# → http://localhost:3000
```

Exemplo:
```bash
curl -X POST localhost:3000/orders \
  -H 'content-type: application/json' \
  -d '{
    "customerId": "c-001",
    "items": [
      {"productId":"p-001","name":"Camiseta","price":49.9,"quantity":2}
    ]
  }'
```

## Estrutura

```
src/
├── server.ts                       # Bootstrap Fastify
├── routes/orders.ts                # Handlers HTTP
├── services/
│   ├── orderService.ts             # Cria pedido, lê do repo
│   └── totalCalculator.ts          # Subtotal + frete
├── repositories/orderRepository.ts # Store in-memory
└── types/order.ts                  # Tipos compartilhados
```
