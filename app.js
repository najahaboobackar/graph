const express = require('express');
const app = express();
const path = require('path');

// Define an adjacency list to represent page navigation.
const adjacencyList = {
  'main_menu': ['registration', 'login'],
  'registration': ['profile_info', 'main_menu'],
  'profile_info': ['main_menu', 'registration'],
  'login': ['main_menu', 'registration'],
};

// Serve the HTML pages and static files (CSS, JavaScript, etc.).
app.use(express.static(path.join(__dirname, 'html')));

// Set up route handlers for each page.
// Serve files from the project directory.

// Set up route handlers for each page.
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'main_menu.html')); // Serve main_menu.html directly.
});

app.get('/:page', (req, res) => {
  const page = req.params.page;
  if (page in adjacencyList) {
    res.sendFile(path.join(__dirname, `${page}.html`)); // Serve other pages based on the adjacency list.
  } else {
    res.status(404).send('Page not found');
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
