export function createCounter(initValue) {
  return {
    value: initValue?.value ? initValue.value : 0,
    min: initValue?.min ? initValue.min : -Infinity,
    max: initValue?.max ? initValue.max : Infinity,
    val() {
      return this.value;
    },
    inc() {
      return this.value === this.max ? this.value : ++this.value;
    },
    dec() {
      return this.value === this.min ? this.value : --this.value;
    },
    isMax() {
      return this.value === this.max;
    },
    isMin() {
      return this.value === this.min;
    }
  };
}
