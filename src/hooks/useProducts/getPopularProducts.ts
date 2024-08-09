import { useQuery } from "@apollo/client";
import { GET_POPULAR_PRODUCTS } from "@/graphql/queries";

const usePopularProducts = (pageNo = 0, pageSize = 100) => {
  const { loading, error, data } = useQuery(GET_POPULAR_PRODUCTS, {
    variables: { pageNo, pageSize },
  });

  const popularProducts = data?.getPopularProducts || [];

  return {
    loading,
    error,
    popularProducts,
  };
};

export default usePopularProducts;
