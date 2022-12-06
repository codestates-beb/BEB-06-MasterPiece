const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const db = require("./db");
const port = process.env.PORT;

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());


/* routers */
const mintRouter = require('./router/mint');
const memberRouter = require('./router/member');
const communityRouter = require('./router/community');
const mypageRouter = require('./router/mypage');

app.use('/member', memberRouter);
app.use('/mint', mintRouter);
app.use('/community', communityRouter);
app.use('/mypage', mypageRouter);

app.use((req, res, next) => {
	res.status(404).send('Not Found!');
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send({
		message: 'Internal Server Error',
		stacktrace: err.toString()
	});
});

app.listen(port, async () => {
	console.log(`[RUN] Server... | http://localhost:${port}`);
});