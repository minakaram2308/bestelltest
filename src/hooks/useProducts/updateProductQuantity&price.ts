import { useMutation } from "@apollo/client";
import { UPDATE_PRODUCTS_QUANTITY_PRICE } from "@/graphql/mutations/updateProductsQuantity&Prices";

// Custom Hook for updating products' quantity and price
export const useUpdateProductsQuantityAndPrice = () => {
  const [updateProductsQuantityAndPriceMutation, { loading, error, data }] = useMutation(UPDATE_PRODUCTS_QUANTITY_PRICE);

  const updateProductsQuantityAndPrice = async (products) => {
    try {
      const response = await updateProductsQuantityAndPriceMutation({ variables: { products } });
      if (!response.data) {
        throw new Error('No data returned from the server.');
      }
      return response.data.updateProductsQuantityAndPrice;
    } catch (error) {
      console.error('Error updating products quantity and price:', error);
      throw error;
    }
  };

  return { updateProductsQuantityAndPrice, loading, error, data };
};
