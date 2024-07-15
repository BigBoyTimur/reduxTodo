import { useState } from 'react'
import './App.css'
import TodoList from "./components/TodoList.jsx";
import InputField from "./components/InputField.jsx";
import {useDispatch, useSelector} from "react-redux";
import {addTodo} from "./store/todoSlice.js";

function App() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const addTask = () => {
    dispatch(addTodo({text}))
    setText('')
  }

  return (
    <div className="app">
      <InputField text={text} handleInput={setText} handleSubmit={addTask} />

      <TodoList />
    </div>
  )
}

export default App
