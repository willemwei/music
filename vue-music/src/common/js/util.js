export function shuffle(arr) {
  let _arr = arr.slice();
  let ret = [];
  let len = _arr.length;

  for (let i = 0; i < len; i++) {
    ret.push(_arr.splice(Math.floor(Math.random() * _arr.length), 1)[0]);
  }

  return ret;
}

export function debounce(func, delay) {
  let timer;

  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  }
}
