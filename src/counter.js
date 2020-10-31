export function createCounter(initObj = {}) {  
  const { initVal, initMin, initMax } = initObj;
  let value = initVal || 0;  
  const MIN = Number.isInteger(initMin) ? initMin : -Infinity;
  const MAX = Number.isInteger(initMax) ? initMax : Infinity;

  return {
    val() {
      return value;
    },
    inc() {
      if (!this.isMax()) {
        value++;
      }            
    },
    dec() {
      if (!this.isMin()) {
        value--;
      }      
    },
    isMax() {
      return value === MAX;
    },
    isMin() {
      return value === MIN;
    }
  };
}
