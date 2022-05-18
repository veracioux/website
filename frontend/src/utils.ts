/**
 * Wrapper around window.addEventListener("scroll", ...).
 */
export function onScroll(callback: (event?: Event) => void) {
    let residualScrollTimerId = 0;
    window.addEventListener("scroll", ev => {
        // If the user scrolls too fast, we might not get a scroll event fired at the final position.
        // For example, this can leave a tiny opening in the shutter when the user scrolls to the top.
        // That's why we call the callback again after a short timeout after the last "scroll" event was fired.
        callback(ev);
        clearTimeout(residualScrollTimerId);
        residualScrollTimerId = setTimeout(() => callback(ev), 80);
    });
}
