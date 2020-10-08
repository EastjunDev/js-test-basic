import { MESSAGE } from "../utils/constants";

function isErrorInitialState({ initVal, min, max }) {
  if (min && initVal < min) return MESSAGE.MIN_ERROR;
  if (max && initVal > max) return MESSAGE.MAX_ERROR;
  return false;
}

export function createCounter({ initVal = 0, min, max } = {}) {
  let value = initVal;
  return {
    val() {
      return isErrorInitialState({ initVal, min, max }) || value;
    },
    inc() {
      if (!!isErrorInitialState({ initVal, min, max }))
        return isErrorInitialState({ initVal, min, max });
      if (max && value + 1 > max) {
        return value;
      }
      return ++value;
    },
    dec() {
      if (!!isErrorInitialState({ initVal, min, max }))
        return isErrorInitialState({ initVal, min, max });
      if (min && value - 1 < min) {
        return value;
      }
      return --value;
    },
    isMax() {
      if (!!isErrorInitialState({ initVal, min, max }))
        return isErrorInitialState({ initVal, min, max });
      if (value === max) {
        return true;
      }
      return false;
    },
    isMin() {
      if (!!isErrorInitialState({ initVal, min, max }))
        return isErrorInitialState({ initVal, min, max });
      if (value === min) {
        return true;
      }
      return false;
    },
  };
}
