const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5005;

const app = express();

// MIDDLEWARE
app.use(helmet());
app.use(logger('dev'));

const allowedOrigins = [
	"https://dev.laurasnclr.com",
	"http://localhost:3001",
];

app.use(
	cors({
		origin: allowedOrigins,
		methods: ['GET'],
		allowedHeaders: ['Content-Type', 'Authorization', 'api-key'],
		optionsSuccessStatus: 200,
	})
);

app.use(express.static('public'));
app.use(express.json());


// DATABASE CONNECTION
const MONGODB_URI =
	process.env.MONGO_URI || "mongodb://database:27017/hello-world";

mongoose
	.connect(MONGODB_URI, { dbName: 'hello-world' })
	.then((x) =>
		console.log(
			`Connected to Mongo! Database name: "${x.connections[0].name}"`
		)
	)
	.catch((err) => console.error('Error connecting to mongo', err));


// ROUTES
app.get("/test", (_, res) => {
	console.log("hello"); // this will be visible in docker 
	res.json(
		"This text comes from the backend! \nIf you can see this, it means it's working 🎉"
	)}
);

const Article = require("./models/Article.model.js");
app.get("/DBtest", async (_, res) => {
	try {
		const allArticles = await Article.find();
		if (!allArticles) throw new Error("Nothing to show here");
		res.status(200).json({
			articles: allArticles,
			db_state: mongoose.connection.readyState, // 0 = disconnected, 1 = connected
		});
	} catch (error) {
		res.status(500).json(error.message);
	}
});

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT} ✨`));

module.exports = app;
