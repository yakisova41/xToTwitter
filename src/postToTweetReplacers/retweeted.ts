import { Messages } from "../i18n";
import { log } from "../log";

/**
 * リポストしました
 */
export function retweeted(messages: Messages) {
  const retweetedMessage = messages.h99e9c95;

  if (retweetedMessage === null) {
    throw log(new Error("Can't get Retweeted's i18n!"));
  }

  const retweeted = retweetedMessage.split('"')[3];

  const retweetedSpans = document.querySelectorAll(
    `article span[data-testid="socialContext"]:not(.x-to-twitter-retweeted)`
  );

  retweetedSpans.forEach((retweetedSpan) => {
    retweetedSpan.classList.add("x-to-twitter-retweeted");
    if (retweetedSpan.childNodes[2] !== undefined) {
      retweetedSpan.childNodes[2].textContent = retweeted;
    }
  });
}
