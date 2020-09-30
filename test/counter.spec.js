import { createCounter } from '../src/counter';

// Step 1
describe('옵션이 지정되지 않은 경우', () => {
  let counterFunc = new createCounter();

  // beforeEach(() => {
  //   console.log(counterFunc.val(), 'fewkpgewlkmgf');
  // });

  it('초기값은 0이다.', () => {
    expect(counterFunc.val()).toEqual(0);
  });

  it('inc() 함수는 값을 1증가시킨다.', () => {
    const prevIncValue = counterFunc.val();
    counterFunc.inc();
    expect(prevIncValue + 1).toEqual(counterFunc.val());
  });

  it('dec() 함수는 값을 1감소시킨다.', () => {
    const prevIncValue = counterFunc.val();
    counterFunc.dec();
    expect(prevIncValue - 1).toEqual(counterFunc.val());
  });

  it('isMax() 호출시 false를 반환한다.', () => {
    expect(counterFunc.isMax()).toEqual(false);
  });

  it('isMin() 호출시 false를 반환한다.', () => {
    expect(counterFunc.isMin()).toEqual(false);
  });
});

// Step 2
it('initValue 옵션 사용 시 초기값이 해당 값으로 지정된다.', () => {});

describe('min 옵션 사용 시 현재값과 min 값이 동일하면', () => {
  it('dec() 함수를 호출해도 값이 감소하지 않는다.', () => {});

  it('isMin() 호출 시 true를 반환한다.', () => {});
});

describe('max 옵션 사용 시 현재값과 max 값이 동일하면', () => {
  it('inc() 함수를 호출해도 값이 증가하지 않는다.', () => {});

  it('isMax() 호출 시 true를 반환한다.', () => {});
});
