import { useQuery } from "@apollo/client";
import { GetProduct } from "@/graphql/queries/getProduct";

export const useProduct = (productId: string, language: string) => {
  const { loading, error, data, refetch } = useQuery(GetProduct, {
    variables: { productId, language },
    skip: !productId || !language, // Skip query if productId or language is not provided
  });

  const fetchProduct = async () => {
    try {
      const response = await refetch();
      if (!response.data || !response.data.getProduct) {
        throw new Error('No product returned from the server.');
      }
      return response.data.getProduct;
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error;
    }
  };

  return { fetchProduct, loading, error, data };
};
