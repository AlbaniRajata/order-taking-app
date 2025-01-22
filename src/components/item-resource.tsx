import {
    ArrayInput,
    BooleanInput,
    Create,
    Datagrid,
    DateField,
    Edit,
    ImageField,
    List,
    NumberField,
    NumberInput,
    required,
    ResourceProps,
    SimpleForm,
    SimpleFormIterator,
    TextField,
    TextInput,
    Toolbar,
    SaveButton,
    useRedirect,
    useNotify,
    number,
    ReferenceInput,
    SelectInput,
    ReferenceField,
    ChipField,
} from "react-admin";
import { MdOutlineFastfood } from "react-icons/md";

const getRandomImage = () => `https://picsum.photos/1000/1000?random=${Math.random()}`;

const CustomToolbar = () => (
    <Toolbar>
        <SaveButton />
    </Toolbar>
);

const ItemForm = () => {
    return (
        <SimpleForm sanitizeEmptyValues toolbar={<CustomToolbar />}>
            <ImageField source="image" label="Random Image" record={{ image: getRandomImage() }} />
            <ReferenceInput source="category" reference="category" fullWidth>
                <SelectInput optionText="title" fullWidth validate={[required()]} />
            </ReferenceInput>
            <TextInput source="label" validate={[required()]} fullWidth />
            <NumberInput source="price" validate={[required(), number()]} fullWidth />
            <TextInput source="description" fullWidth />
            <ArrayInput source="variants">
                <SimpleFormIterator fullWidth>
                    <TextInput source="type" helperText={false} fullWidth />
                    <ArrayInput source="choices">
                        <SimpleFormIterator inline>
                            <TextInput source="label" />
                            <NumberInput source="price" defaultValue={0} />
                        </SimpleFormIterator>
                    </ArrayInput>
                    <BooleanInput source="allowMultiple" helperText={false} fullWidth />
                    <BooleanInput source="isRequired" helperText={false} fullWidth />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    );
};

const ItemCreate = () => {
    const notify = useNotify();
    const redirect = useRedirect();

    const onSuccess = () => {
        notify("Item successfully saved", { type: "info" });
        redirect("list", "item");
    };

    return (
        <Create mutationOptions={{ onSuccess }}>
            <ItemForm />
        </Create>
    );
};

const ItemEdit = () => {
    const notify = useNotify();
    const redirect = useRedirect();

    const onSuccess = () => {
        notify("Item successfully updated", { type: "info" });
        redirect("list", "item");
    };

    return (
        <Edit mutationOptions={{ onSuccess }}>
            <ItemForm />
        </Edit>
    );
};

const ItemList = () => (
    <List>
        <Datagrid rowClick="edit">
            <ImageField
                source="image"
                label="Random Image"
                record={{ image: getRandomImage() }}
            />
            <TextField source="label" />
            <NumberField source="price" />
            <ReferenceField source="category" reference="category">
                <ChipField source="title" />
            </ReferenceField>
            <TextField source="description" />
            <DateField source="createdate" showTime label="Created At" />
            <DateField source="lastupdate" showTime label="Updated At" />
        </Datagrid>
    </List>
);

export const ItemProps: ResourceProps = {
    icon: MdOutlineFastfood,
    name: "item",
    list: ItemList,
    create: ItemCreate,
    edit: ItemEdit,
};
