# AgroRed S.A. · Aplicación web (Módulo 3)

Redes y Servicios Multimedia · Universidad Autónoma de Occidente · Agroindustria y distribución.

Aplicación web de **AgroRed S.A.** para gestionar productos, clientes y pedidos, con inicio de
sesión por rol. Está construida con microservicios REST en **Node.js + Express**, organizados en
capas, y se despliega sobre el ambiente del Módulo 2 (servidor1 172.16.1.198 y servidor2
172.16.1.199, dominio `agrored.com`).

## Integrantes

| Integrante | Usuario de GitHub | Microservicio | Puerto |
|---|---|---|---|
| Juan Pablo Rueda Sánchez | [Juanrueda236](https://github.com/Juanrueda236) | ms-productos | 3002 |
| Juan José Osorio Reyes | [Ryuukatsuro25](https://github.com/Ryuukatsuro25) | ms-clientes | 3003 |
| Valeria Polanco Muñoz | [Val-polanco](https://github.com/Val-polanco) | ms-pedidos | 3004 |

El grupo tiene 3 integrantes, por lo que implementa las tres primeras entidades de AgroRed
(productos, clientes y pedidos), como indica el documento del microproyecto.

## Microservicios

| Microservicio | Entidad | Responsable | Puerto | Base de datos | Referencia a |
|---|---|---|---|---|---|
| ms-usuarios | Usuario (entregado por la docente) | Docente | 3001 | usuarios_db | — |
| ms-productos | Producto | Juan Pablo Rueda Sánchez | 3002 | productos_db | — |
| ms-clientes | Cliente | Juan José Osorio Reyes | 3003 | clientes_db | — |
| ms-pedidos | Pedido | Valeria Polanco Muñoz | 3004 | pedidos_db | ms-clientes (`cliente_id`), ms-productos (`producto_id`) |

| Microservicio | Qué gestiona | Regla de negocio |
|---|---|---|
| ms-usuarios | Usuarios que inician sesión y su rol | El email es único (409) |
| ms-productos | Catálogo: nombre, categoría, unidad y precio | El nombre es único sin distinguir mayúsculas (409) |
| ms-clientes | Distribuidores y comercios: nombre, NIT, ciudad, teléfono y tipo | El NIT es único (409) y tiene formato `900123456-7` |
| ms-pedidos | Pedidos: cliente, producto, cantidad, centro de distribución, estado y fecha | Todo pedido nuevo empieza en estado `recibido`; sin fecha, usa la de hoy |

Cada microservicio es dueño exclusivo de su base de datos: ninguno lee la base de otro.

## Relaciones entre microservicios

La única relación es **Pedidos → Clientes y Productos**. ms-pedidos guarda solo los ids
(`cliente_id`, `producto_id`) y consulta a los otros dos por REST:

| ms-pedidos consulta | Petición | Cuándo | Qué usa |
|---|---|---|---|
| ms-clientes | `GET /clientes/:id` | Al crear o editar un pedido | Si existe (200) o no (404 → el pedido responde 400) |
| ms-clientes | `GET /clientes?ids=1,2,3` | Al consultar pedidos | id y nombre del cliente |
| ms-productos | `GET /productos/:id` | Al crear o editar un pedido | Si existe (200) o no (404 → el pedido responde 400) |
| ms-productos | `GET /productos?ids=1,2,3` | Al consultar pedidos | id, nombre y precio del producto |

Si el servicio consultado no responde, ms-pedidos devuelve 503 al escribir y, al leer, el
objeto relacionado en `null` (degradación controlada). Nadie consulta a ms-usuarios: cada
microservicio verifica el token JWT por su cuenta.

## Roles y permisos

Roles de la aplicación: `administrador`, `comercial`, `produccion`. Cualquier usuario autenticado
consulta (GET); solo los roles indicados crean, modifican o eliminan. Sin token: 401. Rol sin
permiso: 403.

| Entidad | Consultan (GET) | Crean, modifican y eliminan |
|---|---|---|
| Usuarios | administrador | administrador |
| Productos | administrador, comercial, produccion | administrador, produccion |
| Clientes | administrador, comercial, produccion | administrador, comercial |
| Pedidos | administrador, comercial, produccion | administrador, comercial |

## Arquitectura y despliegue

| Pieza | Dónde corre | Tecnología |
|---|---|---|
| Cliente | Anfitrión Windows (172.16.1.193) | Navegador, Postman |
| DNS | servidor1 (172.16.1.198) | bind9, registro `app.agrored.com` → 172.16.1.199 |
| Base de datos | servidor1 | MySQL, una base por microservicio, acceso solo desde servidor2 |
| API Gateway + frontend | servidor2 (172.16.1.199) | Apache: host virtual `app.agrored.com` y proxy inverso `/api/<recurso>` |
| Microservicios | servidor2 | Node.js + Express como servicios systemd, escuchando solo en 127.0.0.1 |
| Seguridad | servidor1 y servidor2 | ufw; tokens JWT emitidos por ms-usuarios |

## Estructura del repositorio

```
├── README.md        ← este archivo
├── postman/         ← ambientes y colección de integración
├── ms-usuarios/     ← entregado por la docente (no se modifica)
├── ms-productos/    ← Juan Pablo Rueda Sánchez
├── ms-clientes/     ← Juan José Osorio Reyes
├── ms-pedidos/      ← Valeria Polanco Muñoz
├── frontend/        ← interfaz web (desde la semana 2)
└── deploy/          ← archivos de despliegue (Taller 3)
```

## Cómo ejecutar un microservicio en su PC

Requisitos: Node.js LTS 22 (22.9 o superior), npm y Git.

```
cd ms-clientes              # o la carpeta del microservicio
npm install
copy .env.example .env      # en Linux/Mac: cp .env.example .env
npm run dev
```

Verificar en el navegador: `http://localhost:<puerto>/health`.

## Convenciones del grupo

- Atributos en `snake_case`, iguales en el JSON de la API y en las columnas de MySQL.
- Cada integrante trabaja solo en su carpeta y sube sus cambios con su propia cuenta de GitHub.
- Commits pequeños con el formato `ms-<recurso>: qué cambió`.
- Nunca se suben `node_modules` ni `.env` (los excluye el `.gitignore` de cada microservicio).
- El repositorio no contiene contraseñas ni datos reales: todos los datos son ficticios.

## Avance

- [x] Taller 1: modelo de dominio y esqueleto en capas con datos en memoria
- [ ] Taller 2:
- [ ] Taller 3:
