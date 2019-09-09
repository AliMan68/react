import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Todos from './components/Todos';
import Header from './components/layer/header';
import Addtodo from './components/addtodo';
// import uuid from 'uuid'
import about from './components/pages/about'
import './App.css';
import axios from 'axios';

class App extends React.Component {

  state = {
    todos : [
     
    ]
  }
  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
    .then( (res) =>{ this.setState({todos:res.data})})
  
  }
  
  markCompleted = (id) => {
    console.log(id);
    this.setState({ todos: this.state.todos.map(todo => { 
      if (todo.id === id){
        console.log(todo.completed);
          todo.completed = !todo.completed
      }
      return todo
    })});
  }
  delTodo = (id) =>{
    this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)]});
  }
  addtodo = title => {
    // const newTodo = { old static way
    //   id:uuid.v4(),
    //   title:title,
    //   completed:false
    // }
    axios.post('https://jsonplaceholder.typicode.com/todos',{
      title,
      completed:false
    }).then( res => this.setState({
      
      todos:[...this.state.todos,res.data]
    }))


    

  }

  render(){
    // console.log(this.state.todos[2])
    return (
      <Router>        
       <div className='App '>
         <div className="container">
          <Header/>
          <Route exact path="/" render={props=>(
            <div>
                  <Addtodo addtodo={this.addtodo}/>
                  <Todos todos={this.state.todos} markCompleted={this.markCompleted} delTodo = {this.delTodo}/>
            </div>
          )}>
          </Route>
          <Route path="/about" component={about}>

          </Route>
          </div>
        </div>
      </Router>
      
    );
  }
 
}
export default App;