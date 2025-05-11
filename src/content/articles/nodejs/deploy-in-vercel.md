---
title: "Desplegar un proyecto en Vercel"
description: "Prepara y despliega tu backend Node.js/Express en Vercel."
pubDate: 2025-02-08
category: "NodeJS"
tags: ["production", "nodejs", "vercel", "backend"]
author: "deezdev"
---

# Guía paso a paso: prepara y despliega tu backend Node.js/Express en Vercel

¿Quieres poner tu backend en producción de forma sencilla y gratuita? Vercel es una excelente opción para desplegar proyectos Node.js y Express, permitiéndote tener tu API online en minutos. Aquí tienes una guía clara y visual para que no te pierdas en el proceso. ¡Vamos a ello! 😎

---

### Preparar el proyecto

Antes de nada, si no tienes el archivo `package.json`, desde la terminal ejecuta:

```sh
npm init -y
```

> **Importante:** El archivo principal debe llamarse **index.js** (no app.js ni server.js). Además, en el `package.json` el campo `main` debe apuntar a `index.js`.

---

### ⚙️ Configuración de Vercel

Crea un archivo llamado `vercel.json` en la raíz del proyecto con la siguiente configuración básica:

```json
{
    "builds": [
        {
            "src": "./index.js",
            "use": "@vercel/node"
        }
    ],
    "routes": [
        {
            "src": "/(.*)",
            "dest": "/"
        }
    ]
}
```

- **builds**: Define cómo se construye la app. Aquí usamos `index.js` con el entorno `@vercel/node`.
- **routes**: Redirige todas las rutas a la raíz (`/`).

---

### 📁 Estructura recomendada del proyecto

Asegúrate de tener estos archivos y carpetas:

```
📁 node_modules  
📄 index.js  
📄 package.json  
📄 package-lock.json  
📄 vercel.json  
```

---

### ☁️ Desplegando el proyecto

Puedes desplegar de dos formas: vinculando el repositorio en la web de Vercel o usando la CLI de Vercel desde la terminal.

#### Usando la CLI de Vercel

1. Instala la CLI globalmente:

   ```sh
   npm install -g vercel
   ```

2. Ejecuta el comando de despliegue:

   ```sh
   vercel
   ```

3. Responde a las preguntas interactivas:
   - **Set up and deploy**: [y]
   - **Which scope do you want to deploy to?**: tu_cuenta_vercel
   - **Link to existing project?**: [n] (a menos que ya tengas uno)
   - **What's your project's name?**: elige un nombre
   - **In which directory is your code located?**: `./` (por defecto)

---

### Subir a producción

Cuando todo esté listo y probado, sube tu proyecto a producción con:

```sh
vercel --prod
```

¡Listo! Ahora tu API Node.js/Express está online y lista para usarse. 🎉

> 💡 **Consejo:** Consulta los logs y la documentación de Vercel si tienes algún error durante el despliegue.
