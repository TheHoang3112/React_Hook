import { useEffect, useState } from 'react';
import './App.css';
import ColorBox from './components/ColorBox/index';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import PostList from './components/PostList';
import Pagination from './components/Pagination';
import queryString from 'query-string';
import PostFilterForm from './components/PostFilterForm';
import Clock from './components/CLock';

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: 'Châu Thế Hoàng' },
    { id: 2, title: 'Nguyễn Thị Thùy Sương' },
    { id: 3, title: 'Nguyễn Trung Hoài' },
    { id: 4, title: 'Thành Minh Trường' },
    { id: 5, title: 'Thành Nguyễn Thùy Chi' },
  ]);
  const [postList, setPostList] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 1,
  });
  const [filters, setFilters] = useState({
    _limit: 10,
    _page: 1,
  });
  useEffect(() => {
    async function getData() {
      try {
        const paramsString = queryString.stringify(filters);
        // _limit=10&_page=1
        const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        console.log({ responseJSON });

        const { data, pagination } = responseJSON;
        setPostList(data);
        setPagination(pagination);
      } catch (error) {
        console.log('Failed get Data api post List: ', error.message);
      }
    }
    getData();
  }, [filters])

  const handlePageChange = (newPage) => {
    console.log('New Page: ', newPage);
    setFilters({
      ...filters,
      _page: newPage
    })
  }

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
  const handleFilterChange = (newFilters) => {
    console.log('New Filter: ', newFilters);
    setFilters({
      ...filters,
      _page: 1,
      title_like: newFilters.searchTerm,
    })
  }
  const [showClock, setShowClock] = useState(true);
  return (
    <div className="app">
      <h1>Learn Hook Basic ss</h1>
      {showClock && <Clock />}
      <button onClick={() => setShowClock(false)}>Hide Clock</button>
      <h2>Color Box Change</h2>
      <ColorBox />
      <h2>Render TodoList</h2>
      <TodoForm onSubmit={handleTodoFormSubmit} />
      <TodoList todos={todoList} onTodoClick={handleClick} />
      <h2>Render PostList form API</h2>
      <PostFilterForm onSubmit={handleFilterChange} />
      <PostList posts={postList} />
      <Pagination
        pagination={pagination}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default App;
