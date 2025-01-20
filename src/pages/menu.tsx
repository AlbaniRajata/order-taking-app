import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Box, Flex, Heading, Text, Image, Link } from "@chakra-ui/react";
import { getRandomImage } from "../models/index";
import { useDataProvider } from "../components/data-provider";
import { useNavigate } from "react-router-dom";

export const Menu = () => {
    const navigate = useNavigate();
    const { categories, getItemsByCategory } = useDataProvider();

    return (
        <Accordion defaultIndex={categories.map((_, index) => index)} allowMultiple>
            {categories.map(category => (
                <AccordionItem key={category.id}>
                    <AccordionButton bg="gray.200">
                        <Box as="span" flex="1" textAlign="left">
                            <Flex align="center" gap={3}>
                                <Box>
                                    <Heading as="h2" fontSize={20}>
                                        {category.title}
                                    </Heading>
                                    {category.description && (
                                        <Text fontSize={14} color="gray.600">
                                            {category.description}
                                        </Text>
                                    )}
                                </Box>
                            </Flex>
                        </Box>
                    </AccordionButton>
                    <AccordionPanel p={0}>
                        <Image 
                            src={category.image?.src || getRandomImage()} 
                            objectFit="cover" 
                            w="100%" 
                            maxH={150}
                        />
                        {getItemsByCategory(category.id).map(item => (
                            <Link 
                                key={item.id}
                                onClick={() => navigate(`/item/${item.id}`)} 
                                _hover={{ textDecoration: "none" }}
                            >
                                <Flex 
                                    px={4} 
                                    py={2} 
                                    justify="space-between"
                                    borderBottom="1px solid"
                                    borderColor="gray.100" 
                                    _hover={{ backgroundColor: "gray.100" }}
                                >
                                    <Flex gap={2}>
                                        <Image
                                            src={item.image?.src || getRandomImage()}
                                            width="40px"
                                            height="40px"
                                            objectFit="cover"
                                            borderRadius="md"
                                        />
                                        <Box>
                                            <Heading as="h3" fontSize="14px" color="gray.800">
                                                {item.label}
                                            </Heading>
                                        </Box>
                                        <Text>{item.description}</Text>
                                    </Flex>
                                    <Text>${item.price.toFixed(2)}</Text>
                                </Flex>
                            </Link>
                        ))}
                    </AccordionPanel>
                </AccordionItem>
            ))}
        </Accordion>
    );
};
