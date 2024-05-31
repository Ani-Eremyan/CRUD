const express = require('express');

const app = express();

const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());


// In-memory array to store user data
let users = [];


// CREATE: Add a new user
app.post('/users', (req, res) => 
{
    const user = req.body;
    users.push(user);
    res.status(201).send(user);

}); 


// READ: Get all users
app.get('/users', (req, res) =>
{
    res.send(users);
});


// READ: Get a user by ID
app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  });
  
  // UPDATE: Update a user by ID
  app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
      users[userIndex] = req.body;
      res.send(users[userIndex]);
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  });
  
  // DELETE: Delete a user by ID
  app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
      users.splice(userIndex, 1);
      res.status(204).send();
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  });
  
  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });