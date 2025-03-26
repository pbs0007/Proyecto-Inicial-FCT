# Proyecto: Web de Gestión de Inventario con React y Supabase

Este proyecto tiene como objetivo crear una aplicación web que permita a pequeños negocios gestionar su inventario de productos de manera eficiente y fácil de usar. Utilizaremos **React** para la interfaz de usuario y **Supabase** para la gestión de la base de datos, la autenticación y las notificaciones en tiempo real.

## Funcionalidades

### 1. **Autenticación de Usuarios**

- Inicio de sesión con correo electrónico y contraseña.

### 2. **Gestión de Productos**

- Los usuarios podrán agregar, editar y eliminar productos.
- Cada producto tendrá los siguientes campos:
  - Nombre
  - Descripción
  - Categoría
  - Cantidad en stock
  - Precio

### 3. **Búsqueda y Filtrado**

- Los usuarios podrán buscar productos por nombre o categoría.
- **Opcional**: Filtrar productos por precio o cantidad en stock.

### 4. **Base de Datos en Tiempo Real**

- Usaremos **Supabase** (basado en PostgreSQL) para almacenar y sincronizar los productos de forma instantánea.

### 5. **Notificaciones de Stock Bajo**

- La aplicación enviará notificaciones push cuando un producto esté por agotarse.

## Requisitos

- **Node.js** y **npm** instalados en tu máquina.
- Una cuenta en **Supabase** para configurar la base de datos y la autenticación.

## Instalación

1. Clona este repositorio en tu máquina local:

   ```bash
   git clone https://github.com/pbs0007/Proyecto-Inicial-FCT.git
   ```
