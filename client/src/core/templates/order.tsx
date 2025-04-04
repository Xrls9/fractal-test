export interface Order {
  id: number;
  orderNumber: string;
  date: string;
  productsQty: number;
  total: number;
  OrderProduct: OrderProduct[];
}

export interface OrderProduct {
  id: number;
  productId: number;
  name: string;
  quantity: number;
  price: number;
  total: number;
}
