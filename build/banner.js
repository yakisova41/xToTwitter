import manifestJ from "../extension/manifest.json" assert { type: "json" };

export function banner(debug) {
  return [
    "// ==UserScript==",
    "// @name         X to Twitter",
    "// @name:ja  X to Twitter",
    "// @description  Get our Twitter back from Elon.",
    "// @namespace    https://xtotwitter.yakisova.com",
    `// @version      ${manifestJ.version}`,
    "// @author       yakisova41",
    "// @match        https://twitter.com/*",
    "// @match        https://x.com/home",
    "// @match        https://x.com/explore",
    "// @match        https://x.com/notifications",
    "// @match        https://x.com/messages",
    "// @match        https://x.com/search",
    "// @match        https://x.com/*",
    "// @icon         https://www.google.com/s2/favicons?sz=64&domain=twitter.com",
    "// @grant        unsafeWindow",
    "// @run-at       document-start",
    "// @license      MIT",
    "// @description:ja  イーロンから私達のTwitterを取り戻します",
    "// ==/UserScript==",
    "",
    `const DEBUG = ${String(debug)};`,
    "",
  ].join("\n");
}
