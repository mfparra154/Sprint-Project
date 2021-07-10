API Delilah Restó

La API de delilah restó facilita el proceso de pedidos por parte de los usuarios del restaurante. Además de otorgarle control al resturante sobre sus productos y pedidos.

Installation

Se descarga el proyecto en el link de repositorio: https://github.com/mfparra154/Sprint-Project y se instala con el siguiente comando:
npm install


Usage

1.Se  ejecuta el proyecto con el comando: nodemon src/index.js
 en la consola.
 
2. Se entra a Swagger con el link localhost 
http://localhost:3000/api-docs/

3. Se puede acceder como administrador con el usuario: Admin 
contrasena: 123456 y como usuario con el usuario:Mafe
contrasena: 12345678.


4. Todas los endpoints o rutas funcionan para el Admin, dado que
esta registrado como un usuario quien puede hacer pedidos.

5. Para los usuarios que no son Admin, en este caso (Mafe), se puede acceder a las rutas:

- Mostrar medios de pago.
- Pedidos/mi pedido
- Crear pedidos
pedidos- actualizar- confirmar.
