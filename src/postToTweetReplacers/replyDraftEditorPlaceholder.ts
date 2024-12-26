import { Messages } from "../i18n";

/**
 * 返信をツイート
 */
export function replyDraftEditorPlaceholder(messages: Messages) {
  const whatsHappen =
    messages.e349147c !== null ? messages.e349147c : messages.e349147b;

  const placeholder = document.querySelector(
    `.public-DraftEditorPlaceholder-inner`
  );

  // mobile
  const placeholderTextArea = document.querySelector<HTMLTextAreaElement>(
    `textarea[data-testid="tweetTextarea_0"]`
  );

  if (placeholder !== null) {
    if (
      location.pathname !== "/home" &&
      location.pathname !== "/compose/tweet"
    ) {
      if (placeholder.textContent !== messages.d2c7a41c) {
        placeholder.textContent = messages.d2c7a41c;
      }
    } else {
      if (placeholder.textContent !== whatsHappen) {
        placeholder.textContent = whatsHappen;
      }
    }
  }

  if (placeholderTextArea !== null) {
    if (
      location.pathname !== "/home" &&
      location.pathname !== "/compose/tweet"
    ) {
      if (
        placeholderTextArea.getAttribute("placeholder") !== messages.d2c7a41c
      ) {
        placeholderTextArea.placeholder =
          whatsHappen === null ? "" : whatsHappen;
      }
    }
  }
}
