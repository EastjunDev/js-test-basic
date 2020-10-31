import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getByText, fireEvent, getByTestId, waitFor } from '@testing-library/dom';
import { createServerCounter } from '../src/serverCounter/counter';
import { createCounter } from "../src/backup/counter";

let $container;
const mockAxios = new MockAdapter(axios);
const createServerCounterMock = ($el, options) => {
  const counter = createCounter(options);    
  const getMockResponse = () => ({
    value: counter.val(),
    isMax: counter?.isMax(),
    isMin: counter?.isMin()
  });

  mockAxios.onGet('/counter').reply(200, getMockResponse());
  mockAxios.onPut('/counter/dec').reply(() => {
    counter.dec();
    const mockResponse = getMockResponse();    
    return [200, mockResponse];
  });
  mockAxios.onPut('/counter/inc').reply(() => {
    counter.inc();    
    const mockResponse = getMockResponse();        
    return [200, mockResponse];
  });
  createServerCounter($el);      
};

beforeEach(() => {
  $container = document.createElement('div');
  document.body.appendChild($container);
});

afterEach(() => {
  document.body.innerHTML = '';
  mockAxios.reset();
});

it('생성시 버튼과 초기값을 렌더링한다.', async () => {  
   const INIT_VALUE = 10;
   createServerCounterMock($container, { initVal: INIT_VALUE });
   const $incBtn = await waitFor(() => getByText($container, "+"));
   const $decBtn = await waitFor(() => getByText($container, "-"));
   
   expect($incBtn).toBeVisible();
   expect($decBtn).toBeVisible();
   
   expect(getByText($container, `${INIT_VALUE}`)).toBeInTheDocument();
   
   expect($incBtn).toHaveClass('btn-inc');
   expect($decBtn).toHaveClass('btn-dec');
   
   expect($incBtn).not.toBeDisabled();
   expect($decBtn).not.toBeDisabled();
      
   expect(getByTestId($container, 'value')).toHaveTextContent(INIT_VALUE);
});

it('+ 버튼 클릭시 서버에 inc요청을 보낸 후 응답값으로 뷰를 갱신한다.', async () => {
    const INIT_VALUE = 10;
    createServerCounterMock($container, { initVal: INIT_VALUE });
    const $incBtn = await waitFor(() => getByText($container, "+"));
    fireEvent.click($incBtn);
    fireEvent.click($incBtn);
    await waitFor(() => { expect(getByTestId($container, 'value')).toHaveTextContent(INIT_VALUE+2); });
});

it('- 버튼 클릭시 서버에 dec 요청을 보낸 후 응답값으로 뷰를 갱신한다.', async () => {
    const INIT_VALUE = 7;
    createServerCounterMock($container, { initVal: INIT_VALUE });
    const $decBtn = await waitFor(() => getByText($container, "-"));
    fireEvent.click($decBtn);
    fireEvent.click($decBtn);

    await waitFor(() => { expect(getByTestId($container, 'value')).toHaveTextContent(INIT_VALUE-2); });
});

it('최대값이면 + 버튼이 disabled 상태가 되고, 클릭해도 서버에 요청을 보내지 않는다', async () => {
  const INIT_VALUE = 10;
  const MAX_VALUE = 11;
  createServerCounterMock($container, { initVal: INIT_VALUE, max: MAX_VALUE });

  let $incBtn = await waitFor(() => getByText($container, "+"));

  fireEvent.click($incBtn);
  fireEvent.click($incBtn);

  await waitFor(() => expect($incBtn).toHaveProperty("disabled"));
  await waitFor(() => { expect(getByTestId($container, 'value')).toHaveTextContent(MAX_VALUE); });
});

it('최소값이면 - 버튼이 disabled 상태가 되고, 클릭해도 서버에 요청을 보내지 않는다', async () => {
  const INIT_VALUE = 3;
  const MIN_VALUE = 2;
  createServerCounterMock($container, { initVal: INIT_VALUE, min: MIN_VALUE });

  let $decBtn = await waitFor(() => getByText($container, "-"));

  fireEvent.click($decBtn);
  fireEvent.click($decBtn);

  await waitFor(() => expect($decBtn).toHaveProperty("disabled"));
  await waitFor(() => { expect(getByTestId($container, 'value')).toHaveTextContent(MIN_VALUE); });
});
