// =====================================================================
// CAPA DE ACCESO A DATOS (repositorio)
// Única capa que sabe DÓNDE se guardan los datos.
// Versión del Taller 1: datos en memoria (se pierden al reiniciar).
// En el Taller 2 se reemplaza por MySQL SIN tocar las otras capas.
// Todas las funciones son async (devuelven promesas) para que el cambio
// a una base de datos real no obligue a modificar la capa de servicio.
// =====================================================================
const productos = [
  { id: 1, nombre: 'Mango Tommy', categoria: 'fruta', unidad: 'kg', precio: 6500 },
  { id: 2, nombre: 'Tomate chonto', categoria: 'hortaliza', unidad: 'kg', precio: 3200 },
  { id: 3, nombre: 'Pulpa de maracuyá', categoria: 'procesado', unidad: 'caja', precio: 48000 },
];
let siguienteId = 4;

async function findAll() {
  return productos;
}

async function findById(id) {
  return productos.find((p) => p.id === id) || null;
}

// Busca sin distinguir mayúsculas: "mango tommy" y "Mango Tommy" son el mismo producto
async function findByNombre(nombre) {
  return productos.find((p) => p.nombre.toLowerCase() === nombre.toLowerCase()) || null;
}

async function create(producto) {
  const nuevo = { id: siguienteId++, ...producto };
  productos.push(nuevo);
  return nuevo;
}

module.exports = { findAll, findById, findByNombre, create };
