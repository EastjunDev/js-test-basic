export function createCounter(initObj = {}) {  
  const { initVal, initMin, initMax } = initObj;
  let value = initVal || 0;
  const min = typeof initMin === 'number' ? initMin : -Infinity;
  const max = typeof initMax === 'number' ? initMax : Infinity;

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
      return value === max;
    },
    isMin() {
      return value === min;
    },
    min() {
      return min;
    }
  };
}
