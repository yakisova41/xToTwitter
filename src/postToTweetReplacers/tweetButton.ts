import { Messages } from "../i18n";

/**
 * Tweet button
 * @param messages
 */
export function tweetButton(messages: Messages) {
  const tweetButton = document.querySelector(
    'button[data-testid="tweetButton"] > div > span > span'
  );

  const tweetAll = messages.f70a36d0;

  const toTweet =
    messages.bea869b3 !== null ? messages.bea869b3 : messages.bea869b4;

  const reply =
    messages.hdf72269 !== null ? messages.hdf72269 : messages.d17df548;

  if (tweetButton !== null) {
    const pathSplited = location.pathname.split("/");
    if (pathSplited[2] === "status" && pathSplited[4] === "photo") {
      /**
       * If in photo page, tweetbutton will be replay button.
       */
      if (tweetButton.textContent !== reply) {
        tweetButton.textContent = reply;
      }
    } else {
      const isTweetAll =
        document.querySelector('label[data-testid="tweetTextarea_1_label"]') !==
        null;

      if (isTweetAll) {
        if (tweetButton.textContent !== tweetAll) {
          tweetButton.textContent = tweetAll;
        }
      } else {
        if (tweetButton.textContent !== toTweet) {
          tweetButton.textContent = toTweet;
        }
      }
    }
  }
}
