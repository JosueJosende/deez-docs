---
title: 'Patrón Creacional Prototype'
description: 'Patrón de diseño Prototype, crea nuevos objetos a partir de prototipos existentes.'
pubDate: 2025-10-27
category: 'JavaScript'
tags: ['JavaScript', 'Patrones de Diseño', 'Programación']
---

# Patrón Prototype (Prototipo). Patrón más natural de JavaScript, ¡y ahora verás por qué!

Imagina que tienes un molde de Play-Doh con la forma de un dinosaurio. Este es tu **prototipo**. Es el dinosaurio perfecto y original.

![Play-Doh Dinosaurio](/public/playdoth-prototype.webp)

Ahora, quieres crear un ejército de dinosaurios. ¿Qué es más fácil y rápido?

1.  ¿Coger un nuevo bloque de plastilina cada vez y esculpir un dinosaurio desde cero, intentando que quede igual que el primero?
2.  ¿Usar tu molde (el prototipo) para aplastar la plastilina y sacar copias perfectas en un segundo?

¡La opción 2, por supuesto! Simplemente presionas el molde y ¡pum!, tienes un nuevo dinosaurio idéntico al original. Luego, si quieres, puedes personalizar esa copia: le doblas un poco la cola, le pones un ojo de otro color, etc.

El patrón de diseño Prototype es exactamente eso: crear nuevos objetos **haciendo una copia de un objeto existente** (el prototipo), en lugar de crearlo desde cero.

### ¿Cuál es el problema que soluciona?

A veces, crear un objeto es "caro". No hablamos de dinero, sino de recursos del ordenador. Puede que para crear un objeto necesites leer un archivo muy grande, hacer una consulta a una base de datos o realizar cálculos complejos.

Pensemos en un videojuego. Tienes un tipo de enemigo, un "Dragón de Lava". Cargar su modelo 3D, sus texturas, sus sonidos y sus animaciones puede tardar un par de segundos la primera vez.

Si cada vez que aparece un nuevo Dragón de Lava en la pantalla tuvieras que volver a cargar todo eso desde el disco duro, el juego se quedaría congelado a cada rato. ¡Sería injugable!

Lo que se hace es crear **un** Dragón de Lava "maestro" (nuestro prototipo) al principio del nivel. Y cada vez que se necesita uno nuevo, en lugar de crearlo desde cero, simplemente **clonamos** el que ya tenemos en memoria. ¡Es casi instantáneo!

### ¡A clonar Zombies!

JavaScript es un lenguaje basado en prototipos, por lo que este patrón le viene como anillo al dedo. Vamos a crear un prototipo de Zombie y luego clonarlo para crear un pequeño ejército.

```javascript
// --- Paso 1: Crear nuestro "molde" o prototipo ---
// No necesitamos una clase complicada, solo un objeto que sirva de modelo.

const zombiePrototipo = {
  // Propiedades por defecto
  nombre: 'Zombie Común',
  puntosDeVida: 100,
  velocidad: 1,

  // Comportamientos (métodos)
  atacar: function () {
    console.log(`${this.nombre} intenta morderte. ¡Grrr!`)
  },

  // El método clave para hacer la clonación
  clonar: function () {
    console.log(`Clonando a ${this.nombre}...`)
    // Object.create() es la herramienta mágica de JavaScript para este patrón.
    // Crea un nuevo objeto vacío que "hereda" todo de zombiePrototipo.
    const clon = Object.create(this)
    return clon
  }
}

// --- Paso 2: Usar el prototipo para crear nuevos zombies ---

console.log('--- Creando el primer zombie a partir del prototipo ---')
const zombie1 = zombiePrototipo.clonar()

console.log('\n--- Creando un segundo zombie ---')
const zombie2 = zombiePrototipo.clonar()

// --- Paso 3: Personalizar nuestras copias ---
// Cada clon es un objeto independiente y podemos cambiarlo sin afectar a los demás.

zombie1.nombre = 'Zombie Rápido' // Le cambiamos el nombre
zombie1.velocidad = 2 // y la velocidad.

zombie2.nombre = 'Zombie Lento pero Fuerte'
zombie2.puntosDeVida = 150

// --- Veamos los resultados ---
zombie1.atacar() // Salida: Zombie Rápido intenta morderte. ¡Grrr!
console.log(`Velocidad de ${zombie1.nombre}: ${zombie1.velocidad}`) // Salida: Velocidad de Zombie Rápido: 2

zombie2.atacar() // Salida: Zombie Lento pero Fuerte intenta morderte. ¡Grrr!
console.log(`Vida de ${zombie2.nombre}: ${zombie2.puntosDeVida}`) // Salida: Vida de Zombie Lento pero Fuerte: 150

// El prototipo original no ha cambiado
console.log(`\nNombre del prototipo original: ${zombiePrototipo.nombre}`) // Salida: Nombre del prototipo original: Zombie Común
```

### Repasemos los pasos clave:

1.  **Crear el Molde (Prototipo):** Se crea un objeto base que tiene todas las propiedades y métodos por defecto que queremos que tengan los futuros objetos.
2.  **La Máquina de Clonar:** El prototipo tiene un método (`clonar` en nuestro ejemplo) que se encarga de crear una copia de sí mismo. En JavaScript, `Object.create()` es la forma más directa y eficiente de hacer esto.
3.  **Hacer Copias y Personalizar:** Llamamos al método `clonar` para obtener un nuevo objeto. Este nuevo objeto es como una hoja en blanco puesta sobre el original: tiene acceso a todo lo del prototipo, pero cualquier cambio que le hagamos solo le afecta a él.

### Ventajas de usar Prototype

- **Rendimiento:** Es mucho más rápido clonar un objeto que ya existe que crearlo desde cero, especialmente si la creación es un proceso complejo.
- **Simplicidad:** A veces es más fácil crear un par de objetos prototipo y clonarlos que diseñar una jerarquía de clases complicada con la herencia tradicional.
- **Flexibilidad:** Puedes crear y configurar tus prototipos en cualquier momento del programa. Por ejemplo, podrías tener un prototipo de "enemigo normal" que, al subir de nivel, se convierte en el prototipo de "enemigo de élite", y a partir de ese momento todos los clones serán más fuertes.

En resumen, el patrón Prototype te dice: "Si necesitas algo que se parece mucho a otra cosa que ya tienes, no lo construyas, ¡mejor sácale una fotocopia y modifica los detalles!".
