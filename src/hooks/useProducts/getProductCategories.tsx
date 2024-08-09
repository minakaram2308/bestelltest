import { useQuery } from "@apollo/client";
import { GetProductCategories } from "@/graphql/queries/getProductCatagories";

export const useProductsCategories = (language, isFood) => {
  const { loading, error, data, refetch } = useQuery(GetProductCategories, {
    variables: { language, isFood },
    skip: !language, // Skip query if language is not provided
  });

  const fetchProductsCategories = async () => {
    try {
      const response = await refetch();
      if (!response.data || !response.data.getProductCategories) {
        throw new Error('No product categories returned from the server.');
      }
      return response.data.getProductCategories.map(category => ({
        id: category.id,
        value: category.id,
        isFood: category.isFood,
        label: category.translate, // Assuming translate returns the category name
      }));
    } catch (error) {
      console.error("Error fetching product categories:", error);
      throw error;
    }
  };

  return { fetchProductsCategories, loading, error, data: data?.getProductCategories };
};
