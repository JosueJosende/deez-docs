---
title: "Domina Chrome DevTools"
description: "Guía completa para usar Chrome DevTools en desarrollo"
pubDate: 2023-09-12
category: "DevTools"
tags: ["chrome", "depuración", "rendimiento", "devtools"]
author: "Experto en DevTools"
---

# Domina Chrome DevTools

Chrome DevTools es un conjunto de herramientas para desarrolladores web integradas directamente en el navegador Google Chrome, que ofrece potentes formas de inspeccionar, depurar y optimizar sitios web.

## Cómo abrir DevTools

Hay varias formas de abrir DevTools:

- Pulsa `F12` o `Ctrl+Shift+I` (Windows/Linux) o `Cmd+Option+I` (Mac)
- Haz clic derecho sobre cualquier elemento y selecciona "Inspeccionar"
- Desde el menú de Chrome: Más herramientas > Herramientas para desarrolladores

## Panel Elementos

El panel Elementos te permite inspeccionar y modificar el DOM y el CSS.

### Inspeccionar elementos

- Usa el inspector (🔍) para seleccionar elementos en la página
- Navega por el árbol DOM en el panel izquierdo
- Visualiza y modifica el CSS en el panel derecho

### Editar HTML

- Haz doble clic en cualquier elemento para editar su HTML
- Haz clic derecho sobre los elementos para más opciones

### Trabajar con CSS

- Añade, edita o desactiva propiedades CSS
- Usa el panel de Estilos para ver todos los estilos aplicados
- Activa/desactiva clases CSS con el botón .cls
- Consulta los estilos calculados para ver los valores finales aplicados

## Panel Consola

La Consola permite registrar información e interactuar con JavaScript.

### Métodos de consola

```javascript
console.log('Registro básico');
console.info('Mensaje informativo');
console.warn('Mensaje de advertencia');
console.error('Mensaje de error');
console.table([{nombre: 'Juan', edad: 28}, {nombre: 'Ana', edad: 32}]);
```

### Utilidades de consola

Chrome DevTools ofrece funciones utilitarias:

```javascript
$('selector') // atajo para document.querySelector()
$$('selector') // atajo para document.querySelectorAll()
$0 // referencia al elemento seleccionado actualmente
```

## Panel Red (Network)

Monitorea las solicitudes de red para analizar problemas de rendimiento.

### Funcionalidades clave

- Ver todas las solicitudes de red
- Filtrar por tipo (XHR, JS, CSS, etc.)
- Analizar cabeceras y contenido de las solicitudes/respuestas
- Consultar información de tiempos
- Simular diferentes condiciones de red

## Panel Rendimiento (Performance)

Analiza el rendimiento en tiempo de ejecución e identifica cuellos de botella.

### Grabar el rendimiento

1. Haz clic en el botón de grabar
2. Interactúa con tu sitio
3. Detén la grabación
4. Analiza el flame chart para identificar operaciones lentas

### Métricas clave

- Gráfico de FPS (frames por segundo)
- Uso de CPU
- Actividad de red
- Actividad del hilo principal

## Panel Aplicación (Application)

Inspecciona y gestiona almacenamiento, cachés y recursos.

### Gestión de almacenamiento

- Local Storage y Session Storage
- Cookies
- IndexedDB y Web SQL
- Cache Storage (Service Workers)
- Application Cache

## Depurador (Panel Fuentes/Sources)

Depura JavaScript con puntos de interrupción y recorre el código paso a paso.

### Establecer puntos de interrupción

- Puntos de interrupción en línea: haz clic en el número de línea
- Puntos de interrupción condicionales: clic derecho en el número de línea
- Puntos de interrupción en XHR/Fetch: pausa cuando se solicite una URL específica
- Puntos de interrupción en eventos: pausa en eventos específicos

### Controles de depuración

- Reanudar/pausar la ejecución del script
- Avanzar sobre, dentro y fuera de funciones
- Desactivar todos los puntos de interrupción
- Monitorizar la pila de llamadas y variables de ámbito

## Lighthouse

Audita tu sitio web en rendimiento, accesibilidad, SEO y más.

### Ejecutar una auditoría

1. Abre el panel Lighthouse
2. Selecciona las categorías a auditar
3. Haz clic en "Generar informe"
4. Revisa los resultados y sugerencias de mejora

## Otros paneles útiles

### Panel Memory

- Analiza el uso de memoria y detecta fugas (memory leaks)
- Realiza snapshots de heap y compara el consumo

### Panel Coverage

- Identifica CSS y JS no utilizados para optimizar la carga

### Panel Security

- Revisa el estado de seguridad de la página (HTTPS, certificados, etc.)

## Conclusión

Chrome DevTools es una herramienta esencial en el flujo de trabajo del desarrollo web moderno. Dominar estas utilidades mejorará significativamente tu capacidad para construir, depurar y optimizar aplicaciones web.