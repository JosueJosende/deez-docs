---
title: 'Patrón Creacional: Builder'
description: 'Patrón de diseño Builder en JavaScript, construyendo objetos paso a paso.'
pubDate: 2025-10-26
category: 'JavaScript'
tags: ['JavaScript', 'Patrones de Diseño', 'Programación']
---

# Patrón Builder (Constructor)

Imagina que vas a tu hamburguesería favorita. No pides una "hamburguesa número 37". En su lugar, tú le dices al cocinero exactamente cómo la quieres, paso a paso:

"Hola, quiero una hamburguesa. Primero, que el pan sea de sésamo. Luego, ponle doble de carne. Añádele queso cheddar. Sin cebolla, por favor. Y para terminar, ponle mucha salsa barbacoa."

![hamburguesa](/public/haburguesa-builder.webp)

Tú eres el director, y el cocinero es el **Builder**. Le vas dando instrucciones una por una, y solo al final, cuando dices "¡Listo!", él te entrega la hamburguesa perfectamente montada según tus deseos.

El patrón de diseño Builder funciona exactamente así: nos permite construir un objeto complejo **paso a paso**. Separa el proceso de construcción del objeto de su resultado final, dándonos un control total sobre cada parte.

### ¿Cuál es el problema que resuelve?

Imagina que tenemos que crear un objeto `Coche` en nuestro programa. Un coche tiene muchísimas opciones: color, número de puertas, tipo de motor, si tiene o no techo solar, el tipo de llantas, si los asientos son de cuero...

Si intentáramos crear un coche con un constructor normal, sería una pesadilla:

```javascript
// ¡Qué horror de constructor! Es imposible de leer y fácil de equivocarse.
const miCoche = new Coche('rojo', 4, 'V8', true, 'deportivas', true, 'automática', ...);
```

¿Qué significaba el cuarto `true`? ¿Era el techo solar o los asientos de cuero? ¡Imposible saberlo sin mirar la documentación!

Aquí es donde nuestro "cocinero" (el Builder) viene al rescate.

### ¡A construir nuestro propio Coche!

Vamos a crear un `CocheBuilder`. Su única misión será recibir nuestras instrucciones paso a paso.

Primero, definimos el producto final, nuestro objeto `Coche`. Fíjate que es una clase bastante simple, solo almacena los datos.

```javascript
// --- Paso 1: El producto final ---
class Coche {
  constructor() {
    this.color = 'blanco'
    this.puertas = 4
    this.motor = 'V4'
    this.techoSolar = false
    this.asientos = 'tela'
  }

  // Un método para ver cómo ha quedado nuestro coche
  describir() {
    console.log(`Este es un coche de color ${this.color}, con ${this.puertas} puertas, motor ${this.motor}, ${this.techoSolar ? 'con' : 'sin'} techo solar y asientos de ${this.asientos}.`)
  }
}
```

Ahora, ¡la estrella del show! El `CocheBuilder`.

```javascript
// --- Paso 2: El Constructor (Builder) ---
class CocheBuilder {
  constructor() {
    // El builder empieza con un coche "en blanco" o "base".
    this.coche = new Coche()
  }

  // Cada uno de estos métodos es un paso en la construcción.
  // Fíjate en el "return this;". ¡Es el truco mágico!

  setColor(color) {
    this.coche.color = color
    return this // Devuelve el propio builder para poder seguir construyendo.
  }

  setPuertas(numero) {
    this.coche.puertas = numero
    return this
  }

  setMotor(tipo) {
    this.coche.motor = tipo
    return this
  }

  conTechoSolar() {
    this.coche.techoSolar = true
    return this
  }

  conAsientosDeCuero() {
    this.coche.asientos = 'cuero'
    return this
  }

  // --- Paso 3: El toque final ---
  // Este método nos entrega el coche ya terminado.
  construir() {
    return this.coche
  }
}

// --- Paso 4: ¡Usar nuestro Builder! ---

// Creamos un nuevo builder para empezar a dar órdenes.
const builder = new CocheBuilder()

// Ahora construimos un coche deportivo, paso a paso.
// Gracias a "return this;", podemos encadenar los pasos. ¡Se lee como una receta!
const cocheDeportivo = builder
  .setColor('rojo ferrari')
  .setPuertas(2)
  .setMotor('V12')
  .conTechoSolar()
  .conAsientosDeCuero()
  .construir() // ¡Listo! El builder nos entrega el coche.

// Y ahora, un coche familiar, ¡reutilizando el builder si quisiéramos o creando uno nuevo!
const builder2 = new CocheBuilder()
const cocheFamiliar = builder2
  .setColor('azul oscuro')
  .setPuertas(5)
  .conAsientosDeCuero()
  .construir() // No le pusimos motor V12 ni techo solar.

// Veamos los resultados
cocheDeportivo.describir()
// Salida: Este es un coche de color rojo ferrari, con 2 puertas, motor V12, con techo solar y asientos de cuero.

cocheFamiliar.describir()
// Salida: Este es un coche de color azul oscuro, con 5 puertas, motor V4, sin techo solar y asientos de cuero.
```

### Repasemos los pasos clave:

1.  **El Producto:** Es el objeto complejo que queremos crear (`Coche`).
2.  **El Constructor (Builder):** Es una clase aparte (`CocheBuilder`) que sabe cómo añadir cada una de las partes al producto.
3.  **Los Pasos:** El Builder tiene métodos claros y descriptivos para cada parte de la construcción (`setColor`, `setPuertas`, etc.).
4.  **La Magia del Encadenamiento:** Cada uno de estos métodos devuelve `this` (el propio builder), lo que nos permite llamar a un método tras otro de forma muy legible.
5.  **El Toque Final:** El Builder tiene un método final (`construir`) que nos entrega el objeto ya terminado con todas las especificaciones que le hemos dado.

### Ventajas de usar un Builder

- **Código Súper Legible:** La creación del objeto se lee casi como si fuera una frase en español. Es muy fácil entender qué configuración tiene cada objeto.
- **Evita Constructores Gigantes:** Nos libramos de esos constructores con 10 parámetros que nadie entiende.
- **Flexibilidad Total:** Podemos crear muchas variaciones diferentes de un objeto complejo de forma muy sencilla y clara.
- **Objetos Válidos:** El objeto final solo se entrega cuando llamamos a `construir()`, asegurándonos de que esté completo y en un estado coherente.

En resumen, el patrón Builder es tu mejor amigo cuando tienes que crear objetos que tienen muchas opciones de configuración. Es como tener un asistente personal que toma nota de todas tus peticiones y te entrega el producto final perfecto, exactamente como lo pediste.
