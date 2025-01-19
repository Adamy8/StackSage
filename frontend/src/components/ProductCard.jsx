import { Box, Heading, HStack, Image, Text } from '@chakra-ui/react'
import { useColorModeValue } from "@/components/ui/color-mode"
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";

const ProductCard = (product) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
//   console.log("here:",product.product);
  const productInstance = product.product;
  return (
    <Box shadow="lg" rounded="lg" margin="5" overflow='hidden' transition='all 0.3s'
    _hover={{transform:"translateY(-5px)", shadow:"xl"}} bg={bg} >
        <Image src={productInstance.image} alt={productInstance.name} h={48} w='full' objectFit='cover' />
        <Box p={4}>
            <Heading as='h3' size='md' mb={2}>
                {productInstance.name}
            </Heading>
            <Text frontweight='bold' fontSize='xl' color={textColor} mb={4}>
                ${productInstance.price}            {/*cuz price is stored as num*/}
            </Text>

            <HStack spacing={2}>
                <FiEdit color='blue' />
                <RiDeleteBin5Line color='red' />
            </HStack>
        </Box>
    </Box>
  )
}

export default ProductCard