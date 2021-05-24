import React, { Component } from 'react';
import qs from 'querystring';

const detailData = [
  { id: '01', content: 'Hello, React!' },
  { id: '02', content: 'Hello, Angular!' },
  { id: '03', content: 'Hello, Vue!' },
]

export default class Detail extends Component {
	render() {
		console.log(this.props);
		// receive params
		const { id, title } = this.props.match.params;

		// receive search (resembles query params)
		// const { search } = this.props.location;
		// slice(1) remove '?' at the beginning
		// const { id, title } = qs.parse(search.slice(1));

		// receive state
		// const { id, title } = this.props.location.state || {}
		const findContent = detailData.find((detailObj) => {
			return detailObj.id === id;
		}) || {};
		return (
			<ul>
				<li>ID: {id}</li>
				<li>TITLE: {title}</li>
				<li>CONTENT: {findContent.content}</li>
			</ul>
		)
	}
}
