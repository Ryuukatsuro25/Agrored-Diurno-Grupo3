# AgroRed S.A. · Aplicación web (Módulo 3)

Redes y Servicios Multimedia · UAO · Agroindustria y distribución.
Aplicación con microservicios REST en Node.js + Express, desplegada sobre el ambiente
del Módulo 2 (servidor1 172.16.1.198 y servidor2 172.16.1.199, dominio agrored.com).

## Integrantes

| Integrante | Usuario de GitHub | Microservicio |
|---|---|---|
| (nombre) | (usuario) | ms-productos |
| (nombre) | (usuario) | ms-clientes |
| (nombre) | (usuario) | ms-pedidos |

## Microservicios

| Microservicio | Entidad | Puerto | Referencia a |
|---|---|---|---|
| ms-usuarios | Usuario (entregado por la docente) | 3001 | — |
| ms-productos | Producto | 3002 | — |
| ms-clientes | Cliente | 3003 | — |
| ms-pedidos | Pedido | 3004 | ms-clientes (cliente_id), ms-productos (producto_id) |

Roles de la aplicación: administrador, comercial, produccion.
