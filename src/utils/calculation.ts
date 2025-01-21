import { ILineValue } from "../models";

export const calculateItemTotal = (
	fields: ILineValue[], 
	price: number, 
	quantity: number
) => {
	const totalFields = fields.reduce((acc, field) => acc + field.price, 0);
	return (price + totalFields) * quantity;
};