import { Messages } from "../i18n";
import { log } from "../log";

/**
 * Retweet counter
 */
export function retweetCounter(messages: Messages) {
  const counterLinks = document.querySelectorAll<HTMLAnchorElement>(
    "article > div > div > div:nth-child(3) > div:nth-child(5) > div > a"
  );

  let splitRetweets: string[] | null = null;
  if (messages.hb7b0cea !== null) {
    splitRetweets = messages.hb7b0cea.split('"');
  } else if (messages.hb7b0ceb !== null) {
    splitRetweets = messages.hb7b0ceb.split('"');
  }

  if (splitRetweets === null) {
    throw log(new Error("Can't get retweet's language messages!"));
  }

  const retweet =
    splitRetweets[1].trim() +
    (splitRetweets[5] !== undefined ? splitRetweets[5] : "");

  counterLinks.forEach((counterLink) => {
    const hrefSplit = counterLink.href.split("/");
    if (hrefSplit[4] === "retweets" && hrefSplit[5] === undefined) {
      const counter = counterLink.querySelector("a > span > span");
      if (counter !== null) {
        if (counter.textContent !== retweet) {
          counter.textContent = retweet;
        }
      }
    }
  });
}
