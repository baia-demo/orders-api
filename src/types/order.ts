export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  customerId: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: "pending" | "confirmed" | "shipped" | "cancelled";
  createdAt: string;
}

export interface CreateOrderInput {
  customerId: string;
  items: OrderItem[];
}
