import axios from 'axios';
import {
  CATEGORIES_ENDPOINT, HOME_PATH, POSTSCOUNT_ENDPOINT, POSTS_ENDPOINT, PROXY_ENDPOINT, SIGNIN_ENDPOINT, SIGNUP_ENDPOINT,
} from './constants';
import { getAuthToken, setAuthToken } from './auth';

export async function signUp(firstName, lastName, email, password, navigate, setDuplicateEmail) {
  try {
    const response = await axios.post(
      SIGNUP_ENDPOINT,
      {
        firstName, lastName, email, password,
      },
      { headers: { 'Content-Type': 'application/json' } },
    );
    setAuthToken(response.data.jwt);
    // redirection to the home page
    navigate(HOME_PATH);
  } catch (err) {
    setDuplicateEmail(true);
  }
}

export async function signIn(email, password, navigate, setIncorrectEmail, setIncorrectPassword) {
  try {
    const response = await axios.post(
      SIGNIN_ENDPOINT,
      { email, password },
      { headers: { 'Content-Type': 'application/json' } },
    );
    setAuthToken(response.data.jwt);
    // redirection to the home page
    navigate(HOME_PATH);
  } catch (err) {
    const { error } = err.response.data;
    if (error.code === 450) {
      setIncorrectEmail(true);
    } else { // error.code == 451
      setIncorrectPassword(true);
    }
  }
}

export async function fetchCategories() {
  // handle user logout from another tab
  // if user logout from another tab, somehow many fetching action are triggered
  // and fetchCategories is one of them
  let res;
  try {
    res = await axios.get(
      CATEGORIES_ENDPOINT,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getAuthToken()}`,
        },
      },
    );
  } catch (error) {
    if (error.response.data.error.name === 'JsonWebTokenError') {
      // sending a request with Authorization header = 'Bearer undefined' is the reason behind this error
      // a redirection is made to the root route and the rest is handled by AlreadyLoggedIn component
      window.location = '/';
    }
  }
  return res.data;
}

export async function fetchPosts(category, params) {
  // from axios documentation
  // NOTE: params that are null or undefined are not rendered in the URL.
  // so if we don't need to specify, we either call the function without passing params
  // or we pass null/undefined
  let url = POSTS_ENDPOINT;
  if (category !== 'all') {
    url = `${url}/${category}`;
  }
  const res = await axios.get(
    url,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAuthToken()}`,
      },
      params, // {cursor,limit,dir}
    },
  );
  return res.data;
}

// there is no need for this function as we are fetching tweets dynamically using factory function
// the reason is still kept in the codebase is that it might be helpful if we want to implement full text search later
export async function fetchPostsHtml(posts) {
  const postsHtml = await Promise.all(
    posts.map(async (post) => {
      const url = encodeURIComponent(`https://publish.twitter.com/oembed?url=${post.url}&maxwidth=350&omit_script=t`);
      let response;
      try {
        response = await axios.get(
          `${PROXY_ENDPOINT}?url=${url}`,
          { headers: { 'Content-Type': 'application/json' } },
        );
      } catch (error) {
        // the tweet has been deleted by the author
        // or the auther account was suspended or turned into a private account
        return `<div style='color: #a10e25;
                width: inherit;height: 200px;
                display:flex;justify-content:center;align-items:center;
                background-color: #ffe9e8;
                padding: 0 10px;
                margin-top: 10px;
                border: 1px solid #a10e25;border-radius: 10px;'>
                this tweet was deleted by the author!
                </div>`;
      }
      return response.data.html;
    }),
  );
  return postsHtml;
}
export async function addCategory({ name, color }) {
  const res = await axios.post(
    CATEGORIES_ENDPOINT,
    { name, color },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAuthToken()}`,
      },
    },
  );
  return res;
}
export async function deleteCategory(category) {
  const res = await axios.delete(
    `${CATEGORIES_ENDPOINT}/${category.name}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAuthToken()}`,
      },
    },
  );
  return res;
}
export async function fetchPostsCount(category) {
  let url = `${POSTSCOUNT_ENDPOINT}`;
  if (category !== 'all') {
    url = `${url}/${category}`;
  }
  const res = await axios.get(
    url,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAuthToken()}`,
      },
    },
  );
  return res.data.count;
}

export async function addPost(post) { // {url,category}
  const res = await axios.post(POSTS_ENDPOINT, post, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });
  return res.data;
}
