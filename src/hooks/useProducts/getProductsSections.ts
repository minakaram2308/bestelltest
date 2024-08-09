import { gql } from '@apollo/client';

export const GET_ALL_PRODUCTS = gql`
  query getProducts($pageNo: Int = 0, $pageSize: Int = 100, $category: Category) {
    getProducts(pageNo: $pageNo, pageSize: $pageSize,category: $category) {
      id
      title
      image
      price
      quantity
      specialCode
      productNumber
      productUnit {
        name
      }
      orderedQuantity
      tax
      quantityDetails {
        qte
        end
      }
    }
  }
`;

export const GET_RESTOCK_PRODUCTS = gql`
  query getProducts($pageNo: Int = 0, $pageSize: Int = 100, $category: Category) {
    getProducts(filterBy: RESTOCK, pageNo: $pageNo, pageSize: $pageSize, category: $category) {
      id
      title
      image
      price
      quantity
      specialCode
      productNumber
      productUnit {
        name
      }
      orderedQuantity
      tax
      quantityDetails {
        qte
        end
      }
    }
  }
`;

export const GET_OUT_OF_STOCK_PRODUCTS = gql`
  query getProducts($pageNo: Int = 0, $pageSize: Int = 100, $category: Category) {
    getProducts(filterBy: OUTSTOCK, pageNo: $pageNo, pageSize: $pageSize, category: $category) {
      id
      title
      image
      price
      quantity
      specialCode
      productNumber
      productUnit {
        name
      }
      orderedQuantity
      tax
      quantityDetails {
        qte
        end
      }
    }
  }
`;

export const GET_HIDDEN_PRODUCTS = gql`
  query getProducts($pageNo: Int = 0, $pageSize: Int = 100, $category: Category) {
    getProducts(filterBy: ARCHIVE, pageNo: $pageNo, pageSize: $pageSize, category: $category) {
      id
      title
      image
      price
      quantity
      specialCode
      productNumber
      productUnit {
        name
      }
      orderedQuantity
      tax
      quantityDetails {
        qte
        end
      }
    }
  }
`;

export const GET_POPULAR_PRODUCTS = gql`
  query getProducts($pageNo: Int = 0, $pageSize: Int = 100) {
    getPopularProducts(pageNo: $pageNo, pageSize: $pageSize) {
      id
      title
      image
      price
      quantity
      specialCode
      productNumber
      productUnit {
        name
      }
      orderedQuantity
      tax
      quantityDetails {
        qte
        end
      }
    }
  }
`;

export const GET_NEW_PRODUCTS = gql`
 query getNewProducts($pageNo: Int = 0, $pageSize: Int = 100) {
  getNewProducts(pageNo: $pageNo, pageSize: $pageSize) {
      id
      title
      image
      price
      quantity
      specialCode
      productNumber
      productUnit {
        name
      }
      orderedQuantity
      tax
      quantityDetails {
        qte
        end
      }
    }
  }
`;

export const GET_EXPIRED_PRODUCTS = gql`
  query getProducts($pageNo: Int = 0, $pageSize: Int = 100, $category: Category) {
    getProducts(filterBy: EXPIRED, pageNo: $pageNo, pageSize: $pageSize, category: $category) {
      id
      productNumber
      title
      image
      quantity
      
    }
  }
`;

// export const GET_PRODUCTS = gql`
//   query GetProducts($filterBy: ProductFilter = ALL, $category: Category, $subCategoryId: Int, $searchWord: String, $sortBy: ProductSort, $pageNo: Int = 0, $pageSize: Int = 100) {
//     getProducts(filterBy: $filterBy, category: $category, subCategoryId: $subCategoryId, searchWord: $searchWord, sortBy: $sortBy, pageNo: $pageNo, pageSize: $pageSize) {
//       id
//       title
//       image
//       price
//       quantity
//       specialCode
//       productUnit {
//         name
//       }
//       orderedQuantity
//       tax
//       quantityDetails {
//         qte
//         end
//       }
//       productCategory {
//         id
//         isFood
//       }
//     }
//   }
// `;
