# ms-productos · AgroRed S.A. (Módulo 3, Taller 1)

Redes y Servicios Multimedia · UAO · Microservicio de **productos** de la aplicación de AgroRed,
con **Node.js + Express** organizado en capas. Adaptado de la plantilla entregada por la docente.

Versión del Taller 1: datos en memoria y tres operaciones (listar, obtener, crear).
En el Taller 2 se agregan PUT y DELETE y el repositorio pasa a MySQL.

## Cómo ejecutarlo

Requisitos: Node.js LTS 22 (22.9 o superior).

```
npm install                 # descarga Express en node_modules
copy .env.example .env      # en Windows (en Linux/Mac: cp .env.example .env)
npm run dev                 # inicia en http://127.0.0.1:3002 y se reinicia al guardar
```

## Capas

| Archivo | Capa | Responsabilidad |
|---|---|---|
| src/index.js | Arranque | Lee PORT y HOST y pone el servidor a escuchar |
| src/app.js | Configuración | Middlewares, /health, montaje de rutas, manejo de errores |
| src/routes/productos.routes.js | Presentación | Método HTTP + URI → función del controlador |
| src/controllers/productos.controller.js | Presentación | Lee la petición, llama al servicio, arma la respuesta |
| src/services/productos.service.js | Lógica de negocio | Validaciones y reglas; no conoce HTTP ni la base de datos |
| src/repositories/productos.repository.js | Acceso a datos | Guarda y consulta (en memoria en el Taller 1) |
| src/models/producto.js | Modelo | Atributos de la entidad y su validación |
| src/utils/http-error.js | Utilidad | Error con código de estado HTTP |

## Endpoints (Taller 1)

| Método | URI | Respuesta |
|---|---|---|
| GET | /health | 200 `{"servicio":"ms-productos","estado":"ok"}` |
| GET | /productos | 200 arreglo de productos |
| GET | /productos/:id | 200 registro · 400 id inválido · 404 no existe |
| POST | /productos | 201 registro creado + cabecera Location · 400 datos inválidos · 409 nombre repetido |

Ejemplo de cuerpo para POST:
`{"nombre": "Aguacate Hass", "categoria": "fruta", "unidad": "kg", "precio": 9800}`
