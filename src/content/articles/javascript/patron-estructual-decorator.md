---
title: 'Patrón Estructural Decorator'
description: 'Añade funcionalidades a objetos de forma dinámica.'
pubDate: 2025-10-28
category: 'JavaScript'
tags: ['JavaScript', 'Patrones de Diseño', 'Programación']
---

# Patrones Estructurales, Empezaremos con uno de los más ingeniosos y útiles: Decorator

Imagina que vas a una heladería. Pides una bola de helado de vainilla. Este es tu objeto **básico**. Es simple y delicioso por sí solo.

Pero entonces, el heladero te pregunta: "¿Quieres añadirle algo?". Y tú dices:
"¡Claro! Ponle sirope de chocolate".

![helado con sirope](/public/heladeria-decorator.webp)

El heladero no te da un helado nuevo que ya venía con sirope. No, él coge tu helado de vainilla original y lo **decora** con el sirope. El sirope añade sabor y un coste extra.

Luego, te animas y dices: "¡Y también ponle chispas de colores!".

De nuevo, él coge tu helado (que ahora ya tiene sirope) y le añade una nueva capa: las chispas. Cada "extra" que añades es un **Decorador**. Envuelve al helado anterior y le añade una nueva característica (sabor, textura) y modifica otra (el precio). Al final, sigues teniendo un helado, pero ¡mucho más increíble!

El patrón de diseño Decorator te permite **añadir nuevas funcionalidades o responsabilidades a un objeto de forma dinámica**, sin tener que cambiar su código original. Lo "envuelves" en capas, como las capas de toppings en tu helado.

### ¿Cuál es el problema que soluciona?

Imagina que estamos programando el menú de una cafetería. Tenemos un `CafeSimple`. Luego, los clientes pueden querer un `CafeConLeche`. O un `CafeConCrema`. O un `CafeConLecheYCrema`. O un `CafeConLecheCremaYChocolate`...

Si creáramos una clase para cada posible combinación, ¡tendríamos cientos de clases!
`class CafeConLeche { ... }`
`class CafeConLecheYCrema { ... }`
`class CafeDobleLecheYCrema { ... }`

¡Sería una locura inmanejable! El Decorador nos salva de este caos.

### ¡Preparemos un café con Decoradores!

Vamos a montar nuestra cafetería virtual en JavaScript.

Primero, nuestro producto base. Todos los cafés, no importa qué lleven, tendrán un `costo` y una `descripcion`.

```javascript
// --- Paso 1: El objeto base (nuestra bola de helado de vainilla) ---
class CafeSimple {
  costo() {
    return 10 // Cuesta 10
  }

  descripcion() {
    return 'Café simple'
  }
}
```

Ahora, vamos a crear nuestros "toppings" o "extras". Estos son los Decoradores. La clave es que cada decorador **envuelve** a otro café.

```javascript
// --- Paso 2: Crear los Decoradores (los toppings) ---

// Decorador para añadir Leche
class ConLeche {
  constructor(cafe) {
    // El truco: el decorador ENVUELVE a otro café (simple o ya decorado)
    this.cafeEnvuelto = cafe
  }

  costo() {
    // Calcula el costo del café que está envolviendo y le suma el suyo
    return this.cafeEnvuelto.costo() + 2 // La leche cuesta 2 extra
  }

  descripcion() {
    // Añade su propia descripción a la del café que envuelve
    return this.cafeEnvuelto.descripcion() + ', con leche'
  }
}

// Decorador para añadir Crema
class ConCrema {
  constructor(cafe) {
    this.cafeEnvuelto = cafe
  }

  costo() {
    return this.cafeEnvuelto.costo() + 4 // La crema cuesta 4 extra
  }

  descripcion() {
    return this.cafeEnvuelto.descripcion() + ', con crema'
  }
}
```

### La Magia de Envolver

Ahora viene la parte divertida. Vamos a preparar un pedido complicado, envolviendo nuestro café capa por capa, como si fueran muñecas rusas.

```javascript
// --- Paso 3: ¡A preparar el pedido! ---

// 1. Empezamos con la base
let miCafe = new CafeSimple()
console.log(`${miCafe.descripcion()} cuesta: ${miCafe.costo()}`)
// Salida: Café simple cuesta: 10

// 2. El cliente lo quiere con leche. ¡Lo decoramos!
// Creamos un decorador ConLeche y le pasamos nuestro café simple.
miCafe = new ConLeche(miCafe)
console.log(`${miCafe.descripcion()} cuesta: ${miCafe.costo()}`)
// Salida: Café simple, con leche cuesta: 12

// 3. ¡El cliente también quiere crema! Volvemos a decorar.
// Creamos un decorador ConCrema y le pasamos nuestro café ¡que ya tenía leche!
miCafe = new ConCrema(miCafe)
console.log(`${miCafe.descripcion()} cuesta: ${miCafe.costo()}`)
// Salida: Café simple, con leche, con crema cuesta: 16

// 4. ¡Se siente goloso y pide DOBLE ración de leche!
// No hay problema, ¡volvemos a decorar con Leche!
miCafe = new ConLeche(miCafe)
console.log(`${miCafe.descripcion()} cuesta: ${miCafe.costo()}`)
// Salida: Café simple, con leche, con crema, con leche cuesta: 18
```

### Repasemos los pasos clave:

1.  **El Objeto Base:** Tienes un objeto simple y original (`CafeSimple`).
2.  **La Interfaz Común:** Tanto el objeto base como los decoradores tienen los mismos métodos (`costo` y `descripcion`). Esto es fundamental para que se puedan usar indistintamente.
3.  **Los Decoradores (Envoltorios):** Creas clases decoradoras (`ConLeche`, `ConCrema`) que aceptan en su constructor un objeto del tipo que van a decorar.
4.  **El Encadenamiento Mágico:** Dentro de sus métodos, los decoradores primero llaman al método del objeto que están envolviendo y luego le añaden su propia lógica. `costoDelEnvuelto + miCosto`.

### Ventajas de usar Decorator

- **Añadir "superpoderes" sin cambiar el original:** No tuvimos que modificar la clase `CafeSimple` para nada. Podemos añadir infinitas funcionalidades nuevas sin tocar el código que ya funcionaba. (Esto se conoce como el Principio Abierto/Cerrado).
- **Evitar una explosión de clases:** No necesitamos una clase para cada combinación. Tenemos 3 clases en total y podemos crear infinitas recetas de café.
- **Flexibilidad máxima:** Puedes añadir (¡e incluso quitar!) funcionalidades en tiempo de ejecución, de forma totalmente dinámica.
- **Combinaciones infinitas:** Puedes mezclar y combinar los decoradores como quieras.

En resumen, el patrón Decorador es tu herramienta para "tunear" objetos. Te permite coger algo simple y añadirle capas de funcionalidad de forma limpia, ordenada y súper flexible.
