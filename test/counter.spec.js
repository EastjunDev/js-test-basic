import { createCounter } from "../src/counter";

// Step 1
describe("옵션이 지정되지 않은 경우", () => {
  let counter;
  beforeEach(() => (counter = createCounter()));

  it("초기값은 0이다.", () => {
    expect(counter.val()).toEqual(0);
  });

  it("inc() 함수는 값을 1증가시킨다.", () => {
    const prevVal = counter.val();
    counter.inc();
    const curVal = counter.val();
    expect(curVal).toEqual(prevVal + 1);
  });

  it("dec() 함수는 값을 1감소시킨다.", () => {
    const prevVal = counter.val();
    counter.dec();
    const curVal = counter.val();
    expect(curVal).toEqual(prevVal - 1);
  });

  it("isMax() 호출시 false를 반환한다.", () => {
    expect(counter.isMax()).toEqual(false);
  });

  it("isMin() 호출시 false를 반환한다.", () => {
    expect(counter.isMin()).toEqual(false);
  });
});

// Step 2
it("initValue 옵션 사용 시 초기값이 해당 값으로 지정된다.", () => {
  const initValue = 10;
  const counter = createCounter({ initValue });
  expect(counter.val()).toEqual(initValue);
});

describe("min 옵션 사용 시 현재값과 min 값이 동일하면", () => {
  let counter;
  const INIT_VALUE = 10;
  beforeEach(
    () => (counter = createCounter({ initValue: INIT_VALUE, min: INIT_VALUE }))
  );
  it("dec() 함수를 호출해도 값이 감소하지 않는다.", () => {
    expect(counter.val()).toEqual(INIT_VALUE);
    counter.dec();
    expect(counter.val()).toEqual(INIT_VALUE);
    counter.dec();
    counter.dec();
    expect(counter.val()).toEqual(INIT_VALUE);
  });

  it("isMin() 호출 시 true를 반환한다.", () => {
    expect(counter.isMin()).toEqual(true);
  });
});

describe("max 옵션 사용 시 현재값과 max 값이 동일하면", () => {
  let counter;
  const INIT_VALUE = 10;
  beforeEach(
    () => (counter = createCounter({ initValue: INIT_VALUE, max: INIT_VALUE }))
  );
  it("inc() 함수를 호출해도 값이 증가하지 않는다.", () => {
    expect(counter.val()).toEqual(INIT_VALUE);
    counter.inc();
    expect(counter.val()).toEqual(INIT_VALUE);
    counter.inc();
    counter.inc();
    expect(counter.val()).toEqual(INIT_VALUE);
  });

  it("isMax() 호출 시 true를 반환한다.", () => {
    expect(counter.isMax()).toEqual(true);
  });
});
