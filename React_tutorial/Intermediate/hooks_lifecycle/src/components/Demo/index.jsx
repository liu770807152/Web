import React from 'react'
import ReactDOM from 'react-dom'

// class component
/* class Demo extends React.Component {

	state = { count: 0 }

	myRef = React.createRef()

	add = () => {
		this.setState(state => ({count:state.count+1}))
	}

	unmount = () => {
		ReactDOM.unmountComponentAtNode(document.getElementById('root'))
	}

	show = () => {
		alert(this.myRef.current.value)
	}

	componentDidMount() {
		this.timer = setInterval(() => {
			this.setState( state => ({count:state.count+1}))
		}, 1000)
	}

	componentWillUnmount() {
		clearInterval(this.timer)
	}

	render() {
		return (
			<div>
				<input type="text" ref={this.myRef}/>
				<h2>当前求和为{this.state.count}</h2>
				<button onClick={this.add}>点我+1</button>
				<button onClick={this.unmount}>卸载组件</button>
				<button onClick={this.show}>点击提示数据</button>
			</div>
		)
	}
} */

function Demo(){
  /* run (1 + N) times */
	//console.log('Demo');

	const [count, setCount] = React.useState(0)
	const myRef = React.useRef()

	React.useEffect(()=>{
		let timer = setInterval(()=>{
			setCount(count => count+1 )
		},1000)
		return ()=>{
			clearInterval(timer)
		}
	},[])

	function add(){
		/* Like class component, we have 2 ways to set state
			 The first way is actually the syntactic sugar of 2nd one */
		// setCount(count+1)
		setCount(count => count + 1 )
	}

	// show string inside input
	function show(){
		alert(myRef.current.value)
	}

	// remove root
	function unmount(){
		ReactDOM.unmountComponentAtNode(document.getElementById('root'))
	}

	return (
		<div>
			<input type="text" ref={myRef}/>
			<h2>当前求和为：{count}</h2>
			<button onClick={add}>add 1</button>
			<button onClick={unmount}>unmount root</button>
			<button onClick={show}>show indication</button>
		</div>
	)
}

export default Demo;