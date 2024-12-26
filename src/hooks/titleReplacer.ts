import { ObserverHookHandler } from "../ObserverHooksControler";
import { log } from "../log";

export const titleReplacer: ObserverHookHandler = {
  selector: "head",
  callback: (head) => {
    const titleElem = head.querySelector("title");

    if (titleElem !== null) {
      if (titleElem.innerHTML === "X") {
        log("Title repalce", false);
        titleElem.innerHTML = "Twitter";
      } else {
        log("Title repalce", false);
        const split = titleElem.innerHTML.split("/");

        if (split[1] === " X") {
          split[1] = " Twitter";
          titleElem.innerHTML = split.join("/");
        }
      }
    }
  },
};
