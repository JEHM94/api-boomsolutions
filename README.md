<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Rest API
_Servicio de API para el Registro de Productos con NestJS y TypeORM._
# :page_facing_up:Guía de Instalación

> [!IMPORTANT]
>### :small_blue_diamond:Para sistemas operativos Linux y MacOS
>- Si el entorno de trabajo es Linux o MacOS debe hacer el siguiente cambio en el archivo ```package.json``` (estos cambios no aplican para Windows)
>
>En la sección de ``` "scripts" ``` sustituir las lineas:
>```
>"start:dev": "cross-env NODE_ENV=development nest start --watch",
>"start:prod": "cross-env NODE_ENV=production node dist/main"
>```
>por
>```
>"start:dev" : "NODE_ENV=development nest start --watch",
>"start:prod": "NODE_ENV=production node dist/main"
>```

### :small_blue_diamond: Instalación de dependencias

- Instalar las dependencias con algún gestor de paquetes como npm, yarm o pnpm
```bash
$ yarn install
```

### :small_blue_diamond:Crea una base de datos
- Crear una base de datos mediante el uso de cualquier herramienta de administración de bases de datos, como MySQL Workbench, phpMyAdmin, Tableplus, etc.
- Renombar el archivo ```.env.development.example``` a ```.env.development```
- Configurar los ajustes de conexión de la base de datos en el archivo ```.env.development```de la aplicación. Por ejemplo:

  ```
  DB_HOST=localhost
  DB_TYPE=mysql
  DB_PORT=3306
  DB_USERNAME=root
  DB_PASSWORD=root
  DB_NAME=my_db
    ```

### :small_blue_diamond:Compila y ejecuta el proyecto
```bash
$ yarn run start:dev
```

# Documentación
> [!IMPORTANT]
> - Puede ver más detalles sobre la documentación y probar los distintos endpoints a través del siguiente endpoint de la aplicación
>```
>http://localhost:3000/api/docs/
>```

## Métodos

| Método | Descripción |
|---|---|
| :green_circle:GET | Obtiene un recurso |
| :large_blue_circle:POST | Crea un recurso |
| :large_blue_circle:PATCH | Actualiza un recurso |
| :red_circle:DELETE | Elimina un recurso |


# Rutas
> [!IMPORTANT]
> - Las rutas con autenticación de tipo "Auth" requieren de un Bearer Token que debe ser ingresado por medio de los headers de la solicitud.
> - El body de la solicitud debe contener los parámetros de entrada requeridos por la ruta.

## :diamond_shape_with_a_dot_inside:Docs
| Ruta | Método | Descripción | Autenticación |
|---|---|---|---|
| /api/docs | :green_circle:GET | Documentación de la API | Guest |

## :diamond_shape_with_a_dot_inside:Auth
| Ruta | Método | Descripción | Autenticación |
|---|---|---|---|
| /api/v1/auth/register | :large_blue_circle:POST | Registra un nuevo usuario | Guest |
| /api/v1/auth/login | :large_blue_circle:POST | Autentica un usuario | Guest |

#### :small_blue_diamond:Parámetros de entrada

| Ruta | Método | Parámetro | Descripción |
|---|---|---|---|
| /api/v1/auth/register| :large_blue_circle:POST | name | Nombre del usuario |
||| email | Correo electrónico |
||| password | Contraseña del usuario |
||| role | Rol del usuario (opcional) |


| Ruta | Método | Parámetro | Descripción |
|---|---|---|---|
| /api/v1/auth/login| :large_blue_circle:POST | email | Correo electrónico |
||| password | Contraseña |

## :diamond_shape_with_a_dot_inside:Product
| Ruta | Método | Descripción | Autenticación |
|---|---|---|---|
| /api/v1/product | :green_circle:GET | Muestra todos los productos | Auth |
| /api/v1/product | :large_blue_circle:POST | Registra un nuevo producto | Auth |
| /api/v1/product/{id} | :green_circle:GET | Busca un producto por su ID | Auth |
| /api/v1/product/{id} | :large_blue_circle:PATCH | Actualiza un producto por su ID | Auth |
| /api/v1/product/{id} | :red_circle:DELETE | Elimina un producto por su ID | Auth |


#### :small_blue_diamond:Parámetros de entrada

| Ruta | Método | Parámetro | Descripción |
|---|---|---|---|
| /api/v1/product | :green_circle:GET | Bearer Token | Token de autenticación generado en la ruta de Login |

| Ruta | Método | Parámetro | Descripción |
|---|---|---|---|
| /api/v1/product| :large_blue_circle:POST | Bearer Token | Token de autenticación generado en la ruta de Login |
||| name | Nombre del producto |
||| description | Descripción del producto |
||| price | Precio del producto |
||| stock | Cantidad de productos disponibles |

| Ruta | Método | Parámetro | Descripción |
|---|---|---|---|
| /api/v1/product/{id}| :green_circle:GET / :red_circle:DELETE | Bearer Token | Token de autenticación generado en la ruta de Login |
||| {id} | ID del producto |


| Ruta | Método | Parámetro | Descripción |
|---|---|---|---|
| /api/v1/product/{id}| :large_blue_circle:PATCH | Bearer Token | Token de autenticación generado en la ruta de Login |
||| {id} | ID del producto |
||| name | Nombre del producto (opcional) |
||| description | Descripción del producto (opcional) |
||| price | Precio del producto (opcional) |
||| stock | Cantidad de productos disponibles (opcional) |

# Ejemplo de uso
- Para registrar un nuevo producto debemos enviar una solicitud de método ``` POST ``` a la ruta ``` /api/v1/product ``` y construimos la consulta con los parámetros de entrada requeridos por el servicio de la siguiente manera
```
headers: {
    Authorization: `Bearer PU100RI9gv9179uId0QFkmkU5TVMdsUq0KK1S3yX7c1e4bd1`,
},
body:{
    "name": "Camisa",
    "description": "Nuevos modelos",
    "price": 9.99,
    "stock": 10
}
```
donde ```headers``` contiene la información del token de autenticación el cuál lo provee el servicio de autenticación de usuarios a través de la ruta ``` /api/v1/auth/login ```; y ``` body ``` contiene los parámetros requerios por el servicio para ingresar la información a la base de datos.
