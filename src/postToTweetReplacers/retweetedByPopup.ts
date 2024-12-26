import { Messages } from "../i18n";

export function retweetedByPopup(messages: Messages) {
  const header = document.querySelector(`h2[dir="ltr"]#modal-header > span`);

  const splitPath = location.pathname.split("/");
  const retweetedBy = messages.d25289b4;

  if (
    header !== null &&
    splitPath[4] === "retweets" &&
    header.textContent !== retweetedBy
  ) {
    header.textContent = retweetedBy;
  }
}
