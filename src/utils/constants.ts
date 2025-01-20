export type PaymentMethodType = 'cash' | 'card' | 'phone' ;

export interface IPaymentMethod {
    id: PaymentMethodType;
    name: string;
}

export const PAYMENT_METHODS: IPaymentMethod[] = [
    { id: 'cash', name: 'Cash at the counter' },
    { id: 'card', name: 'Credit Card' },
    { id: 'phone', name: 'Call me back to get payment information' },
];