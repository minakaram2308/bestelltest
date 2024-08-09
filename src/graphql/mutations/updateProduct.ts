import { gql } from "@apollo/client";

export const UPDATE_PRODUCT = gql`
mutation UpdateProduct($product: ProductInput!) {
  updateProduct(product: $product) {
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
      translate(language: $language)
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
      translate(language: $language)
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
      id
      name
    }
    offers {
      id
      name
    }
    prices {
      id
      name
      type
    }
  }
}

`;
