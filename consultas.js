const { Pool } = require("pg");
const format = require('pg-format');

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "Florinda..",
    database: "joyas",
    port: 5432,
    allowExitOnIdle: true
});

const obtenerJoyas = async ({ limit = 10, order_by = 'id_ASC', page = 1 }) => {
    const [campo, direccion] = order_by.split('_');
    const offset = (page - 1) * limit;
  
    const query = format('SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s', campo, direccion, limit, offset);
    const { rows: joyas } = await pool.query(query);
  
    return joyas;
  };
  
   const obtenerJoyasPorFiltros = async ({ precio_max, precio_min, categoria, metal }) => {
    let filtros = [];
    const values = [];
    const agregarFiltro = (campo, operador, valor) => {
      values.push(valor);
      filtros.push(`${campo} ${operador} $${values.length}`);
    };
  
    if (precio_max) agregarFiltro('precio', '<=', precio_max);
    if (precio_min) agregarFiltro('precio', '>=', precio_min);
    if (categoria) agregarFiltro('categoria', '=', categoria);
    if (metal) agregarFiltro('metal', '=', metal);
  
    let query = 'SELECT * FROM inventario';
    if (filtros.length) query += ` WHERE ${filtros.join(' AND ')}`;
    
    const { rows: joyas } = await pool.query(query, values);
    return joyas;
  };
  
  const prepararHATEOAS = (joyas) => {
    const results = joyas.map((j) => ({
      nombre: j.nombre,
      href: `/joyas/${j.id}`,
    }));
    return { total: joyas.length, results };
  };
  
  module.exports = { obtenerJoyas, obtenerJoyasPorFiltros, prepararHATEOAS };