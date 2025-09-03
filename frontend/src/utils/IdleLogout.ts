export function initIdleLogout(timeout = 15 * 60 * 1000, onTimeout?: () => void) {
  let timer: ReturnType<typeof setTimeout>;

  const resetTimer = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (onTimeout) {
        onTimeout();
      } else {
        // default action
        localStorage.removeItem("doctor_token");
        window.location.href = "/";
      }
    }, timeout);
  };

  const events = ["mousemove", "keydown", "click", "scroll"];
  events.forEach((event) => window.addEventListener(event, resetTimer));

  // mulai timer pertama kali
  resetTimer();

  // fungsi cleanup kalau mau berhenti manual
  const cleanup = () => {
    clearTimeout(timer);
    events.forEach((event) => window.removeEventListener(event, resetTimer));
  };

  return cleanup;
}
