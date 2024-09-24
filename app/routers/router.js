let express = require('express');
let router = express.Router();

const cuenta = require('../controllers/cuenta.controller.js');
const tipo = require('../controllers/tipo.controller.js');
const transaccion = require('../controllers/transaccion.controller.js');

// Rutas para cuentas (customers)
router.post('/api/cuentas/create', cuenta.create);
router.get('/api/cuentas/all', cuenta.retrieveAllCuentas);
router.get('/api/cuentas/onebyid/:id', cuenta.getCuentaById);
router.get('/api/cuentas/filteringbyage', cuenta.filteringByGenero);
router.get('/api/cuentas/pagination', cuenta.pagination);
router.get('/api/cuentas/pagefiltersort', cuenta.pagingfilteringsorting);
router.put('/api/cuentas/update/:id', cuenta.updateById);
router.delete('/api/cuentas/delete/:id', cuenta.deleteById);

// Rutas para tipos (books)
router.post('/api/tipos/create', tipo.create);
router.get('/api/tipos/all', tipo.retrieveAllTipos);
router.get('/api/tipos/onebyid/:id', tipo.getTipoById);
router.get('/api/tipos/filtering', tipo.filtering);
router.get('/api/tipos/pagination', tipo.pagination);
router.get('/api/tipos/pagefiltersort', tipo.pagingfilteringsorting);
router.put('/api/tipos/update/:id', tipo.updateById);
router.delete('/api/tipos/delete/:id', tipo.deleteById);

// Rutas para transacciones
router.post('/api/transacciones/create', transaccion.create);
router.get('/api/transacciones/all', transaccion.retrieveAllTransacciones);
router.get('/api/transacciones/onebyid/:id', transaccion.getTransaccionById);
router.get('/api/transacciones/filtering', transaccion.filtering);
router.get('/api/transacciones/pagination', transaccion.pagination);
router.get('/api/transacciones/pagefiltersort', transaccion.pagingfilteringsorting);
router.put('/api/transacciones/update/:id', transaccion.updateById);
router.delete('/api/transacciones/delete/:id', transaccion.deleteById);

module.exports = router;
