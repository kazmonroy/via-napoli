export interface PizzaInterface {
  pizzaId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface OrderInterface {
  order: {
    id: string;
    customer: string;
    phone: string;
    address: string;
    priority: boolean;
    estimatedDelivery: string;
    position: string;
    orderPrice: number;
    priorityPrice: number;
    cart: PizzaInterface[];
  };
}
