import { Card, Typography } from "@mui/material";
import { 
    CheckboxGroupInput, 
    SimpleForm, 
    TextInput, 
    TimeInput, 
    useNotify,
    ResourceProps 
} from "react-admin";
import { PAYMENT_METHODS } from "../utils/constants";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useEffect, useState } from "react";
import { MdOutlineInfo } from "react-icons/md";

export const Info = () => {
    const notify = useNotify();
    const restaurantRef = doc(db, 'restaurant', 'info');
    const [defaultValues, setDefaultValues] = useState<any>();

    const handleSubmit = async (data: any) => {
        await setDoc(restaurantRef, data);
        notify('Restaurant information updated', { type: 'success' });
    };

    const fetchData = async () => {
        const snapshot = await getDoc(restaurantRef);
        setDefaultValues(snapshot.data() || {});
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (!defaultValues) return null;

    return (
        <div style={{ marginTop: 20, marginLeft: 16, marginRight: 16, marginBottom: 20 }}>
            <Card style={{ padding: 16 }}>
                <SimpleForm 
                    defaultValues={{
                        ...defaultValues,
                        openingTime: defaultValues.openingTime?.toDate(),
                        closingTime: defaultValues.closingTime?.toDate(),
                    }}
                    sanitizeEmptyValues
                    onSubmit={handleSubmit}
                >
                    <TextInput source="name" label="Name" fullWidth />
                    <TextInput source="address" label="Address" fullWidth />
                    <TextInput source="phone" label="Phone" fullWidth />
                    <TimeInput source="openingTime" label="Opening Time" fullWidth />
                    <TimeInput source="closingTime" label="Closing Time" fullWidth />
                    <CheckboxGroupInput 
                        source="paymentMethods" 
                        choices={PAYMENT_METHODS} 
                        label="Payment Methods" 
                    />
                </SimpleForm>
            </Card>
        </div>
    ); 
};

export const InfoProps: ResourceProps = {
    name: 'info',
    list: Info,
    icon: MdOutlineInfo,
};
