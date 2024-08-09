import { gql, useMutation } from "@apollo/client";
import { ARCHIVE_PRODUCT } from "@/graphql/mutations/archiveProduct";

// Custom Hook for archiving a product
export const useArchiveProduct = () => {
  const [archiveProductMutation, { loading, error, data }] = useMutation(ARCHIVE_PRODUCT);

  const archiveProduct = async (productId) => {
    try {
      const response = await archiveProductMutation({ variables: { productId } });
      if (!response.data) {
        throw new Error('No data returned from the server.');
      }
      return response.data.archiveProduct;
    } catch (error) {
      console.error('Error archiving product:', error);
      throw error;
    }
  };

  return { archiveProduct, loading, error, data };
};
