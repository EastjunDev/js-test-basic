export function createCounter(initOption) {
  const counterData = initOption || {
    initValue: 0,
    min: null,
    max: null,
  };

  return {
    val() {
      return counterData.initValue;
    },
    inc() {
      counterData.initValue += 1;
    },
    dec() {
      counterData.initValue -= 1;
    },
    isMax() {
      return Boolean(counterData.max && counterData.max === this.val());
    },
    isMin() {
      return Boolean(counterData.min && counterData.min === this.val());
    },
  };
}
