import { Messages } from "../i18n";

/**
 * Tweet button in sidemenu.
 */
export function sideNavNewTweetButton(messages: Messages) {
  const tweetButton = document.querySelector(
    'a[data-testid="SideNav_NewTweet_Button"] > div > span > div > div > span > span'
  );

  const toTweet =
    messages.bea869b3 !== null ? messages.bea869b3 : messages.bea869b4;

  if (tweetButton !== null) {
    if (tweetButton.textContent !== null) {
      if (tweetButton.textContent !== toTweet) {
        tweetButton.textContent = toTweet;
      }
    } else {
      tweetButton.textContent = toTweet;
    }
  }
}
