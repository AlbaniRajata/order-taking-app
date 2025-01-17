export type PaymentMethodType = 'cash' | 'card' | 'debitphone';
export type OrderStatus = 'pending' | 'confirmed' | 'cancelled' | 'cancelled';

export interface IRestaurant {
    name: string;
    address: string;
    phone: string;
    closingTime: string;
    openingTime: string;
    paymentMethods: PaymentMethodType[]
}

export interface ICategory {
    id: string;
    createdate: string;
    lastupdate: string;
    createdby: string;
    image: string;
    title: string;
    description: string;
}

export interface IItem {
    id: string;
    image: string;
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
    choice: IChoice[];
}

export interface IChoice {
    price: number;
    label: string;
}

export interface IOrder {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    lines: ILine[];
    comments?: string;
    reason?: string;
    pickupTime: string;
    paymentMethod: PaymentMethodType[];
    status?: OrderStatus[];
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