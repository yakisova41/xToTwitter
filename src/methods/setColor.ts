/**
 * !NOTE It's the code for userscript,
 * so you must write a same code to extension/main-world.js for chrome extension
 * 
 * 
 * Get theme rgb from react state.
 * @returns {Promise<string>} theme RGB
 */
export function getThemeColor(): Promise<string> {
  function foundLtr(ltr: Element) {
    const propsKey = Object.keys(ltr).filter((key) =>
      key.match(/^__reactProps/)
    )[0] as keyof typeof ltr;

    const props = ltr[propsKey] as any;

    const store =
      props.children[1].props.children.props.children.props.children.props.value.store;

    const state = store.getState();

    switch (state.settings.local.themeColor) {
      case "purple500":
        return "rgb(120, 86, 255)";
      case "orange500":
        return "rgb(255, 122, 0)";
      case "magenta500":
        return "rgb(249, 24, 128)";
      case "green500":
        return "rgb(0, 186, 124)";
      case "yellow500":
        return "rgb(255, 212, 0)";
      case "blue500":
        return "rgb(29, 155, 240)";
      default:
        return "rgb(29, 155, 240)";
    }
  }

  return new Promise((resolve) => {
    const reactRoot = document.querySelector("#react-root");

    const ltrO = new MutationObserver(() => {
      const ltr = document.querySelector(
        '#react-root > div > div > div[dir="ltr"]'
      );

      if (ltr !== null) {
        const themeColorRGB = foundLtr(ltr);
        resolve(themeColorRGB);

        ltrO.disconnect();
      } else {
        throw new Error("Ltr is null");
      }
    });

    if (reactRoot !== null) {
      ltrO.observe(reactRoot, {
        subtree: true,
        childList: true,
      });
    }
  });
}

/**
 * Set theme rgb to css variable.
 * @param {*} themeColor
 * @param {*} head
 */
export function setThemeColor(themeColor: string, head: HTMLHeadElement) {
  const style = document.createElement("style");

  style.innerHTML = `
    :root {
      --x-to-twitter-theme : ${themeColor};
    }
  `;

  head.appendChild(style);
}
