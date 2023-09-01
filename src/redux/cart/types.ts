export type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  size: number;
  count: number;
};

export interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}
