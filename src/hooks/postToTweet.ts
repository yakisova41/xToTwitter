import { ObserverHookHandler } from "../ObserverHooksControler";
import { Langs, i18n } from "../i18n";
import { header } from "../postToTweetReplacers/header";
import { profileTweets } from "../postToTweetReplacers/profileTweets";
import { quoteCounter } from "../postToTweetReplacers/quoteCounter";
import { replyDraftEditorPlaceholder } from "../postToTweetReplacers/replyDraftEditorPlaceholder";
import { retweetBtn } from "../postToTweetReplacers/retweetBtn";
import { retweetCounter } from "../postToTweetReplacers/retweetCounter";
import { retweeted } from "../postToTweetReplacers/retweeted";
import { retweetedByPopup } from "../postToTweetReplacers/retweetedByPopup";
import { sideNavNewTweetButton } from "../postToTweetReplacers/sideNavNewTweetButton";
import { topCountTweets } from "../postToTweetReplacers/topCountTweets";
import { tweetButton } from "../postToTweetReplacers/tweetButton";
import { tweetButtonInline } from "../postToTweetReplacers/tweetButtonInline";
import { tweetedPill } from "../postToTweetReplacers/tweetedPill";

export const postToTweet: ObserverHookHandler = {
  selector: "body",
  callback: (_body) => {
    const language = getLang();

    const messages = i18n[language];

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
  },
};

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
