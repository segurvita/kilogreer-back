const cors = require('cors');
const functions = require('firebase-functions');
const express = require('express');
const path = require('path');

const app = express();

const healthRouter = require('./health/healthRouter');
const oauthRouter = require('./oauth/oauthRouter');

app.use(cors());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'routes')));

app.use('/', healthRouter);
app.use('/oauth', oauthRouter);

exports.app = functions.https.onRequest(app);
