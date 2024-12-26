import { Messages } from "../i18n";

/**
 * Small button to tweet.
 */
export function tweetButtonInline(messages: Messages) {
  const tweetButton = document.querySelector(
    'button[data-testid="tweetButtonInline"] > div > span > span'
  );

  const toTweet =
    messages.bea869b3 !== null ? messages.bea869b3 : messages.bea869b4;

  const reply =
    messages.hdf72269 !== null ? messages.hdf72269 : messages.d17df548;

  if (tweetButton !== null) {
    if (location.pathname === "/home") {
      if (tweetButton.textContent !== toTweet) {
        tweetButton.textContent = toTweet;
      }
    } else {
      if (tweetButton.textContent !== reply) {
        tweetButton.textContent = reply;
      }
    }
  }
}
