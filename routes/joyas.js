const express = require('express');
const { obtenerJoyas, obtenerJoyasPorFiltros, prepararHATEOAS } = require('../consultas');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const queryStrings = req.query;
    const joyas = await obtenerJoyas(queryStrings);
    const HATEOAS = prepararHATEOAS(joyas);
    res.json(HATEOAS);
  } catch (error) {
    next(error);
  }
});

router.get('/filtros', async (req, res, next) => {
  try {
    const queryStrings = req.query;
    const joyas = await obtenerJoyasPorFiltros(queryStrings);
    res.json(joyas);
  } catch (error) {
    next(error);
  }
});

module.exports = { joyasRouter: router };
