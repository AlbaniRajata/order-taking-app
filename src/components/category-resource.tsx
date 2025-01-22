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
    useNotify,
} from "react-admin";
import { MdOutlineCategory } from "react-icons/md";

const getRandomImage = () => `https://picsum.photos/200/300?random=${Math.random()}`;

const CustomToolbar = () => (
    <Toolbar>
        <SaveButton />
    </Toolbar>
);

const CategoryForm = () => {
    return (
        <SimpleForm sanitizeEmptyValues toolbar={<CustomToolbar />}>
            <ImageField source="image" label="Random Image" record={{ image: getRandomImage() }} />
            <TextInput source="title" validate={[required()]} fullWidth />
            <TextInput source="description" fullWidth />
        </SimpleForm>
    );
};

const CategoryCreate = () => {
    const notify = useNotify();
    const redirect = useRedirect();

    const onSuccess = () => {
        notify("Category successfully saved", { type: "info" });
        redirect("list", "category");
    };

    return (
        <Create mutationOptions={{ onSuccess }}>
            <CategoryForm />
        </Create>
    );
};

const CategoryEdit = () => {
    const notify = useNotify();
    const redirect = useRedirect();

    const onSuccess = () => {
        notify("Category successfully updated", { type: "info" });
        redirect("list", "category");
    };

    return (
        <Edit mutationOptions={{ onSuccess }}>
            <CategoryForm />
        </Edit>
    );
};

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
            <DateField source="createdate" showTime label="Created At" />
            <DateField source="lastupdate" showTime label="Updated At" />
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
