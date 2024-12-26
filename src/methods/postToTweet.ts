import { Langs, i18n } from "../i18n";
import { quoteCounter } from "../postToTweetReplacers/quoteCounter";
import { replyDraftEditorPlaceholder } from "../postToTweetReplacers/replyDraftEditorPlaceholder";
import { retweetBtn } from "../postToTweetReplacers/retweetBtn";
import { retweetCounter } from "../postToTweetReplacers/retweetCounter";
import { tweetButton } from "../postToTweetReplacers/tweetButton";
import { tweetButtonInline } from "../postToTweetReplacers/tweetButtonInline";
import { sideNavNewTweetButton } from "../postToTweetReplacers/sideNavNewTweetButton";
import { topCountTweets } from "../postToTweetReplacers/topCountTweets";
import { header } from "../postToTweetReplacers/header";
import { retweetedByPopup } from "../postToTweetReplacers/retweetedByPopup";
import { retweeted } from "../postToTweetReplacers/retweeted";
import { tweetedPill } from "../postToTweetReplacers/tweetedPill";
import { profileTweets } from "../postToTweetReplacers/profileTweets";

/**
 * Get current language from cookie.
 * @returns
 */
function getLang(): Langs {
  const cookie = document.cookie;
  const cookieLang = cookie
    .split(";")
    .map((s) => s.split("="))
    .filter(([key, _value]) => {
      return key === " lang";
    })[0][1] as Langs & ("zh-cn" | "zh-tw" | "en-gb");

  if (Object.keys(i18n).includes(cookieLang)) {
    return cookieLang;
  } else if (cookieLang === "zh-cn") {
    return "zh";
  } else if (cookieLang === "zh-tw") {
    return "zh-Hant";
  } else if (cookieLang === "en-gb") {
    return "en-GB";
  } else {
    return "en";
  }
}

/**
 * Change Post to Tweet
 */
export function postToTweet() {
  const language = getLang();

  const messages = i18n[language];

  const ob = new MutationObserver(() => {
    sideNavNewTweetButton(messages);
    tweetButtonInline(messages);
    tweetButton(messages);
    replyDraftEditorPlaceholder(messages);
    retweetBtn(messages);
    retweetCounter(messages);
    header(messages);
    retweeted(messages);
    retweetedByPopup(messages);
    tweetedPill(messages);
    profileTweets(messages);
    quoteCounter(messages);
    topCountTweets(messages);
  });

  ob.observe(document.body, {
    subtree: true,
    childList: true,
  });
}
