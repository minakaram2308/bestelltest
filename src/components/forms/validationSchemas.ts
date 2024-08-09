import { z } from "zod";

export const loginRegisterFormSchema = {
  login: z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  }),
  register: z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    firstName: z.string().nonempty("First name is required"),
    lastName: z.string().nonempty("Last name is required"),
    vendorCategoryId: z
      .number()
      .positive("Vendor category ID must be a positive number"),
    title: z.string().nonempty("Title is required"),
    needsAuth: z.boolean(),
    state: z.string().nonempty("State is required"),
    city: z.string().nonempty("City is required"),
    street: z.string().nonempty("Street is required"),
    streetNumber: z.string().nonempty("Street number is required"),
    postalCode: z.string().nonempty("Postal code is required"),
    publicPrices: z.boolean(),
  }),
};

export const addProductSchema = {
  login: z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  }),
  register: z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    firstName: z.string().nonempty("First name is required"),
    lastName: z.string().nonempty("Last name is required"),
    vendorCategoryId: z
      .number()
      .positive("Vendor category ID must be a positive number"),
    title: z.string().nonempty("Title is required"),
    needsAuth: z.boolean(),
    state: z.string().nonempty("State is required"),
    city: z.string().nonempty("City is required"),
    street: z.string().nonempty("Street is required"),
    streetNumber: z.string().nonempty("Street number is required"),
    postalCode: z.string().nonempty("Postal code is required"),
    publicPrices: z.boolean(),
  }),
};


