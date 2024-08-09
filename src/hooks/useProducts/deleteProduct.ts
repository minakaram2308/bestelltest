import { gql, useMutation } from "@apollo/client";
import { DELETE_PRODUCT } from "./../../graphql/mutations/deleteProduct";

// Custom Hook for deleting a product
export const useDeleteProduct = () => {
  const [deleteProductMutation, { loading, error, data }] = useMutation(DELETE_PRODUCT);

  const deleteProduct = async (productId) => {
    try {
      const response = await deleteProductMutation({ variables: { productId } });
      if (!response.data) {
        throw new Error('No data returned from the server.');
      }
      return response.data.deleteProduct;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  };

  return { deleteProduct, loading, error, data };
};
