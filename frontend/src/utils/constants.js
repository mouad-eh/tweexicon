import { QueryClient } from "@tanstack/react-query";

// frontend routes
export const SIGNIN_PATH = "/signin";
export const SIGNUP_PATH = "/signup";
export const HOME_PATH = "/home";
// backend endpoints
export const SIGNUP_ENDPOINT = process.env.REACT_APP_API_BASEURL + "/signup"
export const SIGNIN_ENDPOINT = process.env.REACT_APP_API_BASEURL + "/signin"
export const CATEGORIES_ENDPOINT = process.env.REACT_APP_API_BASEURL + "/categories"
export const POSTS_ENDPOINT = process.env.REACT_APP_API_BASEURL + "/posts"
export const PROXY_ENDPOINT = process.env.REACT_APP_API_BASEURL + "/proxy"
export const POSTSCOUNT_ENDPOINT = process.env.REACT_APP_API_BASEURL + "/postscount"
// others
export const JWT_COOKIE = "jwt-authorization";
export const queryClient = new QueryClient();