// "use client";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";
import { toast } from "react-hot-toast";
import { LOGIN_MUTATION } from "@/graphql";

export const useLogin = () => {
  const [loginMutation] = useMutation(LOGIN_MUTATION);
  const router = useRouter();
  const { set: setCookie, remove: deleteCookie } = useCookies();

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const { data, errors } = await loginMutation({
        variables: { email, password },
      });
      if (!errors && data) {
        const token = data.login;
        setCookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          path: "/",
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
        });

        toast.success("Login successful!");
        router.push("/dashboard");
        return { data, errors };
      }
    } catch (error) {
      toast.error(`${error?.message}`);
    }
  };

  const logout = () => {
    deleteCookie("token", {
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    // toast.success("Logout successful!");
    router.push("/auth");
  };

  return { login, logout };
};
