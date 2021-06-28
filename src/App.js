import { useState } from 'react';
import './App.css';
import ColorBox from './components/ColorBox/index';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: 'Châu Thế Hoàng' },
    { id: 2, title: 'Nguyễn Thị Thùy Sương' },
    { id: 3, title: 'Nguyễn Trung Hoài' },
    { id: 4, title: 'Thành Minh Trường' },
    { id: 5, title: 'Thành Nguyễn Thùy Chi' },
  ]);
  const handleClick = (todo) => {
    console.log(todo);
    const index = todoList.findIndex((x) => x.id === todo.id);
    if (index < 0) return null;

    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  }
  const handleTodoFormSubmit = (formValues) => {
    console.log('Form Submit: ', formValues);
    const newTodo = {
      id: TodoList.length + 1,
      ...formValues
    }
    const newTodoList = [...todoList];
    newTodoList.push(newTodo);
    setTodoList(newTodoList);
  }
  return (
    <div className="app">
      <h1>Learn Hook Basic ss</h1>
      <h2>Color Box Change</h2>
      <ColorBox />
      <h2>Render TodoList</h2>
      <TodoForm onSubmit={handleTodoFormSubmit} />
      <TodoList todos={todoList} onTodoClick={handleClick} />
    </div>
  );
}

export default App;
