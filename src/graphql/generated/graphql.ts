/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** 24-hour clock time value string in the format `hh:mm:ss` or `hh:mm:ss.sss`. */
  LocalTime: { input: any; output: any };
};

export type Address = {
  __typename?: "Address";
  id: Scalars["ID"]["output"];
  location?: Maybe<Location>;
  street?: Maybe<Scalars["String"]["output"]>;
  streetNumber?: Maybe<Scalars["String"]["output"]>;
};

export type Allergy = {
  __typename?: "Allergy";
  id: Scalars["ID"]["output"];
  translate?: Maybe<Scalars["String"]["output"]>;
};

export type AllergyTranslateArgs = {
  language?: InputMaybe<Language>;
};

export enum Category {
  Food = "FOOD",
  NonFood = "NON_FOOD",
}

export type Customer = {
  __typename?: "Customer";
  id: Scalars["ID"]["output"];
};

export type CustomerClass = {
  __typename?: "CustomerClass";
  generalDiscount?: Maybe<Scalars["Float"]["output"]>;
  id: Scalars["ID"]["output"];
  isGeneral?: Maybe<Scalars["Boolean"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
};

/** ********************************* enum ********************************* */
export enum Day {
  Fri = "FRI",
  Mon = "MON",
  Sat = "SAT",
  Sun = "SUN",
  Thu = "THU",
  Tue = "TUE",
  Wed = "WED",
}

export type DeliveryLocation = {
  __typename?: "DeliveryLocation";
  deliveryPrice?: Maybe<Scalars["Float"]["output"]>;
  isArchived?: Maybe<Scalars["Boolean"]["output"]>;
  location?: Maybe<Location>;
  openTimes?: Maybe<Array<Maybe<OpenTime>>>;
};

export enum DiscountType {
  Money = "MONEY",
  Percentage = "PERCENTAGE",
}

export type EvaluationVendor = {
  __typename?: "EvaluationVendor";
  comment?: Maybe<Scalars["String"]["output"]>;
  rating?: Maybe<Scalars["Int"]["output"]>;
};

export type Individual = {
  __typename?: "Individual";
  customer?: Maybe<Customer>;
  customerClass?: Maybe<CustomerClass>;
  customerNumber?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  isNew?: Maybe<Scalars["Boolean"]["output"]>;
  requestStatus?: Maybe<RequestStatus>;
  specialCode?: Maybe<Scalars["String"]["output"]>;
};

export enum Language {
  De = "DE",
  En = "EN",
  Es = "ES",
  Fr = "FR",
  It = "IT",
  Ne = "NE",
  Sw = "SW",
  Tr = "TR",
}

/** ********************************* type ********************************* */
export type Location = {
  __typename?: "Location";
  addresses?: Maybe<Array<Maybe<Address>>>;
  city?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  latitude?: Maybe<Scalars["Float"]["output"]>;
  longitude?: Maybe<Scalars["Float"]["output"]>;
  postalCode?: Maybe<Scalars["String"]["output"]>;
  state?: Maybe<Scalars["String"]["output"]>;
};

/** ****** Mutation ****** */
export type Mutation = {
  __typename?: "Mutation";
  /** ****** Product ****** */
  addProduct?: Maybe<Product>;
  /** updateProduct(productId : ID!) : Product */
  archiveProduct?: Maybe<Scalars["Boolean"]["output"]>;
  deleteProduct?: Maybe<Scalars["Boolean"]["output"]>;
  login: Scalars["String"]["output"];
  logout?: Maybe<Scalars["Boolean"]["output"]>;
  /** ****** User ****** */
  signUp?: Maybe<Scalars["Boolean"]["output"]>;
  toggleNewProduct?: Maybe<Scalars["Boolean"]["output"]>;
  togglePopularProduct?: Maybe<Scalars["Boolean"]["output"]>;
  updateProductQuantity?: Maybe<Scalars["Boolean"]["output"]>;
};

/** ****** Mutation ****** */
export type MutationAddProductArgs = {
  product?: InputMaybe<ProductInput>;
};

/** ****** Mutation ****** */
export type MutationArchiveProductArgs = {
  productId: Scalars["ID"]["input"];
};

/** ****** Mutation ****** */
export type MutationDeleteProductArgs = {
  productId: Scalars["ID"]["input"];
};

/** ****** Mutation ****** */
export type MutationLoginArgs = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

/** ****** Mutation ****** */
export type MutationSignUpArgs = {
  vendor?: InputMaybe<VendorInput>;
};

/** ****** Mutation ****** */
export type MutationToggleNewProductArgs = {
  productId: Scalars["ID"]["input"];
};

/** ****** Mutation ****** */
export type MutationTogglePopularProductArgs = {
  productId: Scalars["ID"]["input"];
};

/** ****** Mutation ****** */
export type MutationUpdateProductQuantityArgs = {
  productId: Scalars["ID"]["input"];
  quantity: Scalars["Int"]["input"];
};

export type Offer = {
  __typename?: "Offer";
  endDate?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  minQuantity?: Maybe<Scalars["Int"]["output"]>;
  offerMode?: Maybe<OfferMode>;
  offerPrivacy?: Maybe<OfferPrivacy>;
  /** maybe not needed */
  offerType?: Maybe<OfferType>;
  offerValue?: Maybe<Scalars["Float"]["output"]>;
  product?: Maybe<Product>;
  sourceProducts?: Maybe<Array<Maybe<SourceProduct>>>;
  sourceWrapping?: Maybe<Wrapping>;
  specialCode?: Maybe<Scalars["String"]["output"]>;
  startDate?: Maybe<Scalars["String"]["output"]>;
  targetWrapping?: Maybe<Wrapping>;
  vendor?: Maybe<Vendor>;
};

export enum OfferMode {
  Discount = "DISCOUNT",
  /** value = 1.5 ==> new_price = old_price – 1.5 */
  Percentage = "PERCENTAGE",
  /** value = 2 ==> new_price -= 2% */
  Piece = "PIECE",
}

export enum OfferPrivacy {
  /** shown in top offers in store & maybe in startseite comes from campaing (multiple offers together) */
  All = "ALL",
  /** not shown in any screen (sent by story & chat) applies for all individuals */
  Class = "CLASS",
  Highlight = "HIGHLIGHT",
  /** not shown in any screen (sent by story & chat) used for general discount classes & article group classes */
  Individual = "INDIVIDUAL",
}

export enum OfferType {
  General = "GENERAL",
  Group = "GROUP",
  Quantity = "QUANTITY",
}

export type OpenTime = {
  __typename?: "OpenTime";
  day?: Maybe<Day>;
  end?: Maybe<Scalars["LocalTime"]["output"]>;
  start?: Maybe<Scalars["LocalTime"]["output"]>;
};

export enum PaymentMethodAll {
  ApplePay = "APPLE_PAY",
  Bank = "BANK",
  Cash = "CASH",
  GooglePay = "GOOGLE_PAY",
  Master = "MASTER",
  Paypal = "PAYPAL",
  Visa = "VISA",
}

export type PriceClassInput = {
  customerClassId: Scalars["ID"]["input"];
  discountType?: InputMaybe<DiscountType>;
  discountValue?: InputMaybe<Scalars["Float"]["input"]>;
};

/**
 * input OfferInput{
 *     title : String!
 * }
 */
export type PriceIndividualInput = {
  customerId: Scalars["ID"]["input"];
  discountType?: InputMaybe<DiscountType>;
  discountValue?: InputMaybe<Scalars["Float"]["input"]>;
};

export type Product = {
  __typename?: "Product";
  allergies?: Maybe<Array<Maybe<Allergy>>>;
  barcode?: Maybe<Scalars["String"]["output"]>;
  description?: Maybe<Scalars["String"]["output"]>;
  hasPlural?: Maybe<Scalars["Boolean"]["output"]>;
  id: Scalars["ID"]["output"];
  image?: Maybe<Scalars["String"]["output"]>;
  images?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  keywords?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  manufacturer?: Maybe<Scalars["String"]["output"]>;
  market?: Maybe<Scalars["String"]["output"]>;
  offers?: Maybe<Array<Maybe<Offer>>>;
  orderedQuantity?: Maybe<Scalars["Int"]["output"]>;
  pluralTitle?: Maybe<Scalars["String"]["output"]>;
  pluralWrapping?: Maybe<ProductWrapping>;
  productCategory?: Maybe<ProductCategory>;
  productNumber?: Maybe<Scalars["String"]["output"]>;
  productUnit?: Maybe<ProductUnit>;
  quantity?: Maybe<Scalars["Int"]["output"]>;
  specialCode?: Maybe<Scalars["String"]["output"]>;
  tax?: Maybe<Scalars["Float"]["output"]>;
  title?: Maybe<Scalars["String"]["output"]>;
  unitPrice?: Maybe<Scalars["Float"]["output"]>;
  /** if true ==> see pluralTitle &  myPluralPrice & pluralWrapping */
  wrapping?: Maybe<ProductWrapping>;
};

export type ProductCategory = {
  __typename?: "ProductCategory";
  count?: Maybe<Scalars["Int"]["output"]>;
  icon?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  isFood: Scalars["Boolean"]["output"];
  translate?: Maybe<Scalars["String"]["output"]>;
};

export type ProductCategoryTranslateArgs = {
  language?: InputMaybe<Language>;
};

export enum ProductFilter {
  All = "ALL",
  /** quantity = 0 */
  Archive = "ARCHIVE",
  /** 0 < quantity <= threshold */
  Outstock = "OUTSTOCK",
  Restock = "RESTOCK",
}

export type ProductInput = {
  allergyIds?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  barcode?: InputMaybe<Scalars["String"]["input"]>;
  classPrices?: InputMaybe<Array<InputMaybe<PriceClassInput>>>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  hasPlural?: InputMaybe<Scalars["Boolean"]["input"]>;
  image?: InputMaybe<Scalars["String"]["input"]>;
  individualPrices?: InputMaybe<Array<InputMaybe<PriceIndividualInput>>>;
  keywords?: InputMaybe<Array<Scalars["String"]["input"]>>;
  manufacturer?: InputMaybe<Scalars["String"]["input"]>;
  market?: InputMaybe<Scalars["String"]["input"]>;
  needsAuth?: InputMaybe<Scalars["Boolean"]["input"]>;
  pluralPrice?: InputMaybe<Scalars["Float"]["input"]>;
  pluralWrappingId?: InputMaybe<Scalars["Int"]["input"]>;
  price?: InputMaybe<Scalars["Float"]["input"]>;
  productCategoryId: Scalars["Int"]["input"];
  productNumber?: InputMaybe<Scalars["String"]["input"]>;
  productUnitId: Scalars["Int"]["input"];
  publicPrice?: InputMaybe<Scalars["Boolean"]["input"]>;
  quantity?: InputMaybe<Scalars["Int"]["input"]>;
  recommendProductIds?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  showAsNewProduct?: InputMaybe<Scalars["Boolean"]["input"]>;
  showAsPopularProduct?: InputMaybe<Scalars["Boolean"]["input"]>;
  singularFormula?: InputMaybe<Scalars["Float"]["input"]>;
  sorte?: InputMaybe<Scalars["String"]["input"]>;
  tax?: InputMaybe<Scalars["Float"]["input"]>;
  threshold: Scalars["Int"]["input"];
  title: Scalars["String"]["input"];
  unitPrice?: InputMaybe<Scalars["Float"]["input"]>;
  wrappingId?: InputMaybe<Scalars["Int"]["input"]>;
};

export enum ProductSort {
  MostSoldAsc = "MOST_SOLD_ASC",
  MostSoldDesc = "MOST_SOLD_DESC",
}

export type ProductUnit = {
  __typename?: "ProductUnit";
  id: Scalars["ID"]["output"];
  name?: Maybe<Scalars["String"]["output"]>;
};

export type ProductWrapping = {
  __typename?: "ProductWrapping";
  id: Scalars["ID"]["output"];
  name?: Maybe<Scalars["String"]["output"]>;
};

/** ****** Query ****** */
export type Query = {
  __typename?: "Query";
  getAllergies?: Maybe<Array<Maybe<Allergy>>>;
  getCustomerClasses?: Maybe<Array<Maybe<CustomerClass>>>;
  /** ****** Customer ****** */
  getIndividuals?: Maybe<Array<Maybe<Individual>>>;
  getNewProducts?: Maybe<Array<Maybe<Product>>>;
  getPopularProducts?: Maybe<Array<Maybe<Product>>>;
  getProduct?: Maybe<Product>;
  /** ****** Product ****** */
  getProductCategories?: Maybe<Array<Maybe<ProductCategory>>>;
  getProductUnits?: Maybe<Array<Maybe<ProductUnit>>>;
  getProducts?: Maybe<Array<Maybe<Product>>>;
  /** ****** Metadata ****** */
  getVendorCategories?: Maybe<Array<Maybe<VendorCategory>>>;
  /** ****** User ****** */
  getVendorInfo?: Maybe<Vendor>;
  getWrappings?: Maybe<Array<Maybe<ProductWrapping>>>;
};

/** ****** Query ****** */
export type QueryGetNewProductsArgs = {
  pageNo?: InputMaybe<Scalars["Int"]["input"]>;
  pageSize?: InputMaybe<Scalars["Int"]["input"]>;
};

/** ****** Query ****** */
export type QueryGetPopularProductsArgs = {
  pageNo?: InputMaybe<Scalars["Int"]["input"]>;
  pageSize?: InputMaybe<Scalars["Int"]["input"]>;
};

/** ****** Query ****** */
export type QueryGetProductArgs = {
  productId: Scalars["ID"]["input"];
};

/** ****** Query ****** */
export type QueryGetProductsArgs = {
  category: Category;
  filterBy?: InputMaybe<ProductFilter>;
  pageNo?: InputMaybe<Scalars["Int"]["input"]>;
  pageSize?: InputMaybe<Scalars["Int"]["input"]>;
  searchWord?: InputMaybe<Scalars["String"]["input"]>;
  sortBy?: InputMaybe<ProductSort>;
  subCategoryId?: InputMaybe<Scalars["Int"]["input"]>;
};

export enum RefundHandling {
  /** CASH || ONLINE */
  Coupon = "COUPON",
  Money = "MONEY",
}

export enum RequestStatus {
  Accepted = "ACCEPTED",
  Rejected = "REJECTED",
  Waiting = "WAITING",
}

export type SourceProduct = {
  __typename?: "SourceProduct";
  product?: Maybe<Product>;
  quantity?: Maybe<Scalars["Int"]["output"]>;
};

export type Vendor = {
  __typename?: "Vendor";
  address?: Maybe<Address>;
  canDeliver?: Maybe<Scalars["Boolean"]["output"]>;
  canPickup?: Maybe<Scalars["Boolean"]["output"]>;
  deliveryLocations?: Maybe<Array<Maybe<DeliveryLocation>>>;
  deliveryPrice?: Maybe<Scalars["Float"]["output"]>;
  description?: Maybe<Scalars["String"]["output"]>;
  email?: Maybe<Scalars["String"]["output"]>;
  evaluations?: Maybe<Array<Maybe<EvaluationVendor>>>;
  id: Scalars["ID"]["output"];
  image?: Maybe<Scalars["String"]["output"]>;
  isOnline?: Maybe<Scalars["Boolean"]["output"]>;
  logo?: Maybe<Scalars["String"]["output"]>;
  minOrderLimit?: Maybe<Scalars["Int"]["output"]>;
  openTimes?: Maybe<Array<Maybe<OpenTime>>>;
  phone?: Maybe<Scalars["String"]["output"]>;
  ratingNumber?: Maybe<Scalars["Int"]["output"]>;
  ratingValue?: Maybe<Scalars["Float"]["output"]>;
  specialCode?: Maybe<Scalars["String"]["output"]>;
  stripeLink?: Maybe<Scalars["String"]["output"]>;
  title?: Maybe<Scalars["String"]["output"]>;
  todayOpenTime?: Maybe<Scalars["String"]["output"]>;
  vendorCategory?: Maybe<VendorCategory>;
  vendorType?: Maybe<VendorType>;
  website?: Maybe<Scalars["String"]["output"]>;
};

export type VendorCategory = {
  __typename?: "VendorCategory";
  icon?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  image?: Maybe<Scalars["String"]["output"]>;
};

/** ********************************* input ********************************* */
export type VendorInput = {
  avgPrepareDuration?: InputMaybe<Scalars["Int"]["input"]>;
  canDeliver?: InputMaybe<Scalars["Boolean"]["input"]>;
  canPickup?: InputMaybe<Scalars["Boolean"]["input"]>;
  canTrustDrivers?: InputMaybe<Scalars["Boolean"]["input"]>;
  city: Scalars["String"]["input"];
  deliveryPrice?: InputMaybe<Scalars["Float"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  email: Scalars["String"]["input"];
  firstName: Scalars["String"]["input"];
  firstOrderDiscountType?: InputMaybe<DiscountType>;
  firstOrderDiscountValue?: InputMaybe<Scalars["Float"]["input"]>;
  hasLoans?: InputMaybe<Scalars["Boolean"]["input"]>;
  image?: InputMaybe<Scalars["String"]["input"]>;
  lastName: Scalars["String"]["input"];
  logo?: InputMaybe<Scalars["String"]["input"]>;
  maxOrderDuration?: InputMaybe<Scalars["Int"]["input"]>;
  minGiftTotal?: InputMaybe<Scalars["Float"]["input"]>;
  minOrderLimit?: InputMaybe<Scalars["Float"]["input"]>;
  minPickupHours?: InputMaybe<Scalars["Float"]["input"]>;
  needsAuth: Scalars["Boolean"]["input"];
  onlineDiscountType?: InputMaybe<DiscountType>;
  onlineDiscountValue?: InputMaybe<Scalars["Float"]["input"]>;
  password: Scalars["String"]["input"];
  paymentMethods?: InputMaybe<Array<InputMaybe<PaymentMethodAll>>>;
  phone?: InputMaybe<Scalars["String"]["input"]>;
  postalCode: Scalars["String"]["input"];
  publicPrices: Scalars["Boolean"]["input"];
  radius?: InputMaybe<Scalars["Int"]["input"]>;
  refundHandling?: InputMaybe<RefundHandling>;
  state: Scalars["String"]["input"];
  street: Scalars["String"]["input"];
  streetNumber: Scalars["String"]["input"];
  title: Scalars["String"]["input"];
  vendorCategoryId: Scalars["Int"]["input"];
  visibleAllowed?: InputMaybe<Scalars["Int"]["input"]>;
  visibleExpiry?: InputMaybe<Scalars["Int"]["input"]>;
  website?: InputMaybe<Scalars["String"]["input"]>;
};

export enum VendorType {
  Multi = "MULTI",
  Single = "SINGLE",
}

export enum Wrapping {
  Normal = "NORMAL",
  Plural = "PLURAL",
}
