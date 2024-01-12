// RESTAURANT
export interface OrderInterface {
  id: string;
  customer: string;
  address: string;
  phone: string;
  priority: boolean;
  estimatedDelivery: string;
  position: string;
  orderPrice: number;
  priorityPrice: number;
  status: string;
  cart: PizzaOrder[];
}

export interface OrderFrom {
  customer?: string;
  address?: string;
  phone?: string;
  priority: boolean;
  cart: PizzaOrder[];
}

export interface PizzaOrder {
  pizzaId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface PizzaMenu {
  menu: PizzaItem[];
}

export interface PizzaItem {
  id: number;
  name: string;
  unitPrice: number;
  imageUrl: string;
  ingredients: string[];
  soldOut: boolean;
}
