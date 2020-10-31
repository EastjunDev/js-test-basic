import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getByText, fireEvent, getByTestId, waitFor } from '@testing-library/dom';
import { getTodosByUsername, addTodo, editTodoContents, deleteTodo } from "../src/apis/todo";

const mockAxios = new MockAdapter(axios);
const BASE_URL = "https://blackcoffee-todolist.df.r.appspot.com/api/u";
const USER_NAME = 'read';

describe('통신 테스트', () => {    
    let userTodo;    

    beforeEach(() => {
        userTodo = {
            _id: "u1",
            name: USER_NAME,
            todoList: [{
                _id: "t1",
                contents: "todo1"
            }, 
            {
                _id: "t2",
                contents: "todo2"
            },
            {
                _id: "t3",
                contents: "todo3"
            }]
        };
        
        mockAxios.onGet(`${BASE_URL}/${USER_NAME}/item`).reply(200, userTodo);
    });

    afterEach(() => {
        document.body.innerHTML = '';
        mockAxios.reset();
    });

    it('투두리스트를 읽어온다.', async () => {    
        let todoList = await getTodosByUsername(USER_NAME);
        expect(userTodo).toEqual(todoList);
    });

    it('투두리스트를 생성한다.', async () => {
        const newTodo = { _id: Date.now(), contents: 'new todo' };
        const mockAddTodo = (newTodo) => {
            userTodo.todoList.push(newTodo);

            return userTodo;
        }    

        mockAxios.onPost(`${BASE_URL}/${USER_NAME}/item`).reply(200, mockAddTodo(newTodo));    
        let todo = await addTodo(USER_NAME, 'new todo');
        expect(todo.todoList[todo.todoList.length-1]).toEqual(newTodo);
    });

    it('투두리스트를 수정한다.', async () => {    
        const TARGET_INDEX = 0; 
        const id = userTodo.todoList[TARGET_INDEX]._id;    
        const editTodo = '수정됨';
        const mockEditTodo = (editTodo) => {
            userTodo.todoList = userTodo.todoList.map((el) => {
                if (el._id === id) {
                    el.contents = editTodo;
                }
                return el;
            });

            return userTodo.todoList[TARGET_INDEX];
        }    

        mockAxios.onPut(`${BASE_URL}/${USER_NAME}/item/${id}`).reply(200, mockEditTodo(editTodo));    
        let todo = await editTodoContents(USER_NAME, id, editTodo);
        expect(todo.contents).toEqual(editTodo);
    });

    it('투두리스트를 삭제한다.', async () => {
        const TARGET_INDEX = 0;
        const id = userTodo.todoList[TARGET_INDEX]._id;    
        const mockDeleteTodo = () => {
            let deletedTodo = '';
            userTodo.todoList = userTodo.todoList.filter((el) => { 
                if (el._id === id) {
                    deletedTodo = el;
                }
                return el._id !== id;
            });

            return deletedTodo;
        }    

        mockAxios.onDelete(`${BASE_URL}/${USER_NAME}/item/${id}`).reply(200, mockDeleteTodo());
        let todo = await deleteTodo(USER_NAME, id);        
        expect(todo._id).toEqual(id);
    });
});
