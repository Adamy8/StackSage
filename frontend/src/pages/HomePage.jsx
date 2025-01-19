import { Container, VStack, Heading, Text, Link, SimpleGrid } from "@chakra-ui/react"
import { useProductStore } from "@/store/product"
import { useEffect } from "react";
import ProductCard from "@/components/ProductCard";


const HomePage = () => {
  const {fetchProducts, products} = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);    //fetch products from DB
  // console.log("Products: ", products);

  return (
    <Container>
      <VStack>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={4}>      {/*mb is margin bottom*/}
          Current Product 🚀
        </Heading>
        
        <SimpleGrid columns={{base:1, md:2, lg:3}} spacing={100} w="full">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>
        
        {products.length == 0 && (
          <Text textStyle="lg" textAlign={"center"} fontWeight='bold' color="gray.500">
            No products found 🥲{" "}
            <Link href={"/create"}>
              <Text as="span" color="blue.600" _hover={{textDecoration:"underline", color:"blue.500"}}>
                Create a product
              </Text>
            </Link>
          </Text>
        )}


      </VStack>
    </Container>
  )
}

export default HomePage