import { colors, paths } from "../values";

/**
 * Add style to head
 */
export function styleInject(head: Element) {
  const style = document.createElement("style");

  const verifiedSelector = `a[href="/i/verified-choose"] > div > div > svg > g > path`;
  const verifiedSelectorMobile = `a[href="/i/verified-choose"] > div > svg > g > path`;
  const xLogoSelector = [
    `path[d="${paths.oshogatsuXlogoPath}"]:not(${verifiedSelector}):not(${verifiedSelectorMobile})`,
    `path[d="${paths.xLogoPath}"]:not(${verifiedSelector}):not(${verifiedSelectorMobile})`,
  ].join(",");
  const xLogoDarkmodeSelector = `div[style="text-overflow: unset; color: rgb(239, 243, 244);"] > svg > g > path:not(${verifiedSelector}):not(${verifiedSelectorMobile})`;
  const homeSelector =
    'a[data-testid="AppTabBar_Home_Link"] > div > div > svg > g > path';

  style.innerHTML = `
    .x-to-twitter {
        fill: inherit;
        color: ${colors.twitterColor};
    }

    ${xLogoSelector}, path[d="${paths.loadingXLogoPath}"] {
        d:path("${paths.birdPath}");
        fill: inherit;
        color: ${colors.twitterColor};
    }

    ${xLogoDarkmodeSelector} {
        color: rgb(239, 243, 244);
    }

    div[aria-label="Loading…"] > svg > g > path {
        d:path("${paths.birdPath}");
        fill: inherit;
        color: ${colors.loadingBirdColor};
    }

    ${verifiedSelector}, ${verifiedSelectorMobile} {
        d:path("${paths.verifiedPath}");
    }

    ${homeSelector}:not(path[d="${paths.homePath}"]) {
        d:path("${paths.oldHomeActivePath}");
    }

    ${homeSelector}:not(path[d="${paths.homeActivePath}"]) {
      d:path("${paths.oldHomePath}");
    }

    a[data-testid="SideNav_NewTweet_Button"], button[data-testid="tweetButtonInline"], button[data-testid="tweetButtonInline"], button[data-testid="tweetButton"] {
      background-color: var(--x-to-twitter-theme)!important;
    }

    a[data-testid="SideNav_NewTweet_Button"] div[dir="ltr"], a[data-testid="SideNav_NewTweet_Button"] > div[dir="ltr"] > svg,  button[data-testid="tweetButtonInline"] div[dir="ltr"], button[data-testid="tweetButtonInline"] div[dir="ltr"], button[data-testid="tweetButton"] div[dir="ltr"]  {
      color: rgb(255, 255, 255)!important;
    }
    `;
  head.appendChild(style);
}
