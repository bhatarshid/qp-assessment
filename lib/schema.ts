export type Item = {
  name: string;
  quantity: number;
  price: number;
}

export type UpdateItem = {
  name?: string;
  quantity?: number;
  price?: number;
}

export type User = {
  name: string;
  email: string;
}
