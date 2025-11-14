# EFI --- Aplicación full-stack (Frontend React + API Flask)

**Descripción**\
Proyecto que combina un frontend en JavaScript (React + Vite)
con una API REST desarrollada en Python (Flask). El frontend consume la
API para autenticación y recursos.

Repositorios originales: - Frontend:
https://github.com/MateoVrr/efiJavaScript - Backend:
https://github.com/MateoVrr/efiPython3

## Integrantes del Equipo

Facundo Bellandi: [@FacBel](https://github.com/FacBel)

Santiago Capellino: [@SantiiCapee](https://github.com/SantiiCapee)

Mateo Torres: [@MateoVrr](https://github.com/MateoVrr)

---

1.  Requisitos
2.  Preparar y ejecutar la API
3.  Preparar y ejecutar el frontend
4.  Conectar frontend ⇄ backend
5.  Endpoints principales

## 1) Requisitos

-   Git
-   Python 3.10+ (recomendado)
-   virtualenv (opcional)
-   MySQL
-   Node.js 18+ y npm/yarn
-   Navegador moderno

## 2) API --- Instalación y ejecución

1.  Clonar repo:

``` bash
git clone https://github.com/MateoVrr/efiPython3.git
cd efiPython3
```

2.  Crear entorno virtual:

``` bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\Activate.ps1  # Windows
```

3.  Instalar dependencias:

``` bash
pip install -r requirements.txt
```

4.  Iniciar XAMPP y crear una base de datos llamada: db_efipython

Ajustar la cadena de conexión en la configuración:

    mysql+pymysql://usuario:password@localhost/db_efipython

5.  Migraciones:

``` bash
flask db init
flask db migrate -m "create tables"
flask db upgrade
```

6.  Ejecutar:

``` bash
flask run
```

------------------------------------------------------------------------

## 3) Frontend --- Instalación y ejecución

1.  Clonar repo:

``` bash
git clone https://github.com/MateoVrr/efiJavaScript.git
cd efiJavaScript
```

2.  Instalar dependencias:

``` bash
npm install
```

3.  Ejecutar en desarrollo:

``` bash
npm run dev
```

------------------------------------------------------------------------

## 4) Conexión frontend ⇄ backend

El frontend usa:

    import.meta.env.VITE_API_BASE_URL

Las peticiones deben construirse así:

``` js
fetch(`${API_BASE}/login`, {
  method: "POST",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify({ email, password })
});
```

------------------------------------------------------------------------

## 5) Endpoints principales

-   POST /register
-   POST /login
-   GET /users
-   GET /users/`<id>`
-   PUT /users/`<id>`
-   DELETE /users/`<id>`
-   GET /posts
-   GET /posts/`<id>`
-   POST /posts
-   PUT /posts/`<id>`
-   DELETE /posts/`<id>`

------------------------------------------------------------------------

## ACLARACION: Acceso a la zona de administración (creación de categorías)

Para crear categorías, el usuario debe contar con **rol
administrador**.\
El proceso es el siguiente:

### **1. Registrarse como administrador**

Durante el registro, se debe enviar el campo:

    role: "admin"

Solo estos usuarios reciben permisos administrativos.

### **2. Iniciar sesión**

El login devuelve un **token JWT** que incluye el rol del usuario.

### **3. Acceder al panel de administración**

Para ingresar a la zona exclusiva de administradores, se debe navegar a
la ruta:

    /admin

Ejemplo en entorno local:

    http://localhost:5173/admin

Esta vista está protegida:\
✔️ si el usuario tiene rol **admin**, puede acceder\
❌ si no lo tiene, se bloquea el acceso

### **4. Crear categorías**

Dentro del panel `/admin` se encuentra la sección donde los
administradores pueden crear nuevas categorías.\
Los usuarios sin rol admin no pueden acceder ni interactuar con esta
funcionalidad.

------------------------------------------------------------------------
