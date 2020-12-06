const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { commonQuery } = require('./db');
const router = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		// to support URL-encoded bodies
		extended: true,
	})
);

app.use(cors());

app.use('/', router);

// const TABLE_QUERY = `CREATE TABLE database1.Issues (id INT AUTO_INCREMENT PRIMARY KEY,title VARCHAR(255) NOT NULL,description VARCHAR(255),isOpen INT DEFAULT 1, createdAt DATETIME, updatedAt DATETIME, active TINYINT DEFAULT 1);`;

app.listen(PORT, () => {
	console.log(`Server Listening on ${PORT}`);
});
