import { Messages } from "../i18n";
import { log } from "../log";

/**
 * 上から出てくるやつ
 * "さんがツイートしました"
 */
export function tweetedPill(messages: Messages) {
  const tweetedMessage = messages.d91695cb;

  if (tweetedMessage === null) {
    throw log(new Error("Can't get tweeted's message"));
  }

  const tweeted = tweetedMessage
    .replaceAll("）", ")")
    .split(")")[1]
    .split(":")[0];

  const pill = document.querySelector(
    `div[data-testid="pillLabel"] > span > span > span`
  );
  if (pill !== null && pill.textContent !== tweeted) {
    pill.textContent = tweeted;
  }
}
