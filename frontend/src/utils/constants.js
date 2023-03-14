import { QueryClient } from "@tanstack/react-query";

export const SIGNIN_PATH = "/signin";
export const SIGNUP_PATH = "/signup";
export const HOME_PATH = "/home";
export const JWT_COOKIE = "jwt-authorization";
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
        },
    },
});