const express = require('express');
const router = express.Router();
const User = require('./../model/user.js');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const auth = require('./../middlewares/auth');

const webToken = (userId) => {
	return jsonwebtoken.sign({id: userId}, 'tokendaapi',{expiresIn: '7d'});
}

router.get('/', auth,async (req,res) => {

	try{
		const users = await User.find({});
		return res.send(users);

	} catch (err) {
		if(err) return res.send({error: 'Não voi possível carregar'});
	}
});

// router.get('/', (req,res) => {
// 	User.find({}, (err, data) => {
// 		if (err) return res.send({error: "Erro na consulta"});

// 		return res.send(data);
// 	});

// });

router.post('/create',auth, async (req,res) => {

	const {email, password} = req.body;

	if(!email || !password) return res.send({error: "Dados insuficentes"});

	try {

		if(await User.findOne({email})) return res.send({error: 'Usuário existente'});

		const user = await User.create(req.body);
		user.password = undefined;
		return res.send({user, token: webToken(user.id)});

	} catch (err) {
		return res.send({error: "Não foi criado"});
	}

});


// router.post('/create', (req,res) => {

// 	const {email, password} = req.body;

// 	if(!email || !password) return res.send({error: "Dados inválidos"});
	
// 	User.findOne({email}, (err,data) => {

// 		if(err) return res.send({ error: 'Email incorreto'});
// 		if(data) return res.send({ error: 'Usuário registrado'});

// 		User.create(req.body, (err, data) => {

// 			if(err) return res.send({ error: "Não criado"});
// 			data.password = undefined;
// 			return res.send(data);
// 		});

// 	});

	
// });

//router.post('/auth')

router.post('/auth', async (req,res) => {

	const { email, password } = req.body;

	if(!email || !password) return res.send({error: 'Dados insuficientes'});

	try {
		const user = await User.findOne({email}).select('+password');
		if(!user) return res.send({error: 'Usuário não encontardo'});

		const pass_ok = await bcrypt.compare(password,user.password);
		if(!pass_ok) return res.send({error: 'Senha inválida'});
		user.password = undefined;
		return res.send({user, token: webToken(user.id)});

	} catch(err) {
		return res.send({error: 'Erro ao logar'});
	}

});

// router.post('/auth', (req,res) => {
// 	const {email,password} = req.body;

// 	if(!email || !password) return res.send({error: 'Email ou senha inválidos'});
	
// 	User.findOne({email}, (err,data) => {

// 		if(err) return res.send({error: 'Erro no usuário'});
// 		if(!data) return res.send({error: 'Usuário não encontardo'});

// 		bcrypt.compare(password, data.password, (err,same) => {
// 			if(!same) return res.send({error: 'Senha inválida'});
// 			data.password = undefined;
// 			return res.send(data);
// 		});

// 	}).select('+password');
// });



module.exports = router;
