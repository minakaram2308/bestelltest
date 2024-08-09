import { useQuery } from '@apollo/client';
import { 
  GET_PRODUCTS,
  GET_ALL_PRODUCTS, 
  GET_RESTOCK_PRODUCTS, 
  GET_OUT_OF_STOCK_PRODUCTS, 
  GET_HIDDEN_PRODUCTS, 
  GET_POPULAR_PRODUCTS, 
  GET_NEW_PRODUCTS, 
  GET_EXPIRED_PRODUCTS 
} from './getProductsSections';

export const useFilteredProducts = ({
  filterType = 'ALL',
  category = 'FOOD', 
  pageNo = 0,
  pageSize = 100
}) => {
  let query;
  const variables = { pageNo, pageSize, category }; 

  switch (filterType) {
    case 'RESTOCK':
      query = GET_RESTOCK_PRODUCTS;
      break;
    case 'OUTSTOCK':
      query = GET_OUT_OF_STOCK_PRODUCTS;
      break;
    case 'ARCHIVE':
      query = GET_HIDDEN_PRODUCTS;
      break;
    case 'POPULAR':
      query = GET_POPULAR_PRODUCTS;
      break;
    case 'NEW':
      query = GET_NEW_PRODUCTS;
      break;
    case 'EXPIRED':
      query = GET_EXPIRED_PRODUCTS;
      break;
    default:  
      query = GET_ALL_PRODUCTS;
      variables.filterType = filterType;
  }

  const { loading, error, data } = useQuery(query, { variables });

  let products = [];
  if (data) {
    if (data.getAllProducts) {
      products = data.getAllProducts;
    } else if (data.getProducts) {
      products = data.getProducts;
    } else if (data.getRestockProducts) {
      products = data.getRestockProducts;
    } else if (data.getOutOfStockProducts) {
      products = data.getOutOfStockProducts;
    } else if (data.getHiddenProducts) {
      products = data.getHiddenProducts;
    } else if (data.getPopularProducts) {
      products = data.getPopularProducts;
    } else if (data.getNewProducts) {
      products = data.getNewProducts;
    } else if (data.getExpiredProducts) {
      products = data.getExpiredProducts;
    }
  }

  console.log(products);

  return {
    loading,
    error,
    products,
  };
};
