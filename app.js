const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Mongoose
const urlMongo = 'mongodb+srv://user_admin:20202020@cluster0.hw2cr.mongodb.net/Cluster0?retryWrites=true&w=majority';
const options = {  poolSize: 5, useNewUrlParser: true, useUnifiedTopology: true}

mongoose.connect(urlMongo,options);
mongoose.set('useCreateIndex', true);
mongoose.connection.on('error', (error) => {
	console.log(error);
});
mongoose.connection.on('disconnected', (error) => {
	console.log("Desconectado", error);
});
mongoose.connection.on('connected', (error) => {
	console.log("Conectado");
});

//BODY PARSER
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const indexRoute = require('./Routes/index.js');
const usersRoute = require('./Routes/users.js');

app.use('/', indexRoute);
app.use('/users', usersRoute);



app.listen(3000, () => {
	console.log("Runing 3000...");
});