import { Box, Heading, HStack, Image, Text, Button } from '@chakra-ui/react'    //chakra ui
import { useColorModeValue } from "@/components/ui/color-mode"      //chakra ui
import { Toaster, toaster } from "@/components/ui/toaster"     //chakra ui
import {
    DrawerActionTrigger,
    DrawerBackdrop,
    DrawerBody,
    DrawerCloseTrigger,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerRoot,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"    //chakra ui
import { useState } from "react"    // React
import { FiEdit } from "react-icons/fi";    //react icon
import { RiDeleteBin5Line } from "react-icons/ri";  //react icon
import { useProductStore } from "../store/product.js"

const ProductCard = (product) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
//   console.log("get here: ",product.product);
  const productInstance = product.product;
//   console.log("here, ",productInstance._id);
  const { deleteProduct } = useProductStore();
  const handleDeleteProduct = async (pid) => {
    const {success, message} = await deleteProduct(pid);
    if(success){
        toaster.create({
          title: `Success`,
          type: 'success',
          description: message,
        })
      } else{
        toaster.create({
          title: `Failed`,
          type: 'error',
          description: message,
        });
      }
  }

  const [open, setOpen] = useState(false)       // for Drawer! (at the bottom)

  return (
    <Box shadow="lg" rounded="lg" margin="5" overflow='hidden' transition='all 0.3s'
    _hover={{transform:"translateY(-5px)", shadow:"xl"}} bg={bg} >
        <Toaster />         {/* Render the toaster! */}
        <Image src={productInstance.image} alt={productInstance.name} h={48} w='full' objectFit='cover' />
        <Box p={4}>
            <Heading as='h3' size='md' mb={2}>
                {productInstance.name}
            </Heading>
            <Text frontweight='bold' fontSize='xl' color={textColor} mb={4}>
                ${productInstance.price}            {/*cuz price is stored as num*/}
            </Text>

            <HStack spacing={2}>
                <FiEdit color='blue' onClick={() => setOpen(true)}/>    {/* Open Drawer*/}
                <RiDeleteBin5Line color='red' onClick={() => {handleDeleteProduct(productInstance._id)}}/>
            </HStack>
        </Box>


        {/* Update Drawer! */}
        <DrawerRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
        <DrawerBackdrop />
        <DrawerContent>
            <DrawerHeader>
            <DrawerTitle>Drawer Title</DrawerTitle>
            </DrawerHeader>
            <DrawerBody>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            </DrawerBody>
            <DrawerFooter>
            <DrawerActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
            </DrawerActionTrigger>
            <Button>Save</Button>
            </DrawerFooter>
            <DrawerCloseTrigger />
        </DrawerContent>
        </DrawerRoot>


    </Box>
  )
}

export default ProductCard