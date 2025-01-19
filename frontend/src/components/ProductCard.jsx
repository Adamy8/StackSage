import { Box, Heading, HStack, Image, Text, Button, VStack, Input } from '@chakra-ui/react'    //chakra ui
import { useColorModeValue } from "@/components/ui/color-mode"      //chakra ui
import { Toaster, toaster } from "@/components/ui/toaster"     //chakra ui
import {
    DrawerBackdrop,
    DrawerBody,
    DrawerCloseTrigger,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerRoot,
    DrawerTitle,
  } from "@/components/ui/drawer"    //chakra ui
import { Field } from "@/components/ui/field.jsx";
import { useState } from "react"    // React
import { FiEdit } from "react-icons/fi";    //react icon
import { RiDeleteBin5Line } from "react-icons/ri";  //react icon
import { useProductStore } from "../store/product.js"

const ProductCard = (product) => {
    const [updatedProduct, setUpdatedProduct] = useState(product);    // for drawer's form
    // console.log(updatedProduct);
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");
    //   console.log("get here: ",product.product);
    const productInstance = product.product;

    const { deleteProduct } = useProductStore(); // from store/product.js
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
    
    const { updateProduct } = useProductStore(); // from store/products.js
    const handleUpdateProduct = async (pid,updatedProduct) => {
        const {success, message} = await updateProduct(pid, updatedProduct);
        if(success){
            toaster.create({
              title: `Success`,
              type: 'success',
              description: message,
            });
            setOpen(false);
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


        {/* The Update Drawer! */}
        <DrawerRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
        <DrawerBackdrop />
        <DrawerContent>
            <DrawerHeader>
            <DrawerTitle>Edit product</DrawerTitle>
            </DrawerHeader>
            <DrawerBody>
                <VStack spaceY={7}>
                    <Field label="Name">
                        <Input placeholder='Product Name' name='name' value={updatedProduct.product.name}
                        onChange={(e) => setUpdatedProduct({...updatedProduct, product: { ...updatedProduct.product, name: e.target.value }})}
                        />
                    </Field>
                    <Field label="Price">
                        <Input placeholder='Price' name='price' type='number' value={updatedProduct.product.price}
                        onChange={(e) => setUpdatedProduct({...updatedProduct, product: { ...updatedProduct.product, price: e.target.value }})}
                        />
                    </Field>
                    <Field label="Image">
                        <Input placeholder='Image URL' name='image' value={updatedProduct.product.image}
                        onChange={(e) => setUpdatedProduct({...updatedProduct, product: { ...updatedProduct.product, image: e.target.value }})}
                        />
                    </Field>
                </VStack>
                <HStack mt={10} justifyContent="flex-end">
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button> 
                    <Button onClick={() => handleUpdateProduct(productInstance._id, updatedProduct)}>Update</Button>
                </HStack>
            </DrawerBody>
            <DrawerFooter justifyContent={"center"}>
                <Text color='gray.500'>Product &#174;</Text>    {/*  &#174; is the code for ®  */}
            </DrawerFooter>
            <DrawerCloseTrigger />
        </DrawerContent>
        </DrawerRoot>


    </Box>
  )
}

export default ProductCard