declare var DEBUG: boolean;

export let isEnableAlert = false;

/**
 * Output log if debug mode is true.
 * @param logText
 */
export function log(logText: any, isalert = true) {
  if (DEBUG) {
    console.log(logText);
    if (isEnableAlert && isalert) {
      alert(logText);
    }
  }
}

/**
 * Alert when log.
 */
export function enableAlert() {
  isEnableAlert = true;
}
