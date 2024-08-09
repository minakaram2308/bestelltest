import { gql } from "@apollo/client";

export const GET_VENDOR_CATEGORIES = gql`
query GetVendorCategories {
  getVendorCategories {
    id
    icon
    image
  
  }
}

`;
