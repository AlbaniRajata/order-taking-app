import { ListGuesser, Admin as RAdmin, Resource } from "react-admin";
import { RAFirebaseOptions, FirebaseDataProvider } from "react-admin-firebase";
import { firebaseConfig } from "../utils/firebase";

const options: RAFirebaseOptions = {
    logging: true,
    persistence: "session",
    lazyLoading: {
        enabled: true,
    },
    watch: ["orders"],
};

const dataProvider = FirebaseDataProvider(firebaseConfig, options);

export const Admin = () => {
    return (
        <RAdmin dataProvider={dataProvider}>
            <Resource name="items" list={ListGuesser} />
        </RAdmin>
    );
};