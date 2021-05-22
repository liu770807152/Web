import React, { Component } from 'react';

const detailData = [
  { id: '01', content: 'Hello, React!' },
  { id: '02', content: 'Hello, Angular!' },
  { id: '03', content: 'Hello, Vue!' },
]

export default class Detail extends Component {
	render() {
		console.log(this.props);
		// receive params
		const {id,title} = this.props.match.params
		const findContent = detailData.find((detailObj)=>{
			return detailObj.id === id
		})
		return (
			<ul>
				<li>ID: {id}</li>
				<li>TITLE: {title}</li>
				<li>CONTENT: {findContent.content}</li>
			</ul>
		)
	}
}
