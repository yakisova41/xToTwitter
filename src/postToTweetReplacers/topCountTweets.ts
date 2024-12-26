import { Messages } from "../i18n";
import { log } from "../log";

/**
 * 上の「件のツイートを表示」
 */
export function topCountTweets(messages: Messages) {
  const showEPostsElem = document.querySelector(
    `div[data-testid="cellInnerDiv"] > div > button[role="button"] > div > div > span`
  );

  let splitShowEPosts: string[] | null = null;
  if (messages.d6917e0c !== null) {
    splitShowEPosts = messages.d6917e0c.split('"');
  } else if (messages.d6917e0d !== null) {
    splitShowEPosts = messages.d6917e0d.split('"');
  }

  if (splitShowEPosts === null) {
    throw log(new Error("Can't get retweet's language messages!"));
  }

  if (showEPostsElem !== null) {
    const parent =
      showEPostsElem?.parentElement?.parentElement?.parentElement?.parentElement
        ?.parentElement;
    if (parent !== null && parent !== undefined) {
      const key = Object.keys(parent).filter((key) => {
        return key.match(/^__reactProps\$/);
      })[0] as keyof typeof parent;

      const props: any = parent[key];

      if (props === null && props === undefined) {
        throw log(new Error("Props is not found"));
      }

      const count = props?.children?._owner?.memoizedProps?.item?.data?.content
        ?.count as string;

      if (count === null && count === undefined) {
        throw log(new Error("Count is not found"));
      }

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
}
