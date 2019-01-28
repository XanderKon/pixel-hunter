import {getNextLevel} from './display-screens';

export const setTimer = (state, elem) => {
  let timer = state.timer;
  elem.innerHTML = timer;

  const timerId = setInterval(() => {
    if (timer < 1) {
      clearInterval(timerId);
      getNextLevel();
      return;
    }
    --timer;
    elem.innerHTML = timer;
  }, 1000);
};
