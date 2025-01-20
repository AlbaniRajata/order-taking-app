import { 
    Create, 
    Datagrid, 
    DateField, 
    Edit, 
    ImageField,
    List, 
    required, 
    ResourceProps, 
    SimpleForm, 
    TextField, 
    TextInput,
    Toolbar,
    SaveButton,
    useRedirect,
    useNotify
} from 'react-admin';
import { MdOutlineCategory } from 'react-icons/md';

const getRandomImage = () => `https://picsum.photos/200/300?random=${Math.random()}`;

const CustomToolbar = () => {
    const redirect = useRedirect();
    const notify = useNotify();

    const onSave = () => {
        notify('Category successfully saved', { type: 'info' });
        redirect('list', 'category');
    };

    return (
        <Toolbar>
            <SaveButton onClick={onSave} />
        </Toolbar>
    );
};

const CategoryForm = () => {
    return (
        <SimpleForm sanitizeEmptyValues toolbar={<CustomToolbar />}>
            <ImageField source="image" label="random image" record={{ image: getRandomImage() }} />
            <TextInput source="title" validate={[required()]} fullWidth/>
            <TextInput source="description" fullWidth/>
        </SimpleForm>
    );
};

const CategoryCreate = () => (
    <Create>
        <CategoryForm/>
    </Create>
);

const CategoryEdit = () => (
    <Edit>
        <CategoryForm/>
    </Edit>
);

const CategoryList = () => (
    <List>
        <Datagrid rowClick="edit">
            <ImageField 
                source="image" 
                label="Random Image" 
                record={{ image: getRandomImage() }} 
            />
            <TextField source="title" />
            <TextField source="description" />
            <DateField source="createdate" showTime label="Created At"/>
            <DateField source="lastupdate" showTime label="Updated At"/>
        </Datagrid>
    </List>
);

export const CategoryProps: ResourceProps = {
    icon: MdOutlineCategory,
    name: "category",
    list: CategoryList,
    create: CategoryCreate,
    edit: CategoryEdit,
};
