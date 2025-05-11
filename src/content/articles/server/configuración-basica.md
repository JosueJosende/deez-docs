---
title: "Crear y configurar un servidor web"
description: "Configura, gestiona usuarios, logs, backups y Nginx paso a paso."
pubDate: 2023-10-08
category: "Server"
tags: ["nginx", "server", "config", "web-server"]
author: "Administrador de Servidores"
---

# Conceptos básicos de configuración de un servidor

Esta guía es una referencia práctica y visual para configurar un servidor desde cero, asegurarlo y servir aplicaciones web con Nginx. ¡Ideal para quienes quieren aprender buenas prácticas y tener ejemplos claros! 🚀

---

### 🔑 Configuración básica de inicio de sesión con SSH

Acceder de forma segura es el primer paso. Para ello, necesitas una **clave SSH** y una cuenta de usuario con permisos de administrador.

1. **Crea un usuario en el servidor remoto y agrégalo al grupo sudo:**

```sh
sudo adduser nombre_usuario
sudo usermod -aG sudo nombre_usuario
```

2. **En tu equipo local** (¡no en el servidor!), genera una clave SSH:

```sh
ssh-keygen -t ed25519 -C "mi_correo@ejemplo.com"
```

Sigue las instrucciones y establece una contraseña segura.

3. **Copia la clave pública al servidor:**

```sh
ssh-copy-id -i ~/.ssh/id_ed25519.pub nombre_usuario@ip_del_servidor
```

> 💡 *Recuerda*: `nombre_usuario@ip_del_servidor` es el usuario creado y la IP/DNS del servidor.

Ahora podrás iniciar sesión por SSH sin contraseña cada vez.

---

### 🔒 Mejorando la seguridad de SSH

Edita la configuración para reforzar la seguridad:

```sh
sudo nano /etc/ssh/sshd_config
```

Ajusta estos parámetros:

```
Port 2222                    # Cambia el puerto por defecto
PermitRootLogin no           # Deshabilita el acceso root
PasswordAuthentication no    # Solo acceso por clave pública
PubkeyAuthentication yes     # Habilita autenticación por clave
AuthorizedKeysFile .ssh/authorized_keys
AllowUsers nombre_usuario    # Solo usuarios permitidos
```

Guarda y reinicia el servicio:

```sh
sudo systemctl restart ssh.service
```

> ⚠️ Si pierdes tu clave privada, ¡no podrás acceder remotamente!

Opciones extra para mayor seguridad:

```
Protocol 2
MaxAuthTries 3
ClientAliveInterval 300
ClientAliveCountMax 2
```

---

### 👤 Usuarios y privilegios mínimos

Sigue el **principio del mínimo privilegio**: cada aplicación debe tener solo los permisos necesarios. Así limitas daños y mejoras la auditoría.

Para crear un usuario de sistema sin acceso a login:

```sh
sudo useradd -rms /usr/sbin/nologin -c "comentario" usuario_app
```

Crea el directorio de la app y dale permisos:

```sh
sudo mkdir /opt/mi_aplicacion
sudo chown usuario_app:usuario_app /opt/mi_aplicacion
```

---

### 📋 Logs y rotación

Los **logs** ayudan a detectar problemas y amenazas. Para gestionarlos mejor, usa logrotate:

Ejemplo para NGINX en `/etc/logrotate.d/nginx`:

```
/var/log/nginx/*.log {
    weekly
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 0640 www-data adm
    sharedscripts
    postrotate
        [ -f /var/run/nginx.pid ] && kill -USR1 `cat /var/run/nginx.pid`
    endscript
}
```

Prueba la configuración:

```sh
sudo logrotate -d /etc/logrotate.conf
```

---

### 💾 Backups: ¡No pierdas tus datos!

Existen tres tipos:

1. **Completa**: copia todo, fácil de restaurar pero pesada.
2. **Diferencial**: copia cambios desde la última completa.
3. **Incremental**: copia solo cambios desde la última copia (más rápida, pero más compleja de restaurar).

> 📝 **Regla 3-2-1:** 3 copias, 2 tipos de almacenamiento, 1 copia externa.

Más info y recursos: [awesome-sysadmin#backups](https://github.com/awesome-foss/awesome-sysadmin#backups)

---

### 🔥 Seguridad básica de red

Usa **UFW** para controlar puertos y **Fail2Ban** para bloquear intentos sospechosos.

Ejemplo de reglas UFW:

```sh
sudo ufw default deny incoming
sudo ufw allow outgoing
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
```

Más comandos útiles:

```sh
sudo ufw status numbered
sudo ufw delete NUMBER
sudo ufw allow from 192.168.1.100 to any port 22
sudo ufw limit ssh
sudo ufw logging on
```

---

### 🚫 Fail2Ban: protección contra ataques de fuerza bruta

Copia la configuración y edítala:

```sh
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
sudo nano /etc/fail2ban/jail.local
```

Parámetros recomendados:

```
bantime = 10m
findtime = 10m
maxretry = 5
```

---

### 🌐 NGINX: configuración básica

#### Sitio estático

```nginx
server {
    listen 80;
    server_name ejemplo.com www.ejemplo.com;
    root /var/www/ejemplo.com/html;
    index index.html index.htm;
    location / {
        try_files $uri $uri/ =404;
    }
    # Cabeceras de seguridad
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    access_log /var/log/nginx/ejemplo.com.access.log;
    error_log /var/log/nginx/ejemplo.com.error.log warn;
    # SSL (descomenta tras usar Certbot)
    # listen 443 ssl http2;
    # ssl_certificate /etc/letsencrypt/live/ejemplo.com/fullchain.pem;
    # ssl_certificate_key /etc/letsencrypt/live/ejemplo.com/privkey.pem;
}
```

#### Proxy reverso

```nginx
server {
    listen 80;
    server_name app.ejemplo.com;
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    # Cabeceras de seguridad y logs igual que antes
}
```

#### WebSockets

```nginx
server {
    listen 80;
    server_name ws.ejemplo.com;
    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    # Cabeceras de seguridad y logs igual que antes
    proxy_read_timeout 300s;
    proxy_send_timeout 300s;
}
```

---

### 🔐 SSL con Certbot

Certbot es tu mejor aliado para SSL gratis y automático.

Instala Certbot:

```sh
sudo apt install certbot python3-certbot-nginx
```

Ejecuta Certbot y sigue las instrucciones:

```sh
sudo certbot --nginx
```

Verifica el estado del temporizador de renovación automática:

```sh
sudo systemctl status certbot.timer
```

---

¡Listo! Ahora tienes un servidor seguro, con usuarios bien gestionados, logs rotados, backups y Nginx configurado para servir tus aplicaciones. 🎉