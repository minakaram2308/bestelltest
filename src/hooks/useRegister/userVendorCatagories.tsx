import { useQuery } from "@apollo/client";
import { GetVendorCategories } from "@/graphql/queries/getVendorCatagories";

export const useVendorCategories = (language) => {
  const capitalizeLanguage = (lang) => {
    const langUpper = lang.toUpperCase();
    const validLanguages = ["EN", "DE", "TR", "FR", "NE", "ES", "IT", "SW"];
    return validLanguages.includes(langUpper) ? langUpper : null;
  };

  const capitalizedLanguage = capitalizeLanguage(language);

  const { loading, error, data, refetch } = useQuery(GetVendorCategories, {
    variables: { language: capitalizedLanguage },
    skip: !capitalizedLanguage, 
  });

  const fetchVendorCategories = async () => {
    try {
      const response = await refetch();
      if (!response.data || !response.data.getVendorCategories) {
        throw new Error('No vendor categories returned from the server.');
      }
      return response.data.getVendorCategories.map(category => ({
        id: category.id,
        icon: category.icon,
        image: category.image,
        label: category.translate, 
      }));
    } catch (error) {
      console.error("Error fetching vendor categories:", error);
      throw error;
    }
  };

  return { fetchVendorCategories, loading, error, data: data?.getVendorCategories };
};
