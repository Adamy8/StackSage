import { Container, Flex, Text, Link, HStack, Button } from "@chakra-ui/react"
import { ColorModeButton, useColorModeValue } from "@/components/ui/color-mode"
import { FaRegSquarePlus } from "react-icons/fa6";

const Navbar = () => {
  return (
    <Container maxW={"1140px"} px={4}>
        <Flex 
            h={16} 
            alignItems={"center"} 
            justifyContent={"space-between"}
            flexDir={{
                base:"column",
                sm:"row"
            }}
        >
            <Text
                fontSize={{base:"22", sm:"28"}}
                fontWeight={"bold"}
                textAlign={"center"}
            >
                <Link href={"/"}> Product store 🛒</Link>
            </Text>
            <HStack spacing={2} alignItems={"center"}>
                <Link href={"/create"}>
                    <Button  backgroundColor={useColorModeValue("gray.100","gray.900")} >        {/* change style later! Consistent with box */}
                        <FaRegSquarePlus style={{ margin: -20, color:useColorModeValue("black", "white") }} />
                    </Button>
                </Link>
                <ColorModeButton />
            </HStack>

        </Flex>
    </Container>
  );
};

export default Navbar;