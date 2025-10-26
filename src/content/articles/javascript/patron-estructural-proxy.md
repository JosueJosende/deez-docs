---
title: 'Patrón Estructural Proxy'
description: 'Controla el acceso a un objeto añadiendo una capa intermedia.'
pubDate: 2025-10-27
category: 'JavaScript'
tags: ['JavaScript', 'Patrones de Diseño', 'Programación']
---

# Patrón muy astuto y poderoso: Proxy

Imagina que tu dinero no está en tu bolsillo, sino en una cámara acorazada gigante en un banco. Esa cámara es el objeto **real y valioso**. No puedes simplemente entrar al banco y abrir la cámara tú mismo. Sería lento, complicado y poco seguro.

En lugar de eso, tienes una **tarjeta de crédito**.

![proxy-dinero](/public/proxy-dinero.webp)

La tarjeta de crédito es un **Proxy** para tu cuenta bancaria.

- **Se parece a lo que representa:** Puedes usarla para pagar, que es la función principal de tu dinero.
- **Añade una capa de seguridad:** Antes de poder usarla, tienes que introducir tu PIN secreto. La tarjeta controla el acceso a tu dinero.
- **Puede añadir lógica extra:** Cada vez que la usas, el banco registra la transacción.
- **Es más cómoda:** Es mucho más fácil llevar una tarjeta en la cartera que un montón de lingotes de oro.

El patrón de diseño Proxy es exactamente eso: un objeto que actúa como un **representante** o **intermediario** de otro objeto. El cliente interactúa con el proxy, y el proxy se encarga de hablar con el objeto real, a menudo añadiendo algún tipo de control o funcionalidad extra por el camino.

### ¿Cuál es el problema que soluciona?

Necesitamos un proxy cuando queremos controlar el acceso a un objeto. Las razones pueden ser varias:

- **El objeto real es "pesado" y tarda en crearse:** Como un objeto que necesita conectarse a una base de datos o cargar un archivo muy grande. No queremos crearlo hasta que sea absolutamente necesario. A esto se le llama **Proxy Virtual**.
- **Necesitamos seguridad:** Queremos comprobar si el usuario tiene permiso para usar el objeto real, como el PIN de la tarjeta de crédito. A esto se le llama **Proxy de Protección**.
- **Queremos registrar su uso:** Queremos saber cada vez que alguien interactúa con el objeto real. A esto se le llama **Proxy de Registro (Logging Proxy)**.

### ¡Vamos a proteger una Puerta Secreta!

Usaremos un Proxy de Protección para controlar quién puede abrir la puerta de un laboratorio secreto.

Primero, nuestro objeto real. Es muy simple: solo sabe abrirse y cerrarse.

```javascript
// --- Paso 1: El Objeto Real (La cámara acorazada) ---
class PuertaDelTesoro {
  abrir() {
    console.log('¡La puerta del tesoro se está abriendo! Es pesada y ruidosa.')
  }

  cerrar() {
    console.log('La puerta del tesoro se ha cerrado.')
  }
}
```

Ahora, creamos nuestro "guardia de seguridad", el Proxy. Este proxy se asegurará de que solo alguien con la contraseña correcta pueda abrir la puerta.

````javascript
// --- Paso 2: El Representante (La tarjeta con PIN) ---
class ProxySeguridadPuerta {
  constructor(contraseña) {
    // El proxy guarda la contraseña que le dan para usarla luego.
    this.contraseña = contraseña;
    // OJO: La puerta real (this.puertaReal) todavía NO se ha creado.
    // ¡Ahorramos recursos!
    this.puertaReal = null;
  }

  // Método para comprobar el acceso
  comprobarAcceso() {
    if (this.contraseña === '12345') {
      console.log("Acceso concedido. El Proxy va a operar la puerta real.");
      return true;
    } else {
      console.log("¡Acceso DENEGADO! Contraseña incorrecta.");
      return false;
    }
  }

  // El proxy debe tener los mismos métodos que el objeto real.
  abrir() {
    // Antes de abrir la puerta, el proxy hace su trabajo de seguridad.
    if (this.comprobarAcceso()) {
      // Si el acceso es correcto Y la puerta real aún no existe...
      if (this.puertaReal === null) {
        console.log("El proxy crea la puerta real por primera vez (Carga Perezosa).");
        // ...la creamos JUSTO AHORA, no antes.
        this.puertaReal = new PuertaDelTesoro();
      }
      // Ahora que sabemos que tenemos permiso y la puerta existe, delegamos la acción.
      this.puertaReal.abrir();
    }
  }

  cerrar() {
    // También podríamos añadir seguridad aquí, pero por ahora solo delegamos.
    if (this.puertaReal) {
      this.puertaReal.cerrar();
    }
  }
}```

### ¡Intentando entrar al laboratorio!

Veamos cómo el cliente interactúa solo con el proxy, sin saber nada de la puerta real.

```javascript
// --- Paso 3: El cliente interactúa con el Proxy ---

console.log("--- Intentando entrar con la contraseña equivocada ---");
const proxyMalo = new ProxySeguridadPuerta('password');
proxyMalo.abrir(); // El cliente solo llama a abrir(), como si fuera la puerta de verdad.

console.log("\n--- Intentando entrar con la contraseña CORRECTA ---");
const proxyBueno = new ProxySeguridadPuerta('12345');
proxyBueno.abrir();
proxyBueno.cerrar();

// La salida del programa sería:
// --- Intentando entrar con la contraseña equivocada ---
// ¡Acceso DENEGADO! Contraseña incorrecta.
//
// --- Intentando entrar con la contraseña CORRECTA ---
// Acceso concedido. El Proxy va a operar la puerta real.
// El proxy crea la puerta real por primera vez (Carga Perezosa).
// ¡La puerta del tesoro se está abriendo! Es pesada y ruidosa.
// La puerta del tesoro se ha cerrado.
````

### Repasemos los pasos clave:

1.  **La Interfaz Común:** Tanto el objeto real (`PuertaDelTesoro`) como el proxy (`ProxySeguridadPuerta`) deben tener los mismos métodos (`abrir`, `cerrar`). Así, el cliente puede usar cualquiera de los dos sin cambiar su código.
2.  **El Objeto Real (Real Subject):** Es el objeto que hace el trabajo de verdad, el que queremos proteger o controlar.
3.  **El Representante (Proxy):** Es el objeto que el cliente usa. Contiene una referencia al objeto real y puede realizar tareas antes o después de delegar la llamada a este.

### Ventajas de usar Proxy

- **Control de Acceso:** Es la ventaja más obvia. Podemos implementar cualquier tipo de seguridad que se nos ocurra.
- **Carga Perezosa (Lazy Loading):** Como en nuestro ejemplo, el objeto real (`PuertaDelTesoro`) no se crea hasta que es estrictamente necesario. Si nunca se introduce la contraseña correcta, el programa nunca gastará memoria ni tiempo en crear la puerta. ¡Esto es súper eficiente!
- **Añadir Lógica Extra:** Podemos usar un proxy para registrar cada vez que se usa un objeto (logging), para guardar en caché resultados de operaciones costosas (caching), y mucho más.
- **Transparencia para el cliente:** El que usa el objeto no necesita saber si está usando un proxy o el objeto real. Simplemente "funciona".

En resumen, el patrón Proxy es como poner un portero inteligente delante de una puerta importante. El portero puede pedir una contraseña, registrar quién entra y sale, e incluso construir la habitación que hay detrás solo cuando alguien consigue entrar.
