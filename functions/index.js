const cors = require('cors');
const functions = require('firebase-functions');
const express = require('express');
const path = require('path');

const app = express();

const healthRouter = require('./health/healthRouter');
const codeRouter = require('./code/codeRouter');
const oauthRouter = require('./oauth/oauthRouter');
const accessTokenRouter = require('./token/accessTokenRouter');
const weightRouter = require('./weight/weightRouter');

app.use(cors());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'routes')));

app.use('/', healthRouter);
app.use('/code', codeRouter);
app.use('/oauth', oauthRouter);
app.use('/token', accessTokenRouter);
app.use('/weight', weightRouter);

exports.app = functions.https.onRequest(app);
