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
    number
} from 'react-admin';
import { MdOutlineFastfood } from 'react-icons/md';

const getRandomImage = () => `https://picsum.photos/200/300?random=${Math.random()}`;

const CustomToolbar = () => {
    const redirect = useRedirect();
    const notify = useNotify();

    const onSave = () => {
        notify('Item successfully saved', { type: 'info' });
        redirect('list', 'item');
    };

    return (
        <Toolbar>
            <SaveButton onClick={onSave} />
        </Toolbar>
    );
};

const ItemForm = () => {
    return (
        <SimpleForm sanitizeEmptyValues toolbar={<CustomToolbar />}>
            <ImageField source="image" label="random image" record={{ image: getRandomImage() }} />
            <TextInput source="label" validate={[required()]} fullWidth/>
            <NumberInput source="price" validate={[required(), number()]} fullWidth/>
            <TextInput source="description" fullWidth/>
            <ArrayInput source="variants">
                <SimpleFormIterator fullWidth>
                    <TextInput source="type" helperText={false} fullWidth />
                    <ArrayInput source="choices">
                        <SimpleFormIterator inline>
                            <TextInput source="label" />
                            <NumberInput source="price" defaultValue={0}/>
                        </SimpleFormIterator>
                    </ArrayInput>
                    <BooleanInput source="allowMultiple" helperText={false} fullWidth />
                    <BooleanInput source="isRequired" helperText={false} fullWidth />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    );
};

const ItemCreate = () => (
    <Create>
        <ItemForm/>
    </Create>
);

const ItemEdit = () => (
    <Edit>
        <ItemForm/>
    </Edit>
);

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
            <TextField source="description" />
            <DateField source="createdate" showTime label="Created At"/>
            <DateField source="lastupdate" showTime label="Updated At"/>
        </Datagrid>
    </List>
);

export const  ItemProps: ResourceProps = {
    icon: MdOutlineFastfood,
    name: "item",
    list: ItemList,
    create: ItemCreate,
    edit: ItemEdit,
};
