import React from 'react';
import TodoList from './Todolist/todoList';
import AddTodo from './AddTodo/addTodo';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {

  constructor(){
    super();
    this.state = {
      todos: [],
      isLoaded: false
    };
  }

  componentDidMount(){
    this.syncAPI();
  }

  syncAPI = ()=>{
    fetch('http://assets.breatheco.de/apis/fake/todos/user/alesanchezr')
    .then(res => res.json())
    .then((data) => {
      this.setState({ todos: data })
      console.log(this.state.todos)
    })
      .catch(e => console.error(e));
  }

  render() {
    return(
      <div className="container">
        <div className='row'>
          <div className='col-sm-12 d-flex justify-content-center'>
            <div>
            <AddTodo addTodoFn={this.addTodo}></AddTodo>
          <TodoList updateTodoFn={this.updateTodo} todos={this.state.todos}></TodoList>
            </div>
          </div>
        </div>
      </div>)
  }

//  componentDidMount = () => {
//   const todos = localStorage.getItem('todo');
//   if(todos) {
//     const savedTodos = JSON.parse(todos);
//     this.setState({ todos: savedTodos });
//   } else {
//     console.log('no todos');

//   }

//  }

 addTodo = async (todo) => {
  await this.setState({ todos: [...this.state.todos, {
    text: todo,
    completed: false
  }] });
  localStorage.setItem('todos', JSON.stringify(this.state.todos));
  console.log(localStorage.getItem('todos'));
  }

  updateTodo = async (todo) => {
    const newTodos = this.state.todos.map(_todo => {
      if(todo === _todo)
      return {
        text: todo.text,
        completed: !todo.completed
      }
      else
        return _todo
    });
    await this.setState({ todos: newTodos });
    localStorage.setItem('todos', JSON.stringify(this.state.todos));
  }
}

export default App;
