---
title: "Servidor seguro, Node y Express"
description: "Proteger tu servidor Node.js con Express: rate limit, CORS, timeouts y más."
pubDate: 2025-01-30
category: "NodeJS"
tags: ["express", "nodejs", "server", "backend", "seguridad"]
author: "deezdev"
---

# 🛡️ Construir un servidor seguro con Node.js y Express

Proteger tu servidor es fundamental para cualquier aplicación moderna. Aquí tienes un resumen de buenas prácticas y ejemplos para fortalecer la seguridad de tu backend con Node.js y Express. ¡No dejes ningún cabo suelto! ⚡

### ✅ Checklist de seguridad esencial

  1. **Limitar la cantidad de solicitudes entrantes** (Rate limit)
  2. **Habilitar CORS** (Cross-Origin Resource Sharing)
  3. **Ajustar tiempo de conexión** (Keep Alive)
  4. **Agregar timeouts en solicitudes HTTP**
  5. **Limitar el tamaño del cuerpo HTTP** (Payload size)
  6. **Validar y desinfectar los datos de entrada**
  7. **Realizar consultas parametrizadas SQL**
  8. **Agregar políticas de seguridad de contenido** (CSP)
  9. **Implementar autenticación segura** (por ejemplo, JWT)
  10. **Auditar y reparar dependencias** con NPM audit

---

### 1️⃣ Limitar la cantidad de solicitudes entrantes (Rate limit)

Controlar y limitar la cantidad de solicitudes es clave para evitar sobrecargas, ataques de denegación de servicio (DoS) y abusos. El rate limit se expresa en solicitudes permitidas por unidad de tiempo (por ejemplo, 100 por minuto). Si se supera el límite, las solicitudes extra pueden ser rechazadas o retrasadas.

**Ejemplo con express-rate-limit:**

```js
const express = require('express');
const rateLimit = require('express-rate-limit');
const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // 100 solicitudes por IP
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);
```

---

### 2️⃣ Habilitar CORS (Cross-Origin Resource Sharing)

CORS permite controlar qué dominios pueden acceder a tus recursos. Es esencial para evitar problemas de seguridad y controlar el acceso desde otros orígenes.

**Ejemplo con el paquete cors:**

```js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

---

### 3️⃣ Ajustar tiempo de conexión (Keep Alive)

Mantener conexiones abiertas puede mejorar el rendimiento, pero también es importante limitar el tiempo para evitar abusos y ataques. Ajusta los valores según tus necesidades.

```js
const server = app.listen(3000, () => {
  console.log('server on port 3000');
});

server.keepAliveTimeout = 30 * 1000; // 30 segundos
server.headersTimeout = 35 * 1000; // 35 segundos
```

---

### 4️⃣ Agregar timeouts en solicitudes HTTP

Los timeouts evitan que tu app se quede esperando indefinidamente. Así puedes liberar recursos y mejorar la estabilidad.

```js
app.use((req, res, next) => {
  req.setTimeout(5000); // 5 segundos
  res.setTimeout(5000);
  next();
});
```

---

### 5️⃣ Limitar el tamaño del cuerpo HTTP (Payload size)

Limitar el tamaño del payload ayuda a prevenir ataques de desbordamiento y abusos.

```js
const limitPayloadSize = (req, res, next) => {
  const MAX_PAYLOAD_SIZE = 1024 * 1024; // 1MB
  if (req.headers['content-length'] && parseInt(req.headers['content-length']) > MAX_PAYLOAD_SIZE) {
    return res.status(413).json({ error: 'Payload size exceeds the limit' });
  }
  next();
}

app.use(limitPayloadSize);
```

---

### 6️⃣ Validar y desinfectar los datos de entrada

¡Nunca confíes en los datos del usuario! Valida y limpia los datos para evitar inyecciones y errores.

**Ejemplo con Joi:**

```js
const joi = require('joi');
const schema = joi.object({
  username: joi.string().alphanum().min(3).max(30).required(),
  email: joi.string().email().required(),
  password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

app.post('/register', (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  res.status(200).json({ message: 'Success' });
});
```

---

### 7️⃣ Realizar consultas parametrizadas SQL

Las consultas parametrizadas previenen inyecciones SQL y mejoran la seguridad de tu base de datos.

```js
const query = 'SELECT * FROM users WHERE id = ?';
connection.query(query, [userId], (error, results) => {
  // ...
});
```

---

### 8️⃣ Agregar políticas de seguridad de contenido (CSP)

Las CSP ayudan a prevenir ataques XSS y controlan qué recursos pueden cargarse en tu web.

```js
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; font-src 'self'");
  next();
});
```

---

### 9️⃣ Implementar autenticación segura (JWT)

Autentica usuarios y protege rutas usando tokens JWT. ¡No expongas tus endpoints!

```js
const jwt = require('jsonwebtoken');
const secretKey = 'secret key';

app.post('/login', (req, res) => {
  // ...
  const token = jwt.sign({ username, password }, secretKey, { expiresIn: '1h' });
  res.json({ token });
});

app.get('/protected', verifyToken, (req, res) => {
  res.send('Protected route!');
});

function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token not provider' });
  }
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid Token' });
    }
    req.user = decoded;
    next();
  });
}
```

---

### 🔟 Auditar y reparar dependencias con NPM audit

¡No descuides tus dependencias! Usa `npm audit` para detectar y corregir vulnerabilidades automáticamente.

```sh
sudo npm audit fix
```

> ⚠️ **Consejo:** Revisa los cambios tras ejecutar `npm audit fix` y haz pruebas para evitar problemas de compatibilidad.

---

¿Listo para proteger tu servidor? 💪 Sigue estas prácticas y mantén tu backend a salvo de amenazas comunes.