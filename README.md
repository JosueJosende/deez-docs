# deez-docs

Repositorio de documentación técnica y artículos sobre desarrollo web, organizado por categorías y construido con [Astro](https://astro.build/).

![deez-docs screenshot](/public/screenshot.png)

## Características

- Generador de documentación estática con Astro.
- Artículos en formato Markdown/MDX organizados por categorías (CSS, JavaScript, Node.js, Vue.js, Server, Devtools).
- Navegación por categorías y artículos.
- Componentes personalizados para tarjetas, listas, breadcrumbs, tabla de contenidos y más.
- Layouts reutilizables para artículos y páginas generales.
- Sistema de iconos para categorías.
- Página de contribución y error 404 personalizada.

## Estructura del proyecto

```text
src/
   assets/                # Recursos estáticos
   components/            # Componentes Astro reutilizables
   content/
      config.ts            # Configuración de categorías y rutas
      articles/            # Artículos organizados por carpetas temáticas
   layouts/               # Layouts para páginas y artículos
   pages/                 # Páginas principales y rutas dinámicas
   services/              # Servicios auxiliares (iconos, etc.)
public/                  # Archivos públicos
astro.config.mjs         # Configuración de Astro
tsconfig.json            # Configuración de TypeScript
package.json             # Dependencias y scripts
pnpm-lock.yaml           # Bloqueo de dependencias
```

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/deez-docs.git
   cd deez-docs
   ```

2. Instala las dependencias:

   ```bash
   pnpm install
   ```

3. Inicia el servidor de desarrollo:

   ```bash
   pnpm dev
   ```

## Scripts útiles

- `pnpm dev` — Inicia el servidor de desarrollo.
- `pnpm build` — Genera la versión estática para producción.
- `pnpm preview` — Previsualiza la versión de producción.

## Cómo contribuir

1. Crea un fork del repositorio.
2. Añade o edita artículos en `src/content/articles/`.
3. Haz un pull request con tus cambios.

Consulta la página `/contribute` para más detalles.

## Licencia

MIT
