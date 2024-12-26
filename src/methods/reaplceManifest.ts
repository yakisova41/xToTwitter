/**
 * Replace PWA's manifest.
 * !! It's worked on extension environment only
 */
export function replaceManifest(head: Element) {
  const oldManifestEl = document.querySelector('link[rel="manifest"]');
  if (oldManifestEl !== null) {
    oldManifestEl.remove();
  }

  const manifestEl = document.createElement("link");
  manifestEl.setAttribute("rel", "manifest");
  manifestEl.setAttribute("crossorigin", "use-credentials");
  manifestEl.setAttribute(
    "href",
    chrome.runtime.getURL("/twitterManifest.json")
  );
  head.prepend(manifestEl);
}
