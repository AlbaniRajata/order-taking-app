import { Admin as RAdmin, Resource } from "react-admin";
import { 
    RAFirebaseOptions, 
    FirebaseDataProvider, 
    FirebaseAuthProvider
} from "react-admin-firebase";
import { CategoryProps } from "../components/category-resource";
import { ItemProps } from "../components/item-resource";
import { firebaseConfig } from "../utils/firebase";
import { InfoProps } from "../components/info";
import { OrderProps } from "../components/order-resource";

const options: RAFirebaseOptions = {
    logging: true,
    persistence: "session",
    lazyLoading: {
        enabled: true,
    },
    watch: ["orders"],
};

const dataProvider = FirebaseDataProvider(firebaseConfig, options);
const authProvider = FirebaseAuthProvider(firebaseConfig, {});

export const Admin = () => {
    return (
        <RAdmin 
            authProvider={authProvider} 
            dataProvider={dataProvider}
        >
            <Resource {...CategoryProps}/>
            <Resource {...ItemProps}/>
            <Resource {...InfoProps} />
            <Resource {...OrderProps} />
        </RAdmin>
    );
};