const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const db = require("./db");
const port = process.env.PORT;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


/* routers */
const memberRouter = require('./router/member');

app.use('/member', memberRouter);

app.listen(port, async () => {
	console.log(`[RUN] Server... | http://localhost:${port}`);
});