import { gql } from "@apollo/client";

export const GetProduct = gql`
  query GetProduct($productId: ID!) {
    getProduct(productId: $productId) {
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
        # Assuming 'translate' field is a method and it needs a language parameter, 
        # which we are not providing here due to the validation error
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
        # Assuming 'translate' field is a method and it needs a language parameter,
        # which we are not providing here due to the validation error
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
      }
      prices {
        id
      }
    }
  }
`;
