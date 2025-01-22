import {
  Button,
  Heading,
  Icon,
  VStack,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { useDataProvider } from "../components/data-provider";
import { MdOutlineCelebration, MdCancel, MdHourglassBottom } from "react-icons/md";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../utils/firebase";

const ThankyouContent = () => {
  const { order } = useDataProvider();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleConfirmOrder = async () => {
    if (!order || !order.id) return;

    try {
      // Update Firestore order status
      await updateDoc(doc(db, "orders", order.id), {
        status: "confirmed",
      });

      onClose(); // Close modal after updating
    } catch (error) {
      console.error("Error confirming order:", error);
    }
  };

  if (!order) return null;

  if (order.status === "pending") {
    return (
      <>
        <Icon as={MdHourglassBottom} w={24} h={24} color="gray.700" />
        <Heading textAlign="center">Waiting for a confirmation</Heading>
        <Text textAlign="center">
          Your order has been placed. Please wait for a confirmation from the
          restaurant.
        </Text>
        <Button mt={4} colorScheme="blue" onClick={onOpen}>
          Confirm Order
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Confirm Order</ModalHeader>
            <ModalBody>
              Are you sure you want to confirm this order?
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={handleConfirmOrder}>
                Yes, Confirm
              </Button>
              <Button ml={3} onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }

  if (order.status === "cancelled") {
    return (
      <>
        <Icon as={MdCancel} w={24} h={24} color="gray.700" />
        <Heading textAlign="center">Order Cancelled</Heading>
        <Text textAlign="center">
          Your order has been cancelled. Please contact the restaurant for more
          information.
        </Text>
      </>
    );
  }

  return (
    <>
      <Icon as={MdOutlineCelebration} w={24} h={24} color="gray.700" />
      <Heading textAlign="center">Order Confirmed</Heading>
      <Text textAlign="center">
        See you soon! Your order has been confirmed and will be ready for pickup.
      </Text>
    </>
  );
};

export const ThankYou = () => {
  return (
    <VStack gap={4} mt={4} mx={4}>
      <ThankyouContent />
    </VStack>
  );
};
