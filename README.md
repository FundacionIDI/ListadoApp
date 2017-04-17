# Listado APP

Crear una aplicación con su backend que mueste un listado de la entidad, permita crear entidades desde la vista de listado, muestre los detalles de una entidad y desde allí se puedan editar o eliminar.

Descripción entidad:

Nombre: Vehiculo

Propiedades:
 - Modelo
 - Marca
 - Color
 - Placa
 - Precio
 - Año
 - Tipo (Carro, Camioneta, Camión, Bus, Buseta, etc)

Es optimo que creen un controlador con los siguientes métodos: listar, crear, guardar, eliminar.

Al momento de crear la applicación seleccionan la carpeta `app`.

No es necesario que muevan la carpeta `backend` a htdocs, puede ejecutar con php:
Abran una terminal en la carpeta `backend` y ejecuten:
```
php -S localhost:8000
```
Pueden usar cualquier puerto que tengan desocupado: 8000, 8080, 8081, 12345, etc

Al momento de hacer las peticiones al backend desde la app probablemente necesiten cambiar `locahost` por la ip local de su equipo, que puede ser `192.168.0.XXX`, `192.168.1.XXX`, etc


- [CodeIgniter User Guide](https://www.codeigniter.com/user_guide/)
- [CodePath Android Guide](https://guides.codepath.com/android)
- [Android Studio | Guía del usuario](https://developer.android.com/studio/intro/index.html)

