import { Timestamp } from "firebase/firestore";

export type PaymentMethodType = 'cash' | 'card' | 'debitphone';
export type OrderStatus = 'pending' | 'confirmed' | 'cancelled';
export type ImageType = {
    src: string;
    title: string;
};

export const getRandomImage = () => `https://picsum.photos/200/300?random=${Math.random()}`;

export interface IRestaurant {
    name: string;
    address: string;
    phone: string;
    closingTime: Timestamp;
    openingTime: Timestamp;
    paymentMethods: PaymentMethodType[]
}

export interface ICategory {
    id: string;
    createdate: string;
    lastupdate: string;
    createdby: string;
    image: ImageType;
    title: string;
    description: string;
}

export interface IItem {
    id: string;
    image?: ImageType;
    price: number;
    label: string;
    category: string;
    createdby: string;
    updatedby: string;
    createdate: string;
    lastupdate: string;
    description: string;
    variants: IVariant[];
}

export interface IVariant {
    isRequired: boolean;
    allowMultiple: boolean;
    type: string;
    choices: IChoice[];
}

export interface IChoice {
    price: number;
    label: string;
}

export interface IOrder {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    lines: ILine[];
    comments?: string;
    reason?: string;
    pickupTime: string;
    paymentMethod: PaymentMethodType[];
    status?: OrderStatus;
    subTotal: number;
    total: number;
  }
  

export interface ILine {
    label: string;
    price: number;
    quantity: number;
    instructions: string;
    value: ILineValue[];
}

export interface ILineValue {
    variant: string;
    value: string;
    price: number;
}