import React, { Component } from 'react'
import './index.css'

export default class Footer extends Component {

	// the callback to select all "to-do" items
	handleCheckAll = (event)=>{
		this.props.checkAllTodo(event.target.checked)
	}

	// the callback to clear all done "to-do"s
	handleClearAllDone = ()=>{
		this.props.clearAllDone()
	}

	render() {
		const { todos } = this.props
		// number of done "to-do"s
		const doneCount = todos.reduce((pre,todo) => pre + (todo.done ? 1 : 0), 0)
		const total = todos.length
		return (
			<div className="todo-footer">
				<label>
					<input type="checkbox" onChange={this.handleCheckAll} checked={doneCount === total && total !== 0 ? true : false}/>
				</label>
				<span>
					<span>Done{doneCount}</span> / All{total}
				</span>
				<button onClick={this.handleClearAllDone} className="btn btn-danger">clear finished tasks</button>
			</div>
		)
	}
}
