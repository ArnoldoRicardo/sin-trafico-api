<!-- @format -->

# railway url
https://sin-trafico-api-production.up.railway.app/

usuario:
`admin`

contraseña:
`passWord123`

# instalacion de ambiente local

## django (backend)

crear virtualevn

`python3 -m venv .env`

activar virtualenv

`source .env/bin/activate`

instalar dependencias

`pip install -r requirements.txt`

aplicar migraciones de base de datos

`python3 manage.py migrate`

crear usuario de pruebas

`python3 manage.py createsuperuser --email admin@example.com --username admin`

te pedira password, en esta guia de pasos usaremos este 'passWord123'

## react (frontend)

instalar dependecias

`cd frontend && npm install`

ejecutar build de desarrollo

`npm run dev`

ejecutar build de produccion

`npm run build`

## ejecutar server

`python3 manage.py runserver`

# ejemplos en curl

## insertar nuevo vehiculo

curl -d '{"owner": "http://127.0.0.1:8000/api/users/1/","Placas": "holas","lat": "50.0","lon": "50.0"}' -H 'Content-Type: application/json' -u admin:passWord123 http://127.0.0.1:8000/api/vehicles/

## editar vehiculo

curl -X PUT -d '{"owner": "http://127.0.0.1:8000/api/users/1/","Placas": "curl","lat": 50.0,"lon": 50.0}' -H 'Content-Type: application/json' -u admin:passWord123 http://127.0.0.1:8000/api/vehicles/1/

## obtener vehiculos

curl -H 'Accept: application/json; indent=4' -u admin:passWord123 http://127.0.0.1:8000/api/vehicles/

## borrar vehiculo

curl -X DELETE -H 'Content-Type: application/json' -u admin:passWord123 http://127.0.0.1:8000/api/vehicles/1/
