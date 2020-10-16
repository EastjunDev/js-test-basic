import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getByText, fireEvent, getByTestId, waitFor, findByTestId } from '@testing-library/dom';
import { createServerCounter } from '../src/serverCounter/counter';

const mockAxios = new MockAdapter(axios);

let container;
const INIT_VALUE = 10
const MIN_VALUE = 8
const MAX_VALUE = 12

beforeEach(async () => {
  container = document.createElement('div');
  
  mockAxios.onGet('/counter').reply(200, {
    value: INIT_VALUE,
  });
  mockAxios.onPut('/counter/dec').reply(200, {
    value: INIT_VALUE-1,
  });        
  mockAxios.onPut('/counter/inc').reply(200, {
    value: INIT_VALUE+1,    
  });      

  createServerCounter(container);  
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.innerHTML = '';
  mockAxios.reset();
});

it('생성시 버튼과 초기값을 렌더링한다.', async () => {
  expect(getByText(container, '+')).toBeVisible();
   expect(getByText(container, '-')).toBeVisible();
   
   expect(getByText(container, `${INIT_VALUE}`)).toBeInTheDocument();
   
   expect(getByText(container, '+')).toHaveClass('btn-inc');
   expect(getByText(container, '-')).toHaveClass('btn-dec');
   
   expect(getByText(container, '+')).not.toBeDisabled();
   expect(getByText(container, '-')).not.toBeDisabled();
      
   expect(getByTestId(container, 'value')).toHaveTextContent(INIT_VALUE);
});

it('+ 버튼 클릭시 서버에 inc요청을 보낸 후 응답값으로 뷰를 갱신한다.', async () => {    
    fireEvent.click(getByText(container, '+'));
    await waitFor(() => { expect(getByTestId(container, 'value')).toHaveTextContent(INIT_VALUE+1); });
});

it('- 버튼 클릭시 서버에 dec 요청을 보낸 후 응답값으로 뷰를 갱신한다.', async () => {
  fireEvent.click(getByText(container, '-'));
  await waitFor(() => { expect(getByTestId(container, 'value')).toHaveTextContent(INIT_VALUE-1); });  
});

it('최대값이면 + 버튼이 disabled 상태가 되고, 클릭해도 서버에 요청을 보내지 않는다', async () => {
  fireEvent.click(getByText(container, '+'));
  fireEvent.click(getByText(container, '+'));
  fireEvent.click(getByText(container, '+'));

  expect(getByText(container, '+')).toBeDisabled();
  expect(getByTestId(container, 'value')).toHaveTextContent(MAX_VALUE);
});

it('최소값이면 - 버튼이 disabled 상태가 되고, 클릭해도 서버에 요청을 보내지 않는다', async () => {

});
