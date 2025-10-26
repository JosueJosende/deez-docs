---
title: "Guía de configuración de Nginx"
description: "Aprende a configurar Nginx para servir webs, hacer proxy inverso, balanceo, caché y más. Ejemplos prácticos y consejos."
pubDate: 2023-10-08
category: "Server"
tags: ["nginx", "servidor", "configuración", "web-server"]
author: "Administrador de Servidores"
---

# Guía de configuración de Nginx

Nginx es un servidor HTTP y proxy inverso de alto rendimiento, conocido por su estabilidad, gran cantidad de funciones, configuración sencilla y bajo consumo de recursos. Aquí tienes una guía visual y práctica para dominar su configuración. 😎

---

### 🗂️ Estructura básica de configuración

Los archivos de configuración de Nginx se encuentran en `/etc/nginx/`, siendo el principal `/etc/nginx/nginx.conf`.

```nginx
# Contexto principal
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

# Contexto de eventos
events {
    worker_connections 1024;
}

# Contexto HTTP
http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    
    # Contexto de servidor
    server {
        listen 80;
        server_name ejemplo.com;
        
        # Contexto de ubicación
        location / {
            root /usr/share/nginx/html;
            index index.html index.htm;
        }
    }
}
```

---

### 🌐 Bloques de servidor (Server Blocks)

Los bloques de servidor (similares a los virtual hosts de Apache) te permiten alojar varios sitios en un solo servidor:

```nginx
server {
    listen 80;
    server_name sitio1.ejemplo.com;
    root /var/www/sitio1;
    
    location / {
        index index.html;
    }
}

server {
    listen 80;
    server_name sitio2.ejemplo.com;
    root /var/www/sitio2;
    
    location / {
        index index.html;
    }
}
```

---

### 🔄 Configurar un proxy inverso

Nginx es excelente como proxy inverso para servidores de aplicaciones:

```nginx
server {
    listen 80;
    server_name app.ejemplo.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

> 💡 **Consejo:** Usa proxy inverso para exponer apps Node.js, Python, etc. de forma segura y eficiente.

---

### 🔒 Configuración SSL/TLS

Asegura tu web con HTTPS:

```nginx
server {
    listen 443 ssl;
    server_name seguro.ejemplo.com;
    
    ssl_certificate /etc/nginx/ssl/ejemplo.com.crt;
    ssl_certificate_key /etc/nginx/ssl/ejemplo.com.key;
    
    # Ajustes SSL
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers "EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH";
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    
    location / {
        root /var/www/sitio-seguro;
        index index.html;
    }
}
```

> 🔐 **Tip:** Usa [Certbot](https://certbot.eff.org/) para obtener certificados SSL gratis y automáticos.

---

### ⚖️ Balanceo de carga

Distribuye el tráfico entre varios servidores:

```nginx
upstream backend {
    server backend1.ejemplo.com;
    server backend2.ejemplo.com;
    server backend3.ejemplo.com;
}

server {
    listen 80;
    server_name balanceador.ejemplo.com;
    
    location / {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

### ⚡ Caché de contenido

Mejora el rendimiento con caché:

```nginx
http {
    proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=mi_cache:10m max_size=10g inactive=60m;
    
    server {
        listen 80;
        server_name cacheado.ejemplo.com;
        
        location / {
            proxy_cache mi_cache;
            proxy_cache_valid 200 302 10m;
            proxy_cache_valid 404 1m;
            proxy_pass http://servidor_origen;
        }
    }
}
```

---

### 🚦 Limitación de peticiones (Rate Limiting)

Protege tu servidor de abusos:

```nginx
http {
    limit_req_zone $binary_remote_addr zone=milimite:10m rate=10r/s;
    
    server {
        listen 80;
        server_name ejemplo.com;
        
        location / {
            limit_req zone=milimite burst=20 nodelay;
            root /var/www/html;
            index index.html;
        }
    }
}
```

---

### 📦 Compresión Gzip

Reduce el uso de ancho de banda con compresión:

```nginx
http {
    gzip on;
    gzip_comp_level 5;
    gzip_min_length 256;
    gzip_proxied any;
    gzip_types
        application/javascript
        application/json
        application/xml
        text/css
        text/plain
        text/xml;
    
    server {
        # ...
    }
}
```

---

### 🧪 Probar la configuración

Siempre prueba tu configuración antes de aplicarla:

```bash
nginx -t
```

---

### 🔄 Reiniciar la configuración

Después de hacer cambios, reinicia Nginx:

```bash
nginx -s reload
```

---

### 🎯 Conclusión

Nginx es un servidor web potente y flexible que puedes adaptar a muchos escenarios. Esta guía cubre lo esencial, pero hay muchas más opciones avanzadas por descubrir. ¡Experimenta y consulta la [documentación oficial](https://nginx.org/en/docs/) para sacarle el máximo partido! 🚀