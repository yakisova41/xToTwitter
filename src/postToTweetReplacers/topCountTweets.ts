import { Messages } from "../i18n";
import { log } from "../log";

/**
 * 上の「件のツイートを表示」
 */
export function topCountTweets(messages: Messages) {
  const showEPostsElem = document.querySelector(
    `div[data-testid="cellInnerDiv"] > div > button[role="button"] > div > div > span`
  );

  const showEPostsMessages =
    messages.d6917e0c !== null ? messages.d6917e0c : messages.d6917e0d;

  if (showEPostsMessages === null) {
    throw log(new Error("showEPostsMessages not found"));
  }

  const splitShowEPosts = showEPostsMessages.split('"');

  if (showEPostsElem !== null) {
    const parent = showEPostsElem!.parentElement!.parentElement!.parentElement!
      .parentElement!.parentElement as any;

    if (parent === undefined || parent === null) {
      throw log(new Error("parent not found"));
    }

    const key = Object.keys(parent).filter((key) => {
      return key.match(/^__reactProps\$/);
    })[0] as keyof typeof parent;

    const count =
      parent[key]!.children!._owner!.memoizedProps!.item!.data!.content!.count;

    const showEPosts =
      count +
      " " +
      splitShowEPosts[1].trim() +
      (splitShowEPosts[5] !== undefined ? splitShowEPosts[5] : "");

    if (showEPostsElem.textContent !== showEPosts) {
      showEPostsElem.textContent = showEPosts;
    }
  }
}
