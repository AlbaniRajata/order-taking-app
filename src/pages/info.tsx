import { Box } from "@chakra-ui/react";
import { useDataProvider } from "../components/data-provider"; 

export const Info = () => {
    const { restaurantInfo } = useDataProvider();

    if (!restaurantInfo) return null;
    
    return (
        <Box>
            <p>Info Page</p>
            <p>Restaurant Name: {restaurantInfo.name}</p>
        </Box>
    );
};