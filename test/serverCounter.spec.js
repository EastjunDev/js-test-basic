import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getByText, fireEvent, waitForElement } from "@testing-library/dom";
import { createServerCounter } from "../src/serverCounter/counter";
import { createCounter } from "../src/backup/counter";

const PATH = {
  COUNTER: "/counter",
  INC: "/counter/inc",
  DEC: "/counter/dec",
};

const mockAxios = new MockAdapter(axios);

let $container;
let mockCounter;

function mockResponse(counter) {
  return {
    value: counter?.val(),
    isMax: counter?.isMax(),
    isMin: counter?.isMin(),
  };
}

beforeEach(async () => {
  $container = document.createElement("div");
  document.body.appendChild($container);
});

afterEach(() => {
  document.body.innerHTML = "";
  mockAxios.reset();
});

it("생성시 버튼과 초기값을 렌더링한다.", async () => {
  mockCounter = createCounter();
  mockAxios.onGet(PATH.COUNTER).reply(200, mockResponse(mockCounter));

  createServerCounter($container);

  const $incBtn = await waitForElement(() => getByText($container, "+"));
  const $decBtn = await waitForElement(() => getByText($container, "-"));
  const $valElem = await waitForElement(() => getByText($container, "0"));

  expect($incBtn).toBeVisible();
  expect($decBtn).toBeVisible();
  expect($valElem).toBeVisible();

  expect($incBtn).toHaveClass("btn-inc");
  expect($decBtn).toHaveClass("btn-dec");

  expect(getByText($container, "+")).not.toBeDisabled();
  expect(getByText($container, "-")).not.toBeDisabled();
});

it("+ 버튼 클릭시 서버에 inc요청을 보낸 후 응답값으로 뷰를 갱신한다.", async () => {
  mockCounter = createCounter();
  mockAxios.onGet(PATH.COUNTER).reply(200, mockResponse(mockCounter));
  mockCounter.inc();
  mockAxios.onPut(PATH.INC).reply(200, mockResponse(mockCounter));

  createServerCounter($container);

  await waitForElement(() => getByText($container, "0"));
  expect(getByText($container, "0")).toBeVisible();

  fireEvent.click(getByText($container, "+"));

  await waitForElement(() => getByText($container, "1"));
  expect(getByText($container, "1")).toBeVisible();
});

it("- 버튼 클릭시 서버에 dec 요청을 보낸 후 응답값으로 뷰를 갱신한다.", async () => {
  mockCounter = createCounter();
  mockAxios.onGet(PATH.COUNTER).reply(200, mockResponse(mockCounter));
  mockCounter.dec();
  mockAxios.onPut(PATH.DEC).reply(200, mockResponse(mockCounter));

  createServerCounter($container);

  await waitForElement(() => getByText($container, "0"));
  expect(getByText($container, "0")).toBeVisible();

  fireEvent.click(getByText($container, "-"));

  await waitForElement(() => getByText($container, "-1"));
  expect(getByText($container, "-1")).toBeVisible();
});

it("최대값이면 + 버튼이 disabled 상태가 되고, 클릭해도 서버에 요청을 보내지 않는다", async () => {
  const MAX_VALUE = 0;
  const options = {
    initVal: MAX_VALUE,
    max: MAX_VALUE,
  };
  mockCounter = createCounter(options);
  mockAxios.onGet(PATH.COUNTER).reply(200, mockResponse(mockCounter));
  mockCounter.inc();
  mockAxios.onPut(PATH.INC).reply(200, mockResponse(mockCounter));

  createServerCounter($container, options);

  await waitForElement(() => getByText($container, "0"));
  expect(getByText($container, "0")).toBeVisible();

  await waitForElement(() => getByText($container, "+"));
  expect(getByText($container, "+")).toBeDisabled();

  fireEvent.click(getByText($container, "+"));

  await waitForElement(() => getByText($container, "0"));
  expect(getByText($container, "0")).toBeVisible();
});

it("최소값이면 - 버튼이 disabled 상태가 되고, 클릭해도 서버에 요청을 보내지 않는다", async () => {
  const MIN_VALUE = 0;
  const options = {
    initVal: MIN_VALUE,
    min: MIN_VALUE,
  };
  mockCounter = createCounter(options);
  mockAxios.onGet(PATH.COUNTER).reply(200, mockResponse(mockCounter));
  mockCounter.dec();
  mockAxios.onPut(PATH.DEC).reply(200, mockResponse(mockCounter));

  createServerCounter($container, options);

  await waitForElement(() => getByText($container, "0"));
  expect(getByText($container, "0")).toBeVisible();

  await waitForElement(() => getByText($container, "-"));
  expect(getByText($container, "-")).toBeDisabled();

  fireEvent.click(getByText($container, "-"));

  await waitForElement(() => getByText($container, "0"));
  expect(getByText($container, "0")).toBeVisible();
});
