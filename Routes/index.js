const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');



router.get('/', auth, (req,res) => {
	let obj = req.query;
	return res.send({message: 'tudo ok'});
});
router.post('/', auth,(req,res) => {

	return res.send({message: `Rota Post`});

});



module.exports = router;