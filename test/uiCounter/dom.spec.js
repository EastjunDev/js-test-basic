import "@testing-library/jest-dom/extend-expect";
import { getByText, fireEvent, waitForElement } from "@testing-library/dom";
import { createUICounter } from "../../src/uiCounter/counter";

let $container;

beforeEach(() => {
  $container = document.createElement("div");
  document.body.appendChild($container);
});

afterEach(() => {
  document.body.innerHTML = "";
});

it("생성시 버튼과 초기값을 렌더링한다.", () => {
  createUICounter($container);
  const $incBtn = getByText($container, "+");
  const $decBtn = getByText($container, "-");
  const $valElem = getByText($container, "0");

  expect($incBtn).toBeVisible();
  expect($decBtn).toBeVisible();
  expect($valElem).toBeVisible();

  expect($incBtn).toHaveClass("btn-inc");
  expect($decBtn).toHaveClass("btn-dec");
});

it("+ 버튼 클릭시 1 증가한다.", async () => {
  createUICounter($container);

  expect(getByText($container, "0")).toBeVisible();

  fireEvent.click(getByText($container, "+"));
  await waitForElement(() => getByText($container, "1"));
  expect(getByText($container, "1")).toBeVisible();

  fireEvent.click(getByText($container, "+"));
  await waitForElement(() => getByText($container, "2"));
  expect(getByText($container, "2")).toBeVisible();
});

it("- 버튼 클릭시 1 감소한다.", async () => {
  createUICounter($container);

  expect(getByText($container, "0")).toBeVisible();

  fireEvent.click(getByText($container, "-"));
  await waitForElement(() => getByText($container, "-1"));
  expect(getByText($container, "-1")).toBeVisible();

  fireEvent.click(getByText($container, "-"));
  await waitForElement(() => getByText($container, "-2"));
  expect(getByText($container, "-2")).toBeVisible();
});

it("Max값인 경우 + 버튼이 disabled 상태가 되며 클릭해도 증가하지 않는다.", async () => {
  const INIT_VALUE = 10;
  createUICounter($container, { initVal: INIT_VALUE, max: INIT_VALUE });

  const INIT_VALUE_STR = "10";
  expect(getByText($container, INIT_VALUE_STR)).toBeVisible();

  fireEvent.click(getByText($container, "+"));
  await waitForElement(() => getByText($container, INIT_VALUE_STR));
  expect(getByText($container, INIT_VALUE_STR)).toBeVisible();

  fireEvent.click(getByText($container, "+"));
  await waitForElement(() => getByText($container, INIT_VALUE_STR));
  expect(getByText($container, INIT_VALUE_STR)).toBeVisible();
});

it("Min값인 경우 - 버튼이 disabled 상태가 되며, 클릭해도 감소하지 않는다.", async () => {
  const INIT_VALUE = 10;
  createUICounter($container, { initVal: INIT_VALUE, min: INIT_VALUE });

  const INIT_VALUE_STR = "10";
  expect(getByText($container, INIT_VALUE_STR)).toBeVisible();

  fireEvent.click(getByText($container, "-"));
  await waitForElement(() => getByText($container, INIT_VALUE_STR));
  expect(getByText($container, INIT_VALUE_STR)).toBeVisible();

  fireEvent.click(getByText($container, "-"));
  await waitForElement(() => getByText($container, INIT_VALUE_STR));
  expect(getByText($container, INIT_VALUE_STR)).toBeVisible();
});
