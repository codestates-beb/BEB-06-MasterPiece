require('dotenv');

const config = {
	development: {
		host: process.env.DATABASE_HOST_URL,
		user: process.env.DATABASE_USER,
		password: process.env.DATABASE_PASSWORD,
		database: process.env.DATABASE_NAME,
		port : process.env.DATABASE_PORT,
		dialect: 'mysql'
	}
};

module.exports = config;