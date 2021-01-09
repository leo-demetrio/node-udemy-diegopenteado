const env = process.env.NODE_ENV || 'dev';


// const  config = () => {
// 	switch (env) {
// 		case 'dev':
// 		return {
// 			bd_connect: 'mongodb+srv://user_admin:20202020@cluster0.hw2cr.mongodb.net/Cluster0?retryWrites=true&w=majority'

// 		}
// 		case 'hml':
// 		return {
// 			bd_connect: 'mongodb+srv://user_admin:20202020@cluster0.hw2cr.mongodb.net/Cluster0?retryWrites=true&w=majority'
// 		}
// 		case 'prod':
// 		return {
// 			bd_connect: 'mongodb+srv://user_admin:20202020@cluster0.hw2cr.mongodb.net/Cluster0?retryWrites=true&w=majority'
// 		}
// 		default:
// 		return {
// 			bd_connect: 'mongodb+srv://user_admin:20202020@cluster0.hw2cr.mongodb.net/Cluster0?retryWrites=true&w=majority'
// 		}


// 	}
// }

const config = {
	bd_connect: 'mongodb+srv://user_admin:20202020@cluster0.hw2cr.mongodb.net/Cluster0?retryWrites=true&w=majority',
	jwt_pass: 'tokendaapi',
	jwt_expires: '7d'
}
console.log(`Iniciando a API em ambiente ${env.toUpperCase()} ${env}`);

module.exports = config;