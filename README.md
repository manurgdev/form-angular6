# FormAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

## Development server

1) Primero instalamos todas las dependencias del fichero package.json con el siguiente comando:

`npm install`

2) Antes de iniciar el servidor tenemos que asegurarnos de tener mongo funcionando.

3) Ahora ejecutamos el siguiente comando que lanzará tanto la app angular como la api en node:

`npm start`

Este comando por dentro tiene la orden `node scripts/index.js | ng serve` que despliega ambos entornos.

4) Una vez compilado ya podemos trabajar con la aplicación accediendo a `http://localhost:4200/`