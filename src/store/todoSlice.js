import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async (_, {rejectWithValue}) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
      if (!response.ok) {
        throw new Error('Server Error');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (id, {rejectWithValue, dispatch}) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE'
      });
      dispatch(removeTodo({todoId: id}));
      if (response.ok)
        throw new Error('Cant delete task. Server error');
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const toggleStatus = createAsyncThunk(
  'todos/toggleTodo',
  async(id, {rejectWithValue, dispatch, getState}) => {
    const todo = getState().todos.todos.find(todo => todo.id === id);

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...todo,
          completed: !todo.completed,
        })
      });
      if (!response.ok)
        throw new Error('Cant toggle task status. Server error');
      const data = await response.json();

      dispatch(toggleTodo({todoId: id}));
    } catch (error) {
      return rejectWithValue(error.message);
    }
}
);

export const addNewTodo = createAsyncThunk(
  'todos/addNewTodo',
  async (text, {rejectWithValue, dispatch}) => {
    try {
      const todo = {
        userId: 1,
        title: text,
        completed: false
      };

      const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
      });

      if (!response.ok)
        throw new Error('Cant add new task. Server error');

      const data = await response.json();

      dispatch(addTodo(data));
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const setError = (state, action) => {
  state.status = 'rejected';
  state.error = action.payload;
}

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    status: null,
    error: null,
  },
  reducers: {
    addTodo(state, action) {
      state.todos.push(action.payload);
    },
    removeTodo(state, action) {
      state.todos = state.todos.filter(todo => todo.id !== action.payload.todoId);
    },
    toggleTodo(state, action) {
      const toggledTodo = state.todos.find(todo => todo.id === action.payload.todoId);
      toggledTodo.completed = !toggledTodo.completed
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTodos.pending, state => {
      state.status = 'loading';
      state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, setError)
      .addCase(deleteTodo.rejected, setError)
      .addCase(toggleStatus.rejected, setError)
      .addCase(addNewTodo.rejected, setError)
  }
})


const {addTodo, removeTodo, toggleTodo} = todoSlice.actions;

export default todoSlice.reducer;