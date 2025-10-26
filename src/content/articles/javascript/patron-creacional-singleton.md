---
title: 'Patrón Creacional: Singleton'
description: 'Patrón de diseño Singleton en JavaScript, una única instancia en toda la aplicación.'
pubDate: 2025-10-26
category: 'JavaScript'
tags: ['JavaScript', 'Patrones de Diseño', 'Programación']
---

# Patrón de diseño: **Singleton**

Imagina que en tu videojuego favorito tienes una mochila para guardar todos los objetos que encuentras. Solo tienes **una única mochila** durante todo el juego, ¿verdad? No tendría sentido tener varias mochilas, porque tus cosas estarían repartidas y sería un lío.

![mochila](/public/mochila-singleton.webp)

El patrón de diseño Singleton es exactamente eso: una regla que nos aseguramos de que solo exista **una y solo una** instancia de algo en todo nuestro programa. Como tu mochila en el juego, hay cosas en programación de las que solo queremos tener una versión para todo el mundo.

### ¿Para qué queremos tener solo una cosa?

Piensa en la configuración de una aplicación. Quieres que solo haya un lugar donde se guarde el idioma, el volumen de la música o si el modo oscuro está activado. Si cada parte de la aplicación tuviera su propia configuración, ¡sería un caos!

Otros ejemplos del mundo real podrían ser:

- **Una conexión a la base de datos:** Abrir conexiones a una base de datos cuesta tiempo y recursos. Es mucho más eficiente tener una sola conexión compartida por toda la aplicación.
- **Un servicio de registro (logging):** Para que todos los mensajes de lo que pasa en el programa se guarden en el mismo sitio y en orden.
- **El carrito de la compra en una web:** Solo tienes un carrito para todas tus compras en esa sesión, no uno por cada producto que miras.

### ¿Cómo funciona la "Magia" del Singleton?

Vamos a crear una clase para la configuración de nuestra aplicación. La idea es que la primera vez que alguien pida la configuración, la creamos. Pero si alguien la vuelve a pedir, en lugar de crear una nueva, le damos la que ya habíamos creado.

Aquí tienes un ejemplo sencillo en JavaScript:

```javascript
class ConfiguracionApp {
  constructor() {
    // Si ya existe una instancia de ConfiguracionApp...
    if (ConfiguracionApp.instance) {
      // ...devuelve esa misma instancia.
      console.log('¡Ya existe una configuración! Te doy la misma.')
      return ConfiguracionApp.instance
    }

    // Si no existe, esta es la primera vez.
    console.log('Creando la configuración por primera vez.')

    // Guardamos algunas opciones de configuración.
    this.modoOscuro = false
    this.idioma = 'español'

    // Y lo más importante: guardamos esta nueva instancia
    // para que la próxima vez no se cree una nueva.
    ConfiguracionApp.instance = this
  }

  activarModoOscuro() {
    this.modoOscuro = true
    console.log('Modo oscuro activado.')
  }

  cambiarIdioma(nuevoIdioma) {
    this.idioma = nuevoIdioma
    console.log(`Idioma cambiado a: ${nuevoIdioma}.`)
  }
}

// --- Vamos a probarlo ---

// Pedimos la configuración por primera vez.
const miConfig = new ConfiguracionApp()
// Salida: "Creando la configuración por primera vez."

// Pedimos la configuración otra vez en otra parte del código.
const otraConfig = new ConfiguracionApp()
// Salida: "¡Ya existe una configuración! Te doy la misma."

// Vamos a ver si son la misma "mochila".
console.log(miConfig === otraConfig) // Esto nos dirá: true. ¡Son exactamente la misma!

// Ahora, si cambio algo en una...
miConfig.activarModoOscuro()
// Salida: "Modo oscuro activado."

// ...el cambio se refleja en la otra, ¡porque son la misma!
console.log(`El modo oscuro está: ${otraConfig.modoOscuro}`)
// Salida: "El modo oscuro está: true"
```

### Repasemos los pasos clave:

1.  **La Puerta Secreta:** La clase tiene una forma de saber si ya ha sido creada antes (en nuestro caso, `ConfiguracionApp.instance`).
2.  **El Guardián:** Dentro del `constructor` (que es lo que se ejecuta cuando intentamos crear un objeto nuevo), hay un guardián (`if`) que pregunta: "¿Ya hay una instancia creada?".
3.  **Una sola llave:** Si la respuesta es sí, el guardián te devuelve la instancia que ya existía. Si es no, crea una nueva y la guarda para el futuro.

### Ventajas de usar Singleton

- **Ahorro de recursos:** Evita crear objetos innecesariamente, lo que puede ahorrar memoria y tiempo.
- **Un punto de acceso global:** Tienes un único lugar al que acudir para obtener esa instancia, lo que da orden y control.
- **Estado compartido y consistente:** Asegura que todos los que usan el objeto vean la misma información actualizada, como en nuestro ejemplo del modo oscuro.

¡Y eso es todo! El patrón Singleton es como tener un "objeto único y especial" en tu programa. Es una idea simple pero muy potente que te encontrarás en muchas aplicaciones y librerías famosas.
