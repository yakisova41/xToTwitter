export class ObserverHooksControler {
  // Record<selector, Replacer[]>
  private hookHandlers: Record<string, ObserverHookHandler[]> = {};

  public addHookHandler(hookHandler: ObserverHookHandler) {
    if (this.hookHandlers[hookHandler.selector] === undefined) {
      this.hookHandlers[hookHandler.selector] = [];
    }

    this.hookHandlers[hookHandler.selector].push(hookHandler);
  }

  public startObserve(selector: string, options: MutationObserverInit) {
    const elem = document.querySelector(selector);

    if (elem !== null) {
      const observer = new MutationObserver(() => {
        if (this.hookHandlers[selector] !== undefined) {
          this.hookHandlers[selector].forEach((hookHandler, i) => {
            hookHandler.callback(elem, () => {
              this.hookHandlers[selector] = this.hookHandlers[selector].splice(
                i,
                1
              );
            });
          });
        }
      });

      observer.observe(elem, options);
    }
  }
}

export interface ObserverHookHandler {
  callback: (elem: Element, dispose: () => void) => any;
  selector: string;
}
