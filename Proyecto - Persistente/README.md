API Delilah Restó

La API de delilah  restó - Persistentefacilita el proceso de pedidos por parte de los usuarios del restaurante. Además de otorgarle control al resturante sobre sus productos y pedidos.

Installation

Se descarga el proyecto en el link de repositorio: https://github.com/mfparra154/Sprint-Project/tree/Persistencia y se instala con el siguiente comando:
npm install


Usage

1. Ya teniendo abierto el proyecto en VSC, se abre una nueva terminal y se corre el comando: mongod

2. Posteriormente, se procede a conectar el proyecto con la base de datos, en mi caso utilizaba Mongo compass. Para hacer la conección con mongo compass es necesraio dar click 
en la parte superior "Fill in connection fields individually" y poner los siguientes datos:

Hostname:localhost
Post:27017
Authntication: none

3.Es necesario tener redis instalado para usar la cache, el puerto por defecto es 6379. , si quieres correrlo desde otro debes modificar la variable de entorno en el documento .env .

3. Después, se  ejecuta el proyecto con el comando:  npm run dev
 en la consola.  Se testea con el comando npm run test
 
 Se entra a Swagger con el link localhost 
http://localhost:3000/api-docs/

 Se puede acceder con el bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlzYUBnbWFpbC5jb20iLCJpYXQiOjE2MzE0ODQ4MjR9.xJTRwgoXeZG3iK2yMg_noOMTtzeZl50U8fU-i2Zby7E

. Todas los endpoints o rutas funcionan para el Admin, dado que
esta registrado como un usuario quien puede hacer pedidos.

