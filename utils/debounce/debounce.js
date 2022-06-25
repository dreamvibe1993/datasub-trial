const DELAY_MS = 500;

function debounceCached() {
  var timeoutId = 0;
  function debounce(fn) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn();
    }, DELAY_MS);
  }
  return debounce;
}

const debounce = debounceCached();

export default debounce;
