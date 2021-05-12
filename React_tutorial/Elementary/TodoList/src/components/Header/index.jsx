import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {nanoid} from 'nanoid'
import './index.css'

export default class Header extends Component {

	static propTypes = {
		addTodo: PropTypes.func.isRequired
	}

	// callback of keyboard events
	handleKeyUp = (event)=>{
		const {keyCode,target} = event
		// judge if "space" is pressed
		if(keyCode !== 13) return
		// added "to-do" item must have a name
		if(target.value.trim() === ''){
			alert('Input should not be empty!')
			return
		}
		// prepare a "to-do" object
		const todoObj = {id: nanoid(), name: target.value, done: false}
		// pass todoObj to App
		this.props.addTodo(todoObj)
		// clear inputs
		target.value = ''
	}

	render() {
		return (
			<div className="todo-header">
				<input onKeyUp={this.handleKeyUp} type="text" placeholder="Please input your task name，and press Enter to confirm"/>
			</div>
		)
	}
}