import {
    ResourceProps,
    List,
    Datagrid,
    TextField,
    SimpleForm,
    TextInput,
    required,
    DateField,
    ImageInput,
    ImageField,
    Edit,
    NumberInput,
    number,
    FunctionField,
    ArrayInput,
    SimpleFormIterator,
    BooleanInput,
    ReferenceInput,
    SelectInput,
} from "react-admin";
import { MdReceipt } from "react-icons/md";
  
const OrderList = () => (
    <List>
        <Datagrid
            rowClick="edit"
            bulkActionButtons={false}
            rowStyle={(record) =>
                record.status === "pending"
                    ? {
                        backgroundColor: "pink",
                    }
                    : undefined
            }
        >
            <TextField source="firstName" />
            <TextField source="lastName" />
            <TextField source="email" />
            <TextField source="phone" />
            <TextField source="status" />
            <FunctionField
                label="Total Price"
                render={(record: any) => {
                    if (record.lines && Array.isArray(record.lines)) {
                        const total = record.lines.reduce(
                            (sum: number, line: any) =>
                                sum + (line.price || 0) * (line.quantity || 0),
                            0
                        ).toFixed(2);
                        return `$${total}`;
                    }
                    return "$0.00";
                }}
            />
        </Datagrid>
    </List>
);

export const OrderProps: ResourceProps = {
    icon: MdReceipt,
    name: "orders",
    list: OrderList,
};
