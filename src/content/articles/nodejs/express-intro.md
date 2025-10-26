---
title: "Introduction to Express.js"
description: "Learn the basics of Express.js for building Node.js web applications"
pubDate: 2025-01-12
category: "NodeJS"
tags: ["express", "nodejs", "server", "backend"]
author: "Node Developer"
---

# Introduction to Express.js

Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

## Getting Started

First, you need to install Express:

```bash
npm install express
```

Then, create a basic server:

```javascript
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
```

## Routing

Express provides a simple way to define routes:

```javascript
// GET method route
app.get('/users', (req, res) => {
  res.send('GET request to the /users');
});

// POST method route
app.post('/users', (req, res) => {
  res.send('POST request to the /users');
});

// Route parameters
app.get('/users/:userId', (req, res) => {
  res.send(`User ID: ${req.params.userId}`);
});
```

## Middleware

Middleware functions have access to the request and response objects, and the next middleware function in the application's request-response cycle:

```javascript
// Application-level middleware
app.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});

// Route-specific middleware
app.use('/users', (req, res, next) => {
  console.log('Request Type:', req.method);
  next();
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```

## Serving Static Files

To serve static files such as images, CSS, and JavaScript:

```javascript
app.use(express.static('public'));
```

This will serve files in the 'public' directory directly:

- `public/images/logo.png` will be accessible at `http://localhost:3000/images/logo.png`
- `public/css/style.css` will be accessible at `http://localhost:3000/css/style.css`

## Request & Response Objects

Express extends Node's request and response objects with additional methods:

```javascript
app.get('/api/data', (req, res) => {
  // Send JSON response
  res.json({ name: 'John', age: 30 });
  
  // Set status
  res.status(200);
  
  // Redirect
  res.redirect('/new-page');
  
  // Send a file
  res.sendFile('/path/to/file.pdf');
});
```

## Template Engines

Express can be configured to use template engines like EJS, Pug, or Handlebars:

```javascript
app.set('view engine', 'ejs');

app.get('/profile', (req, res) => {
  res.render('profile', { name: 'John', age: 30 });
});
```

## Conclusion

Express.js is a powerful yet simple framework for building web applications and APIs with Node.js. It provides essential features without obscuring Node's capabilities, making it an excellent choice for both beginners and experienced developers.