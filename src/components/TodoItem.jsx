import {useDispatch} from "react-redux";
import {removeTodo, toggleTodo} from "../store/todoSlice.js";

function TodoItem({id, text, completed}) {
  const dispatch = useDispatch();
  return (
    <li key={id}>
      <input type="checkbox" checked={completed} onChange={() => dispatch(toggleTodo({todoId: id}))}/>
      <span>{text}</span>
      <span onClick={() => dispatch(removeTodo({todoId: id}))} className="delete">&times;</span>
    </li>
  );
}

export default TodoItem;