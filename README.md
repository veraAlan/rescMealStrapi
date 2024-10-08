##  RescMealStrapi

Este proyecto demuestra el uso de Strapi + Next.js. Este proyecto fue hecho para Frameworks e Interoperabilidad (FeI).

## Información

- Strapi: v5.0.1
- Next.js: 14.2.13

## Requerimientos

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com)
- [MySQL](https://www.mysql.com)
- [Strapi](https://strapi.io)
- [Next.js](https://nextjs.org)

**Nota:** Las versiones que soporta Strapi son la v18 y v20. Las versiones como la v19, v21 no son compatibles con Strapi.

## Instrucciones de uso

1. Clonar el repositorio en tu directorio referido:

```
git clone https://github.com/veraAlan/rescMealStrapi.git
```

2. Posicionarse en /rescMealStrapi

```
cd rescMealStrapi
```

3. Dentro vamos a tener dos carpetar una para el Backend (Contiene Strapi) y otra para el Frontend (Contiene Next.js). Empecemos por el Backend. Nos movemos al directorio Backend.

```
cd Backend
```

4. Installar las dependencias de npm en el projecto:

```bash
npm install o npm i
```

5. En el archivo .env.example, dentro de la carpeta Backend, primero cambian el nombre a .env y agregan la configuración de la conexión a la base de datos:

**Nota:** Debe tener creada la base de datos previamente en MySQL sin tablas. Antes de ejecutar Strapi. Con el comando:

```
CREATE DATABASE rescmealstrapi;
```

```
# Server
HOST=0.0.0.0
PORT=1337

# Database
DATABASE_CLIENT=mysql
DATABASE_HOST=127.0.0.1
DATABASE_PORT=3306
DATABASE_NAME=rescmealstrapi
DATABASE_USERNAME=USER
DATABASE_PASSWORD=PASSWORD
DATABASE_SSL=false
DATABASE_FILENAME=
```

6. Debe hace un import de los datos de la base de datos. Posicioneas en la carpeta Backend:

```
npx strapi export -f database\migrations\export-database.tar.gz.enc -k 123456789
```

7. Listo una vez instalo las deperendecia y configurada la base de datos. Inicializa el proyecto de Strapi con el comando:

```
npm run develop
```

8. Ahora toca configurar el Frontend. Nos movemos al directorio Frontend.

```
cd Frontend
```

9. Installar las dependencias de npm en el projecto:

```
npm install o npm i
```

10. Listo una vez instalo las deperendecia. Inicializa el proyecto de Next.js con el comando:

```
npm run dev
```
**Nota:** Debe tener tanto Strapi como Next.js ejecutando simultameamente para que funcione el proyecto.

## Cursada 2024

- Universidad Nacional del Comahue
- Facultad de Informatica (FAI)
- Tecnicatura Universitaria en Desarrollo Web
- Frameworks e Interoperabilidad (FeI)

## Alumnos - Grupo 14

- **Acosta Demian Aaron**

  - Legajo FAI - 2592
  - Mail Personal: demian.acosta@est.fi.uncoma.edu.ar
  - Usuario GitHub: acostaDemianAaron

- **Vera Alan Cristian Gaston**

  - Legajo FAI - 2622
  - Mail Personal: alan.vera@est.fi.uncoma.edu.ar
  - Usuario GitHub: veraAlan

- **Yaitul Santiago Alejo**

  - Legajo FAI - 2339
  - Mail Personal: santiago.yaitul@est.fi.uncoma.edu.ar
  - Usuario GitHub: SantiagoYaitul
