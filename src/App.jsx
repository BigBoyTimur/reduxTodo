import {useEffect, useState} from 'react'
import './App.css'
import TodoList from "./components/TodoList.jsx";
import InputField from "./components/InputField.jsx";
import {useDispatch, useSelector} from "react-redux";
import {addNewTodo, fetchTodos} from "./store/todoSlice.js";

function App() {
  const [text, setText] = useState('');
  const {status, error} = useSelector(state => state.todos);
  const dispatch = useDispatch();

  const addTask = () => {
    dispatch(addNewTodo(text));
    setText('');
  }

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  return (
    <div className="app">
      <InputField
        text={text}
        handleInput={setText}
        handleSubmit={addTask}
      />

      {status === 'loading' && <h2>Loading...</h2>}
      {error && <h2>An error occurred: {error}</h2>}

      <TodoList />
    </div>
  )
}

export default App
