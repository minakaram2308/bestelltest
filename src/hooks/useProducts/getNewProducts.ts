import { useQuery } from "@apollo/client";
import { GET_NEW_PRODUCTS } from "@/graphql/queries";

const useNewProducts = (pageNo = 0, pageSize = 100) => {
  const { loading, error, data } = useQuery(GET_NEW_PRODUCTS, {
    variables: { pageNo, pageSize },
  });

  const newProducts = data?.getNewProducts || [];

  return {
    loading,
    error,
    newProducts,
  };
};

export default useNewProducts;
