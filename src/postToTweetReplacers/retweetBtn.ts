import { Messages } from "../i18n";

/**
 * Retweet button, Quote button.
 */
export function retweetBtn(messages: Messages) {
  const retweetBtns = document.querySelectorAll(
    'div[data-testid="retweetConfirm"] > div:nth-child(2) > div > span:not(.x-to-twitter-retweet)'
  );

  const quoteBtns = document.querySelectorAll(
    'a[href="/compose/tweet"] > div:nth-child(2) > div > span:not(.x-to-twitter-retweet)'
  );

  const unRetweetBtns = document.querySelectorAll(
    'div[data-testid="unretweetConfirm"] > div:nth-child(2) > div > span:not(.x-to-twitter-retweet)'
  );

  const toRetweet =
    messages.d6c8514a !== null ? messages.d6c8514a : messages.d6c85149;

  const toQuote =
    messages.c9d7235d !== null ? messages.c9d7235d : messages.c9d7235e;

  const undoRetweet =
    messages.f3bbbb87 !== null ? messages.f3bbbb87 : messages.fa9ce7f4;

  retweetBtns.forEach((retweetBtn) => {
    retweetBtn.classList.add("x-to-twitter-retweet");
    retweetBtn.textContent = toRetweet;
  });

  quoteBtns.forEach((quoteBtn) => {
    quoteBtn.classList.add("x-to-twitter-retweet");
    quoteBtn.textContent = toQuote;
  });

  unRetweetBtns.forEach((unRetweetBtn) => {
    unRetweetBtn.classList.add("x-to-twitter-retweet");
    unRetweetBtn.textContent = undoRetweet;
  });
}
