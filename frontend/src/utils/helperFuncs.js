export function isValidTweetUrl(tweetUrl) {
  const tweetUrlRegex = /^https?:\/\/twitter\.com\/\w+\/status\/(\d+)$/;
  return tweetUrlRegex.test(tweetUrl);
}

export function getIdFromUrl(url) {
  const tweetIdRegex = /\/status\/(\d+)/;
  const tweetId = url.match(tweetIdRegex)[1];
  return tweetId;
}
