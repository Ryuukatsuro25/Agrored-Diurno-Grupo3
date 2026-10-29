// =====================================================================
// CAPA DE PRESENTACIÓN (rutas)
// Asocia cada método HTTP + URI con una función del controlador.
// =====================================================================
const { Router } = require('express');
const controller = require('../controllers/clientes.controller');

const router = Router();

router.get('/', controller.listar);      // listar todos los clientes
router.get('/:id', controller.obtener);  // obtener un cliente por id
router.post('/', controller.crear);      // crear un cliente

// Taller 2: agregar PUT /:id (actualizar) y DELETE /:id (eliminar)
// Taller 3: GET /?ids=1,2,3 (consulta por lotes que usará ms-pedidos)

module.exports = router;
