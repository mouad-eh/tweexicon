import Cookies from "js-cookie";
import { JWT_COOKIE } from "./constants";

export function isAuthenticated() {
    const userToken = Cookies.get(JWT_COOKIE);
    return !(!userToken || userToken === 'undefined');
}

export function isValidTweetUrl(tweetUrl) {
    const tweetUrlRegex = /^https?:\/\/twitter\.com\/\w+\/status\/(\d+)$/;
    return tweetUrlRegex.test(tweetUrl);
}