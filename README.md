# SEDEL

El Sistema Electrónico Democrático En Linea es un producto diseñado para la gestión y participación en elecciones garantizando los principios de la democracia.

## Arquitectura

Siguiendo una arquitectura hexagonal, el sistema se divide en:
- Front: Parte de frontend para los usuarios
- API: Api que consume el frontend para la gestión de las elecciones
- CA: Autoridad certificadora, encargada de validar los votos mediante certificados electrónicos

## Identificación

La identificación se realiza de dos modos: 
- Usuarios registrados: administradores y gestores de elecciones, que acceden al sistema mediante usuario y contraseña para poder crear / editar las elecciones
- Electores: son los usuarios que votan en las elecciones. Acceden al sistema sin identificarse, y son identificados por la autoridad certificadora mediante un *certificado electrónico*
