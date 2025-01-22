import {
    ResourceProps,
    List,
    Datagrid,
    TextField,
    SimpleForm,
    TextInput,
    Edit,
    FunctionField,
    Labeled,
    NumberField,
    RadioButtonGroupInput,
    ArrayField,
    SimpleList,
} from "react-admin";
import { MdReceipt } from "react-icons/md";
import { ORDER_STATUS } from "../utils/constants";

const OrderForm = () => {
    return (
        <SimpleForm sanitizeEmptyValues>
            <Labeled label="First Name">
                <TextField source="firstName" />
            </Labeled>
            <Labeled label="Last Name">
                <TextField source="lastName" />
            </Labeled>
            <Labeled label="Email">
                <TextField source="email" />
            </Labeled>
            <Labeled label="Phone">
                <TextField source="phone" />
            </Labeled>
            <Labeled label="Comments">
                <TextField source="comments" />
            </Labeled>
            <Labeled label="Total">
                <FunctionField
                    label="Total"
                    render={(record: any) => {
                        if (record.lines && Array.isArray(record.lines)) {
                            const total = record.lines
                                .reduce(
                                    (sum: number, line: any) =>
                                        sum + (line.price || 0) * (line.quantity || 0),
                                    0
                                )
                                .toFixed(2);
                            return `$${total}`;
                        }
                        return "$0.00";
                    }}
                />
            </Labeled>
            <RadioButtonGroupInput choices={ORDER_STATUS} source="status" />
            <TextInput source="reason" />
            <ArrayField source="lines">
                <Datagrid bulkActionButtons={false}>
                    <TextField source="label" />
                    <NumberField
                        source="price"
                        options={{ style: "currency", currency: "USD" }}
                    />
                    <NumberField source="quantity" />
                    <TextField source="comments" />
                    <ArrayField source="value">
                        <SimpleList
                            primaryText={(record) => `${record.value}`}
                            secondaryText={(record) =>
                                record.price
                                    ? `$${record.price.toFixed(2)}`
                                    : "$0.00"
                            }
                        />
                    </ArrayField>
                </Datagrid>
            </ArrayField>
        </SimpleForm>
    );
};

const OrderEdit = () => (
    <Edit>
        <OrderForm />
    </Edit>
);

const OrderList = () => (
    <List>
        <Datagrid
            rowClick="edit"
            bulkActionButtons={false}
            rowStyle={(record) =>
                record.status === "pending"? {
                    backgroundColor: "pink"
                } : undefined
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
                        const total = record.lines
                            .reduce(
                                (sum: number, line: any) =>
                                    sum + (line.price || 0) * (line.quantity || 0),
                                0
                            )
                            .toFixed(2);
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
    edit: OrderEdit,
};
