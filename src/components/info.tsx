import {
    Box,
    Flex,
    Heading,
    Image,
    List,
    ListIcon,
    ListItem,
    Text,
    Divider,
  } from "@chakra-ui/react";
  import {
    BsClock,
    BsCashCoin,
    BsFillPinMapFill,
    BsTelephone,
    BsArrowRightSquare,
  } from "react-icons/bs";
  
  import { useDataProvider } from "../components/data-provider";
  import { PAYMENT_METHODS } from "../utils/constants";
  import moment from "moment";
import { ResourceProps } from "react-admin";
import { MdOutlineInfo } from "react-icons/md";
  
  export const Info = () => {
    const { restaurantInfo } = useDataProvider();
  
    if (!restaurantInfo) return null;
  
    const items = [
      {
        icon: <BsClock />,
        label: "Opening Hours",
        children: (
          <Flex px={4} py={2} justify="space-between">
            <Text fontWeight="medium" color="gray.600">
              Everyday
            </Text>
            <Text fontWeight="bold" color="blue.600">
              {moment(restaurantInfo.openingTime.toDate()).format("LT")} -{" "}
              {moment(restaurantInfo.closingTime.toDate()).format("LT")}
            </Text>
          </Flex>
        ),
      },
      {
        icon: <BsCashCoin />,
        label: "Payment Methods",
        children: (
          <Flex px={4} py={2} direction="column" gap={2}>
            <List spacing={2}>
              {restaurantInfo.paymentMethods.map((method, index) => (
                <ListItem
                  key={index}
                  display="flex"
                  alignItems="center"
                  gap={2}
                  fontWeight="medium"
                  color="gray.600"
                >
                  <ListIcon as={BsArrowRightSquare} color="green.500" />
                  {PAYMENT_METHODS.find((m) => m.id === method)?.name}
                </ListItem>
              ))}
            </List>
          </Flex>
        ),
      },
      {
        icon: <BsFillPinMapFill />,
        label: "Address",
        children: (
          <Flex px={4} py={2} direction="column">
            <Text fontWeight="medium" color="gray.600">
              {restaurantInfo.address}
            </Text>
          </Flex>
        ),
      },
      {
        icon: <BsTelephone />,
        label: "Phone",
        children: (
          <Flex px={4} py={2} direction="column">
            <Text fontWeight="medium" color="blue.600">
              {restaurantInfo.phone}
            </Text>
          </Flex>
        ),
      },
    ];
  
    return (
      <Box bg="gray.50" p={4} rounded="md" shadow="sm">
        <Image
          src="restaurant.jpg"
          w="100%"
          h={280}
          objectFit="cover"
          rounded="md"
          mb={6}
        />
        {items.map((item, index) => (
          <Flex direction="column" mb={6} key={index}>
            <Flex
              align="center"
              gap={4}
              bg="gray.100"
              p={3}
              rounded="md"
              shadow="sm"
            >
              <Box fontSize="1.5rem" color="blue.500">
                {item.icon}
              </Box>
              <Heading as="h2" fontSize="lg" fontWeight="bold" color="gray.700">
                {item.label}
              </Heading>
            </Flex>
            <Box bg="white" mt={2} rounded="md" shadow="sm" p={4}>
              {item.children}
            </Box>
          </Flex>
        ))}
        <Divider />
      </Box>
    );
  };
  
  export const InfoProps: ResourceProps = {
    name: 'info',
    list: Info,
    icon: MdOutlineInfo,
};
