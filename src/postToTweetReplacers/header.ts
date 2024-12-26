import { Messages } from "../i18n";

export function header(messages: Messages) {
  const header = document.querySelector(
    `h2[dir="ltr"]:not(#modal-header) > span`
  );

  const toTweet =
    messages.bea869b3 !== null ? messages.bea869b3 : messages.bea869b4;

  const quoteTweet =
    messages.c9d7235d !== null ? messages.c9d7235d : messages.bd7c0390;

  const splitPath = location.pathname.split("/");

  if (header !== null) {
    if (splitPath[2] === "status" && splitPath[4] !== "photo") {
      if (splitPath[4] === "retweets" && splitPath[5] === "with_comments") {
        if (header.textContent !== quoteTweet) {
          header.textContent = quoteTweet;
        }
      } else {
        if (header.textContent !== toTweet) {
          header.textContent = toTweet;
        }
      }
    }
  }
}
