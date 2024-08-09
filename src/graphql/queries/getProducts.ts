import { gql } from "@apollo/client";

export const GetProducts = gql`
  query GetProducts(
    $category: Category!
    $subCategoryId: Int
    $searchWord: String
    $filterBy: ProductFilter = ALL
    $sortBy: ProductSort
    $pageNo: Int = 0
    $pageSize: Int = 100
  ) {
    getProducts(
      category: $category
      subCategoryId: $subCategoryId
      searchWord: $searchWord
      filterBy: $filterBy
      sortBy: $sortBy
      pageNo: $pageNo
      pageSize: $pageSize
    ) {
      id
      specialCode
      title
      singularTitle
      description
      productCategory {
        id
        icon
        isFood
        count
        translate(language: EN) # Assuming 'EN' is a valid language code
      }
      productUnit {
        id
        name
      }
      productNumber
      barcode
      keywords
      manufacturer
      market
      sorte
      image
      images
      allergies {
        id
        translate(language: EN) # Assuming 'EN' is a valid language code
      }
      showInNewProducts
      showInPopularProducts
      unitPrice
      price
      singularPrice
      minPrice
      singularMinPrice
      tax
      threshold
      quantity
      orderedQuantity
      isExist
      needsAuth
      isPublic
      hasSingular
      wrapping {
        id
        name
      }
      singularWrapping {
        id
        name
      }
      recommendProducts {
        id
        title
      }
      hasExpiryDate
      quantityDetails {
        qte
        end
      }
      offers {
        id
        specialCode
        product {
          id
          title
        }
        vendor {
          id
        }
        offerPrivacy
        offerType
        offerMode
        sourceWrapping
        targetWrapping
        minQuantity
        offerValue
        startDate
        endDate
      }
      prices {
        id
      }
    }
  }
`;
