import { createCounter } from "../src/counter";
import { MESSAGE } from "../utils/constants";

let counter = createCounter();
const mockFn = jest.fn();
mockFn.mockImplementation(({ initVal, min, max }) =>
  createCounter({ initVal, min, max })
);

// Step 1
describe("옵션이 지정되지 않은 경우", () => {
  beforeAll(() => {
    counter = createCounter();
  });
  afterEach(() => {
    counter = createCounter();
  });

  it("초기값은 0이다.", () => {
    expect(counter.val()).toEqual(0);
  });

  it("inc() 함수는 값을 1증가시킨다.", () => {
    expect(counter.inc()).toBe(1);
    expect(counter.inc()).toBe(2);
  });

  it("dec() 함수는 값을 1감소시킨다.", () => {
    expect(counter.dec()).toBe(-1);
    expect(counter.dec()).toBe(-2);
  });

  it("isMax() 호출시 false를 반환한다.", () => {
    expect(counter.isMax()).toBe(false);
    expect(counter.isMax()).not.toBeUndefined();
  });

  it("isMin() 호출시 false를 반환한다.", () => {
    expect(counter.isMin()).toBeFalsy();
    expect(counter.isMin()).toBeDefined();
  });
});

// Step 2
it("initValue 옵션 사용 시 초기값이 해당 값으로 지정된다.", () => {
  const initialState = { initVal: 5, min: 4, max: 6 };
  counter = createCounter(initialState);
  expect(counter.val()).toEqual(initialState.initVal);
});

describe("min 옵션 사용 시 현재값과 min 값이 동일하면", () => {
  it("dec() 함수를 호출해도 값이 감소하지 않는다.", () => {
    expect(mockFn({ initVal: 3, min: 3 }).dec()).toEqual(3);
  });

  it("isMin() 호출 시 true를 반환한다.", () => {
    expect(mockFn({ initVal: 3, min: 3 }).isMin()).toEqual(true);
  });
});

describe("min 옵션 사용 시 현재값이 min 값 보다 작으면", () => {
  it("min 값 에러메세지가 나온다.", () => {
    expect(mockFn({ initVal: 2, min: 3 }).val()).toEqual(MESSAGE.MIN_ERROR);
    expect(mockFn({ initVal: 2, min: 3 }).isMin()).toEqual(MESSAGE.MIN_ERROR);
    expect(mockFn({ initVal: 2, min: 3 }).isMax()).toEqual(MESSAGE.MIN_ERROR);
  });
});

describe("min 옵션 사용 시 현재값에서 -1한 값이 min 값 보다 작으면", () => {
  it("dec() 함수를 호출해도 값이 감소하지 않는다.", () => {
    expect(mockFn({ initVal: 3.1, min: 3 }).dec()).toEqual(3.1);
    expect(mockFn({ initVal: -1.1, min: -2 }).dec()).toEqual(-1.1);
  });
});

describe("max 옵션 사용 시 현재값과 max 값이 동일하면", () => {
  it("inc() 함수를 호출해도 값이 증가하지 않는다.", () => {
    expect(mockFn({ initVal: 3, max: 3 }).inc()).toEqual(3);
    counter = createCounter({ initVal: 3, max: 5 });
    counter.inc();
    counter.inc();
    counter.inc();
    expect(counter.val()).toEqual(5);
  });

  it("isMax() 호출 시 true를 반환한다.", () => {
    expect(mockFn({ initVal: 3, max: 3 }).isMax()).toEqual(true);
  });
});

describe("max 옵션 사용 시 현재값과 max 값이 보다 크면", () => {
  it("inc() 함수를 호출해도 값이 증가하지 않는다.", () => {
    expect(mockFn({ initVal: 3, max: 3 }).inc()).toEqual(3);
  });

  it("isMax() 호출 시 true를 반환한다.", () => {
    expect(mockFn({ initVal: 3, max: 3 }).isMax()).toEqual(true);
  });
});

describe("max 옵션 사용 시 현재값에서 +1인 값이 max 값이 보다 크면", () => {
  it("inc() 함수를 호출해도 값이 증가하지 않는다.", () => {
    expect(mockFn({ initVal: 3, max: 3 }).inc()).toEqual(3);
  });

  it("isMax() 호출 시 true를 반환한다.", () => {
    expect(mockFn({ initVal: 3, max: 3 }).isMax()).toEqual(true);
  });
});
