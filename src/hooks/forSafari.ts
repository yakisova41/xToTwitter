import { ObserverHookHandler } from "../ObserverHooksControler";
import { log } from "../log";
import { paths } from "../values";

export const forSafari: ObserverHookHandler = {
  selector: "body",
  callback: (_body) => {
    log("For safari");

    const pathElems = document.querySelectorAll(
      `path[d="${paths.xLogoPath}"]:not(.x-to-twitter):not(a[href="/i/verified-choose"] > div > div > svg > g > path, a[href="/i/verified-choose"] > div > svg > g > path), path[d="${paths.loadingXLogoPath}"]:not(.x-to-twitter)`
    );
    if (pathElems.length !== 0) {
      pathElems.forEach((path) => {
        path.setAttribute("d", paths.birdPath);
        path.classList.add("x-to-twitter");
      });
    }

    const verifiedElems = document.querySelectorAll(
      `a[href="/i/verified-choose"] > div > div > svg > g > path:not(.x-to-twitter-noncolor), a[href="/i/verified-choose"] > div > svg > g > path:not(.x-to-twitter-noncolor)`
    );
    if (verifiedElems.length !== 0) {
      verifiedElems.forEach((path) => {
        path.setAttribute("d", paths.verifiedPath);
        path.classList.add("x-to-twitter-noncolor");
      });
    }

    const homeicon = document.querySelector(
      `a[data-testid="AppTabBar_Home_Link"] > div > div > svg > g > path:not(.x-to-twitter-birdhome)`
    );
    if (homeicon !== null) {
      const d = homeicon.getAttribute("d");
      if (d === paths.homeActivePath) {
        homeicon.setAttribute("d", paths.oldHomeActivePath);
      }
      if (d === paths.homePath) {
        homeicon.setAttribute("d", paths.oldHomePath);
      }

      homeicon.classList.add("x-to-twitter-birdhome");
    }

    const loading = document.querySelector(
      'div[aria-label="Loading…"] > svg > g > path'
    );

    if (loading !== null) {
      loading.setAttribute("d", paths.birdPath);
    }
  },
};
