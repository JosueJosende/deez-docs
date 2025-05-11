---
title: "Fetching de datos en Vue 3"
description: "Optimiza la obtención de datos en Vue 3."
pubDate: 2025-01-15
category: "VueJS"
tags: ["vue", "composition-api", "frontend"]
author: "deezdev"
featured: false
---

# Fetching de datos en Vue 3

La optimización del fetching de datos es crucial para un buen rendimiento y experiencia de usuario en tu página web. Vue ofrece diferentes maneras de hacerlo, pero encontrar la mejor estrategia para cada tipo de llamada no siempre es sencillo. ¡Vamos a verlo con ejemplos y consejos! 🚀

---

### Diferentes tipos de llamadas API

No todas las llamadas API son iguales. Podemos separarlas en dos categorías principales:

1. **Llamadas para recuperar datos de aplicación** (afectan a toda la app)
2. **Llamadas para recuperar datos de la página web** (específicas de cada vista)

Cada una se gestiona de manera diferente y tiene implicaciones en el rendimiento y la experiencia de usuario.

---

### Recuperar datos de aplicación

Estas son las llamadas que afectan a la aplicación entera y deben enviarse lo antes posible. Por ejemplo, cuando necesitas recuperar la configuración global, información de autenticación, etc.

La opción más común y fácil de entender es hacer el fetching de datos desde el archivo **main.js**. Así, los datos estarán disponibles antes de montar la app.

#### Ejemplo: Recuperar configuración global

```js
// /src/composables/useAppSettings.js
import { ref } from 'vue'
import { fetchAppSettings } from '@/composables/appSettings/api'

const appSettings = ref()

export function useAppSettings() {
  async function fetch() {
    const response = await fetchAppSettings()
    appSettings.value = response
  }
  return { appSettings, fetch }
}
```

Ahora, desde el archivo principal de la aplicación **main.js** puedes hacer las llamadas API:

```js
// main.js
import { createApp } from 'vue'
import './styles.css'
import App from './App.vue'

import { useAuth } from '@composables/auth/useAuth'
import { useAppSettings } from '@composables/appSettings/useAppSettings'
// import { useOtherComposable } from '@composables/otherComposable/useOtherComposable'

await useAuth().authenticate()
await useAppSettings().fetch()
// await useOtherComposable()

createApp(App).mount('#app')
```

De esta manera, cada composable es iniciado y recupera los datos inmediatamente. 

> ⚠️ **Nota:** Cada llamada usa la palabra reservada `await`, por lo que se ejecutan de forma secuencial:
> 
> **Authenticate**  ➡️ **Settings** ➡️ **OtherComposable**

Esto afecta a la carga inicial: la app esperará a que se cumplan estas llamadas antes de renderizar.

#### 🚀 Ejecutar llamadas en paralelo

Puedes mejorar el rendimiento ejecutando varias promesas en paralelo usando `Promise.all`:

```js
// main.js
import { createApp } from 'vue'
import './styles.css'
import App from './App.vue'

import { useAuth } from '@composables/auth/useAuth'
import { useAppSettings } from '@composables/appSettings/useAppSettings'
// import { useOtherComposable } from '@composables/otherComposable/useOtherComposable'

await useAuth().authenticate()

await Promise.all([
  useAppSettings().fetch(),
  // useOtherComposable()
])

createApp(App).mount('#app')
```

Primero nos autenticamos y luego recuperamos la configuración y otros datos en paralelo. ¡Esto acelera la carga! ⚡

> ❌ **No elimines los `await` solo para mejorar el rendimiento**: Si lo haces, la app se renderizará con valores por defecto y luego actualizará la UI, lo que puede causar una mala experiencia y errores.

---

### Recuperar datos de página

Cuando necesitas obtener datos específicos para una página o vista (por ejemplo, detalles de un producto, perfil de usuario, etc.), lo ideal es hacer el fetching dentro del propio componente de la página. Así, cada vez que el usuario navegue a esa ruta, se cargarán los datos necesarios.

Vue 3 permite combinar la función `async setup()` con `<Suspense>` para gestionar el estado de carga de forma sencilla y visual.

#### Ejemplo: Fetching de datos en un componente de página

```vue
<script setup>
import { ref } from 'vue'

const datos = ref(null)
const cargando = ref(true)

async function fetchDatos() {
  const res = await fetch('https://api.ejemplo.com/datos')
  datos.value = await res.json()
  cargando.value = false
}

await fetchDatos()
</script>

<template>
  <Suspense>
    <template #default>
      <div v-if="datos">
        <h2>Datos cargados:</h2>
        <pre>{{ datos }}</pre>
      </div>
    </template>
    <template #fallback>
      <span>⏳ Cargando datos de la página...</span>
    </template>
  </Suspense>
</template>
```

🔎 **Explicación:**
- Usamos `async setup()` para esperar a que los datos estén listos antes de renderizar la vista.
- `<Suspense>` muestra el fallback (mensaje de carga) mientras se obtienen los datos.
- Cuando termina el fetch, se muestra el contenido real.

> 💡 **Consejo:** Puedes personalizar el fallback con animaciones, skeletons o cualquier componente visual.

---

## Resumen y buenas prácticas

- Usa el fetching en el **main.js** para datos globales de la app.
- Haz el fetching en el **componente de página** para datos específicos de cada vista.
- Aprovecha `<Suspense>` para mostrar estados de carga y mejorar la experiencia de usuario.
- Ejecuta llamadas en paralelo cuando sea posible para acelerar la carga inicial.
- No elimines los `await` si necesitas los datos antes de renderizar.

¡Con estos consejos y ejemplos, tendrás un fetching de datos en Vue 3 optimizado, claro y profesional!