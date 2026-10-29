// =====================================================================
// CAPA DE SERVICIO (lógica de negocio)
// Aplica las reglas del negocio y las validaciones.
// No sabe nada de HTTP (req/res) ni de cómo se guardan los datos.
// =====================================================================
const repo = require('../repositories/pedidos.repository');
const { validarPedido, construirPedido } = require('../models/pedido');
const HttpError = require('../utils/http-error');

// Fecha de hoy en Colombia con formato AAAA-MM-DD
function fechaDeHoy() {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'America/Bogota' });
}

async function listar() {
  return repo.findAll();
}

async function obtener(id) {
  const pedido = await repo.findById(id);
  if (!pedido) throw new HttpError(404, `No existe el pedido con id ${id}`);
  return pedido;
}

async function crear(datos) {
  const errores = validarPedido(datos);
  if (errores.length > 0) throw new HttpError(400, 'Datos inválidos', errores);

  // Regla de negocio: todo pedido nuevo entra a la empresa como "recibido";
  // solo después (PUT, Taller 2) pasa a "despachado" y a "entregado".
  if (datos.estado !== undefined && datos.estado !== 'recibido') {
    throw new HttpError(400, 'Un pedido nuevo debe empezar en estado recibido');
  }

  const pedido = construirPedido(datos);
  // Regla de negocio: si no indican la fecha, el pedido se registra con la de hoy
  if (!pedido.fecha) pedido.fecha = fechaDeHoy();

  // Taller 3: antes de guardar, validar que cliente_id y producto_id existan
  // consultando GET /clientes/:id y GET /productos/:id (400 si no existe, 503 si no responde).

  return repo.create(pedido);
}

module.exports = { listar, obtener, crear };
