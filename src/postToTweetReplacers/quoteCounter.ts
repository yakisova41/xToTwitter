import { Messages } from "../i18n";
import { log } from "../log";

export function quoteCounter(messages: Messages) {
  const counterLinks = document.querySelectorAll<HTMLAnchorElement>(
    "article > div > div > div:nth-child(3) > div:nth-child(5) > div > a"
  );

  let splitRetweets: string[] | null = null;
  if (messages.e2414184 !== null) {
    splitRetweets = messages.e2414184.split('"');
  } else if (messages.e2414185 !== null) {
    splitRetweets = messages.e2414185.split('"');
  }

  if (splitRetweets === null) {
    throw log(new Error("Can't get retweet's language messages!"));
  }

  const quote =
    splitRetweets[1].trim() +
    (splitRetweets[5] !== undefined ? splitRetweets[5] : "");

  counterLinks.forEach((counterLink) => {
    const hrefSplit = counterLink.href.split("/");
    if (hrefSplit[4] === "retweets" && hrefSplit[5] === "with_comments") {
      const counter = counterLink.querySelector("a > span > span");
      if (counter !== null) {
        if (counter.textContent !== quote) {
          counter.textContent = quote;
        }
      }
    }
  });
}
