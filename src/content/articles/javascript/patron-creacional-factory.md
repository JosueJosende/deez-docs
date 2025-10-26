---
title: 'Patrón Creacional: Factory'
description: 'Patrón de diseño Factory en JavaScript, una fábrica para crear objetos.'
pubDate: 2025-10-26
category: 'JavaScript'
tags: ['JavaScript', 'Patrones de Diseño', 'Programación']
---

# Patrones de diseño con (Factory)

Imagina que tienes una fábrica de juguetes. En esta fábrica, no haces un solo tipo de juguete, ¡sino muchos! Puedes fabricar coches, muñecas, robots... lo que sea.

![fábrica de juguetes](/public/factory.webp)

Tú eres el jefe y no te quieres preocupar de los detalles de cómo se construye cada juguete. No quieres saber si el coche necesita cuatro ruedas y un volante, o si la muñeca lleva un vestido y pelo sintético. Para eso tienes a tus especialistas.

Lo único que haces es ir al mostrador de la fábrica y decir: "¡Quiero un coche!". Y la fábrica, por arte de magia, te entrega un coche listo para jugar. Si pides una "muñeca", te dan una muñeca. La fábrica se encarga de todo el proceso de creación.

El patrón de diseño Factory es exactamente eso: un "encargado" de crear objetos por nosotros. Le decimos qué queremos, y la fábrica se ocupa de los detalles de construcción, entregándonos el producto final.

### ¿Para qué necesitamos una fábrica?

Imagina que estamos creando un videojuego con diferentes tipos de enemigos: zombis, esqueletos y fantasmas. Cada uno tiene una forma de atacar y una cantidad de vida diferente.

Si no usamos una fábrica, cada vez que queramos que aparezca un enemigo en el juego, tendríamos que escribir algo así:

```javascript
// Sin fábrica... ¡un poco repetitivo!
let enemigo1
if (tipoEnemigo === 'zombi') {
  enemigo1 = new Zombi()
} else if (tipoEnemigo === 'esqueleto') {
  enemigo1 = new Esqueleto()
} else if (tipoEnemigo === 'fantasma') {
  enemigo1 = new Fantasma()
}

let enemigo2
if (otroTipoEnemigo === 'zombi') {
  enemigo2 = new Zombi()
} // ... y así una y otra vez
```

Esto se vuelve muy repetitivo y si mañana añadimos un nuevo enemigo, como un "ogro", tendríamos que ir a todos los sitios donde creamos enemigos y añadir un nuevo `if`. ¡Qué lío!

La fábrica nos soluciona este problema. Centraliza la creación de enemigos en un solo lugar.

### ¡Manos a la obra! Construyamos nuestra fábrica de enemigos

Vamos a ver cómo crear nuestra `FabricaDeEnemigos` en JavaScript.

Primero, definimos cómo son nuestros "productos" (los enemigos). Todos saben atacar, pero cada uno lo hace a su manera.

```javascript
// --- Paso 1: Definir nuestros productos (los enemigos) ---

class Zombi {
  atacar() {
    console.log('El Zombi te muerde... ¡Arrrgh!')
  }
}

class Esqueleto {
  atacar() {
    console.log('El Esqueleto te golpea con sus huesos... ¡clac!')
  }
}

class Fantasma {
  atacar() {
    console.log('El Fantasma te atraviesa y sientes un frío helador... ¡woosh!')
  }
}
```

Ahora, creamos nuestra fábrica. Será una clase que tiene un único trabajo: crear el enemigo que le pidamos.

```javascript
// --- Paso 2: Construir la fábrica ---

class FabricaDeEnemigos {
  crearEnemigo(tipo) {
    switch (tipo) {
      case 'zombi':
        console.log('Fabricando un zombi...')
        return new Zombi()
      case 'esqueleto':
        console.log('Fabricando un esqueleto...')
        return new Esqueleto()
      case 'fantasma':
        console.log('Fabricando un fantasma...')
        return new Fantasma()
      default:
        throw new Error('¡Ese tipo de enemigo no existe en nuestra fábrica!')
    }
  }
}

// --- Paso 3: Usar la fábrica para crear enemigos ---

// Creamos nuestra fábrica una sola vez.
const miFabrica = new FabricaDeEnemigos()

// Y ahora, ¡a pedir enemigos!
const enemigo1 = miFabrica.crearEnemigo('zombi')
const enemigo2 = miFabrica.crearEnemigo('esqueleto')

// Cada enemigo sabe cómo comportarse.
enemigo1.atacar() // Salida: El Zombi te muerde... ¡Arrrgh!
enemigo2.atacar() // Salida: El Esqueleto te golpea con sus huesos... ¡clac!
```

### Repasemos los pasos clave:

1.  **El Catálogo de Productos:** Primero definimos las diferentes clases de objetos que nuestra fábrica podrá crear (Zombi, Esqueleto, Fantasma).
2.  **El Encargado (La Fábrica):** Creamos una clase especial (`FabricaDeEnemigos`) que tiene un método (`crearEnemigo`).
3.  **El Pedido:** A este método le pasamos un "identificador" (una palabra como 'zombi' o 'esqueleto') para decirle qué objeto queremos.
4.  **La Producción:** Dentro del método, una estructura como `switch` o `if-else` decide qué clase específica debe crear basándose en el pedido.
5.  **La Entrega:** La fábrica nos devuelve el objeto ya creado y listo para usar, sin que nosotros tengamos que saber los detalles de su construcción.

### Ventajas de usar una Fábrica

- **Código más limpio y organizado:** La lógica para crear objetos está en un solo lugar, no esparcida por todo el programa.
- **Fácil de ampliar:** Si mañana queremos añadir un nuevo enemigo "Ogro", solo tenemos que crear la clase `Ogro` y añadir un `case 'ogro'` en la fábrica. No hay que tocar nada más del código del juego.
- **Más flexibilidad:** Nos permite decidir qué tipo de objeto crear mientras el programa se está ejecutando, lo que lo hace muy potente y dinámico.

En resumen, el patrón Factory es como tener un asistente personal para crear objetos. Tú le dices qué necesitas y él se encarga del resto, haciendo tu código mucho más simple, ordenado y fácil de mantener a largo plazo.
