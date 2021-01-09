const jwt = require('jsonwebtoken');
const confi = require('./../config/config');

const auth = (req,res,next) => {
	const token_header = req.headers.auth;

	if(!token_header) return res.send({error: "Você não está autenticado"});

	jwt.verify(token_header,config.jwt_pass , (err,decoded) => {
		if(err) return res.send({error: 'Token inválido'});
		return next();
	});
}

module.exports = auth;