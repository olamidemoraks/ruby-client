import { ReactNode } from "react";

export type SidebarLinkRegular = {
  container: false;
  path: string;
  text: string;
  icon: ReactNode;
};

export type SidebarLinkContainer = {
  container: true;
  caption: string;
  icon: ReactNode;
  links: Omit<SidebarLinkRegular, "icon" | "container">[];
};

export type SidebarLink = SidebarLinkContainer | SidebarLinkRegular;

export type Product = {
  name: string;
  description: string;
  imageUrl: string[];
  inStock: boolean;
  price: number;
  discountPrice: number;
  _id: string;
  category: string;
};

export type Order = {
  _id: string;
  items: {
    price: number;
    quantity: number;
    productId: Product;
  }[];
  shippingAddress: {
    street: string;
    email: string;
    city: string;
    state: string;
    phoneNumber: string;
    name: string;
  };
  orderRef: string;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  totalAmount: number;
  orderDate: Date;
  shippingId: {
    shippingFee: number;
    state: string;
  };
};

export type User = {
  accountBank: string;
  accountName: string;
  accountNumber: string;
  email: string;
  name: string;
  phoneNumber: string;
  role: "admin" | "user";
  _id: string;
};
export type Account = {
  accountBank: string;
  accountName: string;
  accountNumber: string;
  phoneNumber: string;
};
