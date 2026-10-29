// =====================================================================
// CAPA DE ACCESO A DATOS (repositorio)
// Única capa que sabe DÓNDE se guardan los datos.
// Versión del Taller 1: datos en memoria (se pierden al reiniciar).
// En el Taller 2 se reemplaza por MySQL SIN tocar las otras capas.
// Todas las funciones son async (devuelven promesas) para que el cambio
// a una base de datos real no obligue a modificar la capa de servicio.
// =====================================================================
const clientes = [
  { id: 1, nombre: 'Distribuidora El Valle', nit: '900123456-7', ciudad: 'Cali', telefono: '6023334455', tipo: 'distribuidor' },
  { id: 2, nombre: 'Fruver La Sabana', nit: '901234567-1', ciudad: 'Bogotá', telefono: '6017654321', tipo: 'comercio' },
  { id: 3, nombre: 'Supermercado Los Andes', nit: '800987654-3', ciudad: 'Medellín', telefono: '6045556677', tipo: 'comercio' },
];
let siguienteId = 4;

async function findAll() {
  return clientes;
}

async function findById(id) {
  return clientes.find((c) => c.id === id) || null;
}

async function findByNit(nit) {
  return clientes.find((c) => c.nit === nit) || null;
}

async function create(cliente) {
  const nuevo = { id: siguienteId++, ...cliente };
  clientes.push(nuevo);
  return nuevo;
}

module.exports = { findAll, findById, findByNit, create };
