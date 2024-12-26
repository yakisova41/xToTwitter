import { Messages } from "../i18n";

/**
 * プロフィールのタブのツイート
 */
export function profileTweets(messages: Messages) {
  const tweets = messages.bab1f8b0;

  const profileTabPost = document.querySelector(
    'div[role="tablist"] > div[role="presentation"]:nth-child(1) > a > div > div > span'
  );

  const isProfilePage =
    document.querySelector('div[data-testid="UserProfileHeader_Items"]') !==
    null;

  if (
    profileTabPost !== null &&
    profileTabPost.textContent !== tweets &&
    isProfilePage
  ) {
    setTimeout(() => {
      if (
        document.querySelector(
          `script[data-testid="UserProfileSchema-test"]`
        ) !== null
      ) {
        profileTabPost.textContent = tweets;
      }
    });
  }
}
