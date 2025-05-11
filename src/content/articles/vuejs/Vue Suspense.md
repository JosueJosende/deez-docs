---
title: "Suspense: Carga asíncrona"
description: "Gestionar componentes asíncronos y estados de carga en Vue 3 con Suspense."
pubDate: 2025-02-05
category: "VueJS"
tags: ["vue", "composition-api", "frontend", "suspense"]
author: "deezdev"
featured: false
---

# Suspense en Vue 3

**Suspense** es una potente característica introducida en Vue 3 que permite gestionar componentes asíncronos y mejorar la experiencia de usuario mostrando estados de carga y contenido alternativo.

Proporciona una forma sencilla de suspender el renderizado hasta que los datos (por ejemplo, de un fetch) o los componentes necesarios estén totalmente disponibles. Así, puedes crear aplicaciones más fluidas y profesionales.

---

### 🤔 ¿Qué es Suspense y para qué sirve?

El concepto de Suspense proviene de React y se ha implementado en Vue 3 para abordar la gestión de componentes asíncronos. Estos componentes necesitan obtener datos o realizar alguna operación antes de mostrarse en la vista.

Vue 3 simplifica este proceso permitiendo definir de forma declarativa el estado de carga y el contenido alternativo. Así, puedes controlar cómo se comporta tu app mientras espera que se completen operaciones asíncronas.

---

### 🛠️ ¿Cómo se usa Suspense en Vue 3?

Para aprovechar Suspense, necesitas conocer estos conceptos clave:

1. **Componentes asíncronos**: Son componentes que se cargan de manera asíncrona, por ejemplo, al obtener datos de una API. Se definen con la función `defineAsyncComponent`.
2. **Fallback (contenido alternativo)**: Permite mostrar un componente o mensaje mientras se cargan los datos o el componente asíncrono.
3. **Gestión de errores**: Suspense también permite manejar errores durante la carga, mostrando mensajes o componentes alternativos si algo falla.

---

### 📦 Ejemplo básico de Suspense en Vue 3

Veamos un ejemplo práctico de cómo usar Suspense:

```vue
<script setup>
import { defineAsyncComponent } from 'vue';
import OtroComponenteNoAsincrono from './OtroComponenteNoAsincrono.vue';

const ComponenteAsincrono = defineAsyncComponent(() =>
  import('./ComponenteAsincrono.vue')
);
</script>

<template>
  <div>
    <h1>Ejemplo de componente asíncrono</h1>
    <Suspense>
      <template #default>
        <ComponenteAsincrono />
      </template>
      <template #fallback>
        <OtroComponenteNoAsincrono />
      </template>
    </Suspense>
  </div>
</template>
```

🔎 **Explicación:**
- El componente `ComponenteAsincrono` se carga de forma asíncrona.
- Mientras se carga, se muestra `OtroComponenteNoAsincrono` como fallback.
- Cuando la carga termina, se muestra el componente asíncrono.

---

### ⚠️ Gestión de errores en Suspense

Puedes manejar errores usando el hook `onErrorCaptured` o mostrando un fallback especial para errores:

```vue
<Suspense>
  <template #default>
    <ComponenteAsincrono />
  </template>
  <template #fallback>
    <span>Cargando...</span>
  </template>
  <template #error>
    <span>❌ Error al cargar el componente.</span>
  </template>
</Suspense>
```

---

### 💡 Consejos útiles

- Usa Suspense para mejorar la experiencia de usuario en cargas de datos o componentes pesados.
- Puedes anidar varios Suspense para gestionar diferentes zonas de tu app.
- El fallback puede ser cualquier componente, animación o mensaje personalizado.

---

### 🎯 Conclusión

Suspense en Vue 3 te permite gestionar la carga asíncrona de componentes de forma elegante y declarativa, mejorando la experiencia de usuario y el control sobre los estados de tu aplicación. ¡Experimenta y lleva tus apps al siguiente nivel! 🚀