import { enableAlert, log } from "./log";
import { ObserverHooksControler } from "./ObserverHooksControler";
import { faviconReplacer } from "./hooks/faviconReplacer";
import { styleInject } from "./methods/styleInject";
import { titleReplacer } from "./hooks/titleReplacer";
import { getThemeColor, setThemeColor } from "./methods/setColor";
import { replaceManifest } from "./methods/reaplceManifest";
import { forSafari } from "./hooks/forSafari";
import { postToTweet } from "./hooks/postToTweet";

declare var GM_info:
  | {
      userAgentData: {
        platform: string;
      };
      scriptHandler: string;
    }
  | undefined;

/**
 * Get running environment.
 * @returns
 */
function envChecker() {
  if (typeof GM_info !== "undefined") {
    log(GM_info);
    log(JSON.stringify(GM_info));

    if (GM_info.scriptHandler === "Userscripts") {
      return "userscript_ios";
    }
    if (GM_info.userAgentData.platform === "Windows") {
      return "userscript_windows";
    } else {
      return "userscript_not_windows";
    }
  } else {
    return "extension";
  }
}

/**
 * Run a callback in no time when a head element is found.
 * @param {*} callback
 */
function headFinder(callback: (head: HTMLHeadElement) => any) {
  const observer = new MutationObserver((_mutations, obs) => {
    const head = document.querySelector("head");
    if (head) {
      callback(head);
      obs.disconnect();
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
}

/**
 * headが見つかったときの処理
 */
function headFound(
  head: HTMLHeadElement,
  observerHooksControler: ObserverHooksControler,
  env:
    | "userscript_ios"
    | "userscript_windows"
    | "userscript_not_windows"
    | "extension"
) {
  log("Head found");

  observerHooksControler.startObserve("head", {
    childList: true,
  });

  observerHooksControler.startObserve("title", {
    childList: true,
  });

  observerHooksControler.startObserve("body", {
    subtree: true,
    childList: true,
  });

  // wait rendering
  setTimeout(() => {
    log("Post To Tweet");

    if (env !== "extension") {
      getThemeColor().then((colorRGB) => {
        setThemeColor(colorRGB, head);
      });
    }

    if (document.body !== null) {
      observerHooksControler.startObserve("body", {
        subtree: true,
        childList: true,
      });
    }
  }, 100);

  styleInject(head);
}

function main() {
  log("X to Twitter");

  const env = envChecker();
  log(`Env: ${env}`);

  const observerHooksControler = new ObserverHooksControler();
  observerHooksControler.addHookHandler(faviconReplacer);
  observerHooksControler.addHookHandler(titleReplacer);
  observerHooksControler.addHookHandler(forSafari);
  observerHooksControler.addHookHandler(postToTweet);

  if (env === "extension") {
    headFinder((head) => {
      log(head);
      headFound(head, observerHooksControler, env);
      replaceManifest(head);
    });
  } else if (env === "userscript_ios" || env === "userscript_not_windows") {
    enableAlert();
    log(document.head);
    headFound(document.head, observerHooksControler, env);
  } else if (env === "userscript_windows") {
    headFinder((head) => {
      log(head);
      headFound(head, observerHooksControler, env);
    });
  }
}

main();
