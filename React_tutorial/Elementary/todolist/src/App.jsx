import React, { Component } from 'react'
import Header from './components/Header'
import List from './components/List'
import Footer from './components/Footer'
import './App.css'

export default class App extends Component {
	// The state lies in the position of the methods that manipulate the state.

	// initialize the state
	state = {todos: [
		{id: '001', name: 'have dinner', done: true},
		{id: '002', name: 'go to bed', done: true},
		{id: '003', name: 'do some coding', done: false},
		{id: '004', name: 'go shopping', done: false}
	]}

	// addTodo adds a "to-do" item
	addTodo = (todoObj)=>{
		//获取原todos
		const { todos } = this.state
		//追加一个todo
		const newTodos = [todoObj,...todos]
		//更新状态
		this.setState({ todos: newTodos })
	}

	// updateTodo updates a "to-do" object
	updateTodo = (id,done)=>{
				const {todos} = this.state
		// match data in process
		const newTodos = todos.map((todoObj)=>{
			if(todoObj.id === id) return {...todoObj,done}
			else return todoObj
		})
		this.setState({ todos: newTodos })
	}

	// deleteTodo deletes a "to-do" item
	deleteTodo = (id)=>{
		const {todos} = this.state
		// delete the item of given ID
		const newTodos = todos.filter((todoObj)=>{
			return todoObj.id !== id
		})
		this.setState({todos:newTodos})
	}

	// checkAllTodo is for total selection
	checkAllTodo = (done)=>{
		// get previous "to-do" items
		const {todos} = this.state
		// process data
		const newTodos = todos.map((todoObj)=>{
			return {...todoObj,done}
		})
		this.setState({todos:newTodos})
	}

	// clearAllDone is for clearing the existed "to-do" items
	clearAllDone = ()=>{
		const {todos} = this.state
		// filter out the "to-do"s that are not done
		const newTodos = todos.filter((todoObj)=>{
			return !todoObj.done
		})
		this.setState({todos:newTodos})
	}

	render() {
		const {todos} = this.state
		return (
			<div className="todo-container">
				<div className="todo-wrap">
					<Header addTodo={this.addTodo}/>
					<List todos={todos} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo}/>
					<Footer todos={todos} checkAllTodo={this.checkAllTodo} clearAllDone={this.clearAllDone}/>
				</div>
			</div>
		)
	}
}
