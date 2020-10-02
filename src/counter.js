export function createCounter(options = {}) {
  let value = options.initValue || 0;
  const MAX = Number.isInteger(options.max)
    ? options.max
    : Number.POSITIVE_INFINITY;
  const MIN = Number.isInteger(options.min)
    ? options.min
    : Number.NEGATIVE_INFINITY;

  return {
    val() {
      return value;
    },
    inc() {
      if (this.isMax()) {
        return;
      }
      value++;
    },
    dec() {
      if (this.isMin()) {
        return;
      }
      value--;
    },
    isMax() {
      return value === MAX;
    },
    isMin() {
      return value === MIN;
    },
  };
}
