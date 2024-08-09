// "use client";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";
import { toast } from "react-hot-toast";
import { REGISTER_MUTATION } from "@/graphql/mutations";
import { MutationSignUpArgs } from "@/graphql/generated/graphql";

export const useRegister = () => {
  const [registerMutation] = useMutation(REGISTER_MUTATION);
  const router = useRouter();
  const { set: setCookie } = useCookies();

  const register = async ({ vendor }: { vendor: MutationSignUpArgs }) => {
    try {
      const response = await registerMutation({
        variables: { ...vendor },
      });
      const token = response.data.register;

      setCookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
      });

      toast.success("Registration successful!");
      router.push("/dashboard");
    } catch (err) {
      toast.error(`Registration failed : ${err?.message} `);
      console.error("Registration error:", err);
    }
  };

  return { register };
};
