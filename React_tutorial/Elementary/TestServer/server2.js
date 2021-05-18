const express = require('express')
const app = express()

app.use((request,response,next)=>{
	console.log('Someone requested server 2!');
	next()
})

app.get('/cars',(request,response)=>{
	const cars = [
		{id:'001',name:'Benz',price:199},
		{id:'002',name:'Mazda',price:109},
		{id:'003',name:'Mitsubishi',price:120},
	]
	response.send(cars)
})

app.listen(5001,(err)=>{
	if(!err) console.log('Server 2 successfully launched. Server address is：http://localhost:5001/cars');
})
