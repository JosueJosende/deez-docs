---
title: 'Patrón Estructural Adapter'
description: 'Patrón de diseño Adapter, permite que interfaces incompatibles trabajen juntas.'
pubDate: 2025-11-05
category: 'JavaScript'
tags: ['JavaScript', 'Patrones de Diseño', 'Programación']
---

# Viajemos a un país extranjero con el patrón Adapter (Adaptador)

Imagina que te vas de viaje a Inglaterra. Llegas al hotel, súper emocionado, y quieres cargar tu móvil. Sacas tu cargador, que tiene dos clavijas redondas (el enchufe europeo), pero miras la pared y... ¡sorpresa! El enchufe de la pared tiene tres clavijas rectangulares. ¡Son **incompatibles**! No puedes conectar tu cargador directamente.

¿Qué haces? ¿Te compras un móvil nuevo? ¿Rompes la pared? ¡No! Haces algo mucho más sencillo: vas a una tienda y compras un **adaptador de viaje**.

![adaptador de viaje](/public/adaptador.webp)

Este pequeño aparato es una maravilla: por un lado, tiene los agujeros para tu enchufe de dos clavijas redondas, y por el otro, tiene las tres clavijas rectangulares que encajan en la pared. El adaptador no cambia la electricidad, no cambia tu móvil ni la pared; su único trabajo es ser un **traductor** o un **intermediario** para que dos cosas que no "hablan el mismo idioma" puedan funcionar juntas.

El patrón de diseño Adapter hace exactamente eso: permite que dos interfaces (dos "formas de enchufe") que son incompatibles puedan colaborar sin problemas.

### ¿Cuál es el problema que soluciona?

En programación, es muy común encontrarnos con esta situación. A lo mejor estás trabajando en un juego y tienes una clase `Guerrero` que tiene un método `atacar()`. Tu juego está lleno de código que llama a `guerrero.atacar()`.

Pero un día, te descargas una librería de magia increíble que te da una clase `Mago`. El problema es que el `Mago` no tiene un método `atacar()`. En su lugar, tiene un método llamado `lanzarHechizo()`.

Tu juego no entiende qué es `lanzarHechizo()`. ¡Las interfaces son incompatibles! No puedes simplemente poner al mago en el combate y esperar que funcione. Aquí es donde nuestro adaptador entra en acción.

### ¡Adaptemos un Mago para el Combate!

Vamos a crear un adaptador para que nuestro `Mago` pueda luchar junto a los `Guerreros`.

Primero, definimos las piezas que ya tenemos. Nuestro "enchufe de la pared" (lo que nuestro juego espera) y el "enchufe extranjero" (el Mago).

```javascript
// --- Paso 1: Lo que nuestro sistema entiende (El "enchufe de la pared") ---
class Guerrero {
  atacar() {
    console.log('¡El Guerrero ataca con su espada!')
  }
}

// --- Paso 2: El objeto nuevo e incompatible (El "enchufe extranjero") ---
class Mago {
  // Tiene un método con un nombre diferente
  lanzarHechizo() {
    console.log('¡El Mago lanza una bola de fuego!')
  }
}
```

Ahora, si intentamos usar al Mago directamente en nuestro juego, fallaría. Nuestro juego solo sabe llamar a `atacar()`.

Así que construimos el adaptador. ¡El traductor mágico!

```javascript
// --- Paso 3: Crear el Adaptador ---
// Su trabajo es "parecerse" a un Guerrero, pero por dentro usar al Mago.

class AdaptadorMago {
  constructor(mago) {
    // El adaptador contiene al objeto que quiere adaptar.
    this.mago = mago
  }

  // ¡Aquí está la magia!
  // El adaptador implementa el método que el sistema espera...
  atacar() {
    console.log('El Mago se prepara para atacar...')
    // ...y por dentro, "traduce" la llamada al método original del Mago.
    this.mago.lanzarHechizo()
  }
}
```

### Poniendo todo a funcionar

Ahora veamos cómo el adaptador nos permite usar al Guerrero y al Mago juntos en el mismo "ejército", sin que nuestro sistema principal se dé cuenta de la diferencia.

```javascript
// --- Paso 4: ¡Usando el adaptador en el juego! ---

const guerrero = new Guerrero()
const mago = new Mago()

// No podemos usar al mago directamente, así que lo "envolvemos" en su adaptador.
const magoAdaptado = new AdaptadorMago(mago)

// Ahora tenemos un ejército donde TODOS parecen tener el método atacar().
const ejercito = [guerrero, magoAdaptado]

// Nuestro bucle de juego es súper simple, no necesita saber si hay magos o no.
ejercito.forEach((combatiente) => {
  combatiente.atacar()
})

// La salida del programa sería:
// ¡El Guerrero ataca con su espada!
// El Mago se prepara para atacar...
// ¡El Mago lanza una bola de fuego!
```

¡Funcionó a la perfección! Nuestro juego pudo dar la orden de "atacar" al mago adaptado, y el adaptador se encargó de traducirla a "lanzarHechizo".

### Repasemos los pasos clave:

1.  **La Interfaz Esperada (Target):** Es la "forma del enchufe" que tu sistema actual entiende (en nuestro caso, un objeto con un método `atacar()`).
2.  **El Objeto a Adaptar (Adaptee):** Es el objeto nuevo o externo con una interfaz incompatible (el `Mago` con su método `lanzarHechizo()`).
3.  **El Adaptador (Adapter):** Es un nuevo objeto que "envuelve" al `Adaptee`. Implementa la interfaz `Target` y, por dentro, delega las llamadas a los métodos correspondientes del `Adaptee`.

### Ventajas de usar Adapter

- **Reutilización de código:** Te permite integrar clases o librerías de terceros en tu aplicación, incluso si no fueron diseñadas para funcionar juntas.
- **Código limpio:** Tu código principal no se llena de condicionales `if (esGuerrero) { ... } else if (esMago) { ... }`. Tratas a todos los objetos de la misma manera.
- **No necesitas cambiar el código original:** No tuvimos que modificar la clase `Mago`. Esto es clave cuando usas código de otras personas que no puedes (o no debes) editar.

En resumen, el patrón Adaptador es tu traductor universal para el código. Siempre que te encuentres con dos piezas de software que no encajan, ¡construye un adaptador para unirlas
