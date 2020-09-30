export function createCounter(initOption) {
  const counterData = initOption || {
    initVal: 0,
    min: null,
    max: null,
  };

  return {
    val() {
      return counterData.initVal;
    },
    inc() {
      if (counterData.max !== null && counterData.max > counterData.initVal) {
        counterData.initVal += 1;
      }
      if (counterData.max === null) {
        counterData.initVal += 1;
      }
    },
    dec() {
      if (counterData.min !== null && counterData.min < counterData.initVal) {
        counterData.initVal -= 1;
      }
      if (counterData.min === null) {
        counterData.initVal -= 1;
      }
    },
    isMax() {
      return Boolean(counterData.max && counterData.max === this.val());
    },
    isMin() {
      return Boolean(counterData.min && counterData.min === this.val());
    },
  };
}
