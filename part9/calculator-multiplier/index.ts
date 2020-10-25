import express from 'express';
import _ from 'lodash';
import { calculator } from './calculator'
// const express = require('express');
const app = express();

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/calculate', (req, res) => {
  const { value1, value2 } = req.query;
  const result = calculator(Number(value1), Number(value2), 'divide');
  res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
