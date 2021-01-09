const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/config');

//Mongoose
const urlMongo = config.bd_connect;
const options = {  poolSize: 5, useNewUrlParser: true, useUnifiedTopology: true}


mongoose.connect(urlMongo,options);

//const Product = require('./models/productsModel');

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