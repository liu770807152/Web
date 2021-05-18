const express = require('express')
const app = express()

app.use((request,response,next)=>{
	console.log('Someone requested server 1!');
	console.log('Request is from: ',request.get('Host'));
	console.log('Request address is: ',request.url);
	next()
})

app.get('/students',(request,response)=>{
	const students = [
		{id:'001',name:'tom',age:18},
		{id:'002',name:'jerry',age:19},
		{id:'003',name:'tony',age:120},
	]
	response.send(students)
})

app.listen(5000,(err)=>{
	if(!err) console.log('Server 1 successfully launched. Server address is：http://localhost:5000/students');
})
