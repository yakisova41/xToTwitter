/**
 * Get theme rgb from react state.
 * @returns {Promise<string>} theme RGB
 */
function getThemeColor() {
  function foundLtr(ltr) {
    const propsKey = Object.keys(ltr).filter((key) =>
      key.match(/^__reactProps/)
    )[0];

    const props = ltr[propsKey];

    const store =
      props.children.props.children.props.children[1].props.children.props
        .children.props.children.props.value.store;

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

    ltrO.observe(reactRoot, {
      subtree: true,
      childList: true,
    });
  });
}

/**
 * Set theme rgb to css variable.
 * @param {*} themeColor
 * @param {*} head
 */
function setThemeColor(themeColor, head) {
  const style = document.createElement("style");

  style.innerHTML = `
    :root {
      --x-to-twitter-theme : ${themeColor};
    }
  `;

  head.appendChild(style);
}

/**
 * Run a callback in no time when a head element is found.
 * @param {*} callback
 */
function headFinder(callback) {
  const observer = new MutationObserver((mutations, obs) => {
    const head = document.querySelector("head");
    if (head) {
      callback(head);
      obs.disconnect();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

headFinder((head) => {
  getThemeColor().then((rgb) => {
    setThemeColor(rgb, head);
  });
});
