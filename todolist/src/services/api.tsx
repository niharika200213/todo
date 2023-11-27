import axios from "axios";
const baseURL = "http://localhost:5000/api/todos/";

const getList = async(page: string) =>{
    const todoList = await axios.get(baseURL+page);
    return todoList.data;
}

const updateTodo =async (todoId:string, title:string, content:string) => {
    const updatedTodo = await axios.patch(baseURL,{ todoId: todoId , title:title, content:content});
    return updatedTodo.data;
}

const deleteTodo =async (todoId:string) => {
    const deletedTodo = await axios.delete(baseURL,{ data: { todoId: todoId }});
    return deletedTodo.data;
}

const createTodo =async (title:string, content:string) => {
    const createdTodo = await axios.post(baseURL,{title,content});
    return createdTodo.data;
}

export { getList, updateTodo, deleteTodo, createTodo}