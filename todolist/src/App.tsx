import React from 'react';
import './App.css';
import { QueryClient, QueryClientProvider, useQuery, useMutation } from '@tanstack/react-query';
import { getList, updateTodo, deleteTodo, createTodo } from './services/api';
const queryClient = new QueryClient();


interface Todo {
  content: string,
  createdAt: string,
  title: string,
  updatedAt: string,
  __v: string,
  _id: string
}

const getTodos = async (page: any): Promise<Todo[]> => {
  const todos = await getList(page);
  return todos;
}

const createNewTodo = async (title: string, content: string): Promise<Todo> => {
  const todo = await createTodo(title, content);
  return todo;
}

const updateExistingTodo = async (todoId: string, title: string, content: string): Promise<Todo> => {
  const todo = await updateTodo(todoId, title, content);
  console.log(todo)
  return todo;
}

const deleteExistingTodo = async (todoId: string): Promise<Todo> => {
  const todo = await deleteTodo(todoId);
  return todo;
}


const CreateTodo: React.FC = () => {
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const createTodo = useMutation({
    mutationFn: (data: { title: string, content: string }) => {
      const { title, content } = data
      return createNewTodo(title, content);
    },
    onSuccess: () => {
      setTitle('');
      setContent('');
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createTodo.mutate({ title: title, content: content });
    window.location.reload();
  }

  return (
    <div>
      <form style={{ width: "50%", margin: "auto" }} onSubmit={handleSubmit}>
        <br></br>
        <div>Title:</div>
        <input style={{ backgroundColor: "#F4EEFF" }} type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <br></br>
        <br></br>
        <div>Content:</div>
        <input style={{ backgroundColor: "#F4EEFF" }} type="text" value={content} onChange={(e) => setContent(e.target.value)} />
        <br></br>
        <button style={{
          backgroundColor: "#FF928B", borderRadius: "10px", border: "1px #FF928B solid", color: "white",
          padding: "4px 10px", fontWeight: "bolder", margin: "5px", cursor: "pointer"
        }} type='submit'> Add Todo</button>
      </form>
    </div>
  )
}

const TodoList: React.FC = () => {
  const { isLoading, isError, data, error } = useQuery({ queryKey: ['todos'], queryFn: () => getTodos('0') })

  const updateTodoContent = useMutation({
    mutationFn: (data: { todoId: string, title: string, content: string }) => {
      const { todoId, title, content } = data
      return updateExistingTodo(todoId, title, content);
    },
  })
  const deleteTodoContent = useMutation({
    mutationFn: (todoId: string) => {
      return deleteExistingTodo(todoId);
    },
  })
  if (isLoading)
    return <div>Loading!!</div>
  if (isError) {
    return <span>Error: {error.message}</span>
  }
  return (
    <div>
      {
        data?.map((todo: Todo) => {
          return (
            <div className='todo' key={todo._id}>
              <form id={todo._id+todo.title} style={{ display: "none" }}>
                <input type="text" defaultValue={todo.title} onChange={(e) => { todo.title = e.target.value }}></input>
                <input type="text" defaultValue={todo.content} onChange={(e) => { todo.content = e.target.value }}></input>
                <button style={{
                  backgroundColor: "#FF928B", borderRadius: "10px", border: "1px #FF928B solid", color: "white",
                  padding: "4px 10px", fontWeight: "bolder", margin: "5px", cursor: "pointer"
                }} onClick={(e) => {
                  updateTodoContent.mutate({ todoId: todo._id, title: todo.title, content: todo.content });
                }}>Update</button>
              </form>
              <div id={todo._id}>
                <h2>{todo.title} </h2>
                <p>{todo.content}</p>

                <button style={{
                  backgroundColor: "#FF928B", borderRadius: "10px", border: "1px #FF928B solid", color: "white",
                  padding: "4px 10px", fontWeight: "bolder", margin: "5px", cursor: "pointer"
                }} onClick={() => {
                  document.getElementById(todo._id+todo.title)!.style.display = 'block';
                  document.getElementById(todo._id)!.style.display = 'none';
                }}>Update</button>

                <button style={{
                  backgroundColor: "#FF928B", borderRadius: "10px", border: "1px #FF928B solid", color: "white",
                  padding: "4px 10px", fontWeight: "bolder", margin: "5px", cursor: "pointer"
                }} className='buttonstyle' onClick={() => {
                  deleteTodoContent.mutate(todo._id);
                  window.location.reload()
                }}>Delete</button>
              </div>
            </div>
          )

        })
      }
    </div>
  )
}
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CreateTodo />
      <TodoList />
    </QueryClientProvider>
  );
}

export default App;