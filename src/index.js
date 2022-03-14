import 'core-js/stable';
import 'regenerator-runtime/runtime';

import path from 'path';
import express from 'express';

import { getPriceByLocationName, getPriceInVn } from './gas-price-service';

const app = express();

app.use('*', (req, res, next) => {
  if (req.secure || req.headers['x-forwarded-proto'] === 'https') return next();
  res.redirect(`https://${req.hostname}${req.originalUrl}`);
});

app.get('/pingCheck', (_, res) => res.sendStatus(200));
app.get('/priceByLocation', getPriceByLocationName);
app.get('/priceInVn', getPriceInVn);

app.get('/not-found', (_, res) => res.status(404).sendFile(path.join(__dirname, 'index.html')));
app.get('*', (req, res) => res.redirect(`https://${req.hostname}/not-found`));
app.listen(process.env.PORT || 3000);
