const express = require('express');
const morgan = require('morgan');
const { errorHandler } = require('./middlewares/errorHandler');
const { joyasRouter } = require('./routes/joyas');

const app = express();
const port = 3000;

app.use(morgan('dev'));

app.use('/joyas', joyasRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
