# ms-clientes · AgroRed S.A. (Módulo 3, Taller 1)

Redes y Servicios Multimedia · UAO · Microservicio de **clientes** de la aplicación de AgroRed,
con **Node.js + Express** organizado en capas. Adaptado de la plantilla entregada por la docente.

Versión del Taller 1: datos en memoria y tres operaciones (listar, obtener, crear).
En el Taller 2 se agregan PUT y DELETE y el repositorio pasa a MySQL.

## Cómo ejecutarlo

Requisitos: Node.js LTS 22 (22.9 o superior).

```
npm install                 # descarga Express en node_modules
copy .env.example .env      # en Windows (en Linux/Mac: cp .env.example .env)
npm run dev                 # inicia en http://127.0.0.1:3003 y se reinicia al guardar
```

## Capas

| Archivo | Capa | Responsabilidad |
|---|---|---|
| src/index.js | Arranque | Lee PORT y HOST y pone el servidor a escuchar |
| src/app.js | Configuración | Middlewares, /health, montaje de rutas, manejo de errores |
| src/routes/clientes.routes.js | Presentación | Método HTTP + URI → función del controlador |
| src/controllers/clientes.controller.js | Presentación | Lee la petición, llama al servicio, arma la respuesta |
| src/services/clientes.service.js | Lógica de negocio | Validaciones y reglas; no conoce HTTP ni la base de datos |
| src/repositories/clientes.repository.js | Acceso a datos | Guarda y consulta (en memoria en el Taller 1) |
| src/models/cliente.js | Modelo | Atributos de la entidad y su validación |
| src/utils/http-error.js | Utilidad | Error con código de estado HTTP |

## Endpoints (Taller 1)

| Método | URI | Respuesta |
|---|---|---|
| GET | /health | 200 `{"servicio":"ms-clientes","estado":"ok"}` |
| GET | /clientes | 200 arreglo de clientes |
| GET | /clientes/:id | 200 registro · 400 id inválido · 404 no existe |
| POST | /clientes | 201 registro creado + cabecera Location · 400 datos inválidos · 409 NIT repetido |

Ejemplo de cuerpo para POST:
`{"nombre": "Frutas del Pacífico", "nit": "901555222-4", "ciudad": "Buenaventura", "telefono": "3154442211", "tipo": "distribuidor"}`
