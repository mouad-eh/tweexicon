import axios from "axios";
import Cookies from "js-cookie";
import { JWT_COOKIE } from "./constants";

export async function fetchCategories() {
    const res = await axios.get(process.env.REACT_APP_CATEGORIES_ENDPOINT,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get(JWT_COOKIE)}`
            }
        })
    return res.data;
}

export async function fetchPosts(category, params) {
    // from axios documentation
    // NOTE: params that are null or undefined are not rendered in the URL.
    // so if we don't need to specify, we either call the function without passing params
    // or we pass null/undefined
    let url = process.env.REACT_APP_POSTS_ENDPOINT;
    if (category !== "all") {
        url = `${url}/${category}`
    }
    const res = await axios.get(url,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get(JWT_COOKIE)}`
            },
            params: params // {cursor,limit,dir}
        })
    return res.data;
}


export async function fetchPostsHtml(posts) {
    const postsHtml = await Promise.all(
        posts.map(async (post) => {
            const url = encodeURIComponent(`https://publish.twitter.com/oembed?url=${post.url}&maxwidth=350&omit_script=t`);
            const response = await axios.get(`${process.env.REACT_APP_PROXY_ENDPOINT}?url=${url}`,
                { headers: { "Content-Type": "application/json", } }
            )
            return response.data.html;
        })
    )
    return postsHtml;
}
export async function addCategory({ name, color }) {
    const res = await axios.post(process.env.REACT_APP_CATEGORIES_ENDPOINT,
        { name, color },
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get(JWT_COOKIE)}`
            },
        }
    )
    return res;
}
export async function deleteCategory(category) {
    const res = await axios.delete(`${process.env.REACT_APP_CATEGORIES_ENDPOINT}/${category.name}`,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get(JWT_COOKIE)}`
            },
        })
    return res;
}
export async function fetchPostsCount(category) {
    let url = `${process.env.REACT_APP_POSTSCOUNT_ENDPOINT}`
    if (category !== "all") {
        url = `${url}/${category}`
    }
    const res = await axios.get(url,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get(JWT_COOKIE)}`
            },
        })
    return res.data.count;
}