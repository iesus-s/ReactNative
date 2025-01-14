const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const os = require('os');
const mongoose = require('mongoose');

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('MongoDB connection error:', error));

// Module imports
const User = require('./models/User');

// create a user
const testUser = new User({
  name: 'testUser',
  username: 'testUser01',
  role: 'tester',
  creationDate: new Date(),
  activated: true
});

testUser.save();
// print log
console.log(testUser);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Enable cross-origin requests
app.use(bodyParser.json());

// Define test routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Express server!',
  })
});

app.get('/status', (req, res) => {
  // Get system uptime in seconds
  const uptimeInSeconds = os.uptime();
  // Convert seconds to a more readable format (e.g., days, hours, minutes, seconds)
  const days = Math.floor(uptimeInSeconds / (24 * 60 * 60));
  const hours = Math.floor((uptimeInSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((uptimeInSeconds % (60 * 60)) / 60);
  const seconds = Math.floor(uptimeInSeconds % 60);

  const formattedString = `System Uptime: days|hours|min|sec ${days}|${hours}|${minutes}|${seconds}`;

  res.json({
    message: 'Welcome to the status board!',
    runtime: formattedString
  });

});

app.get('/api/data', (req, res) => {
    res.json({ message: 'Hello from Express server!' });
});
////////////////////////////////
////////  CRUD  ////////////////

////////  Create  ////////
app.post('/request/users', async (req, res) => {
  try { 
    // create a user
    const newUser = new User(req.body);
    // save user
    newUser.save();
    // print log
    console.log(testUser);

    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

////////  Read  ////////

  
// Define Mongodb routes

// Get all users
app.get('/request/users', async (req, res) => {
  try{
    const allUsers = await User.find();
    console.log(allUsers); // Log the result
    res.json(allUsers);
  } catch (error) {
    console.error('Error fetching users:', error); // Log the error
    res.status(500).json({ message: error.message });
  }
});

// Get user by id
app.get('/request/users/:id', async (req, res) => {
  try{
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found'});
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

////////  Update  ////////
app.put('/request/users/:id', async (req, res) => {
  try{
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      // Return the updated document
      runValidators: true, // Ensure validation rules are applied
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

////////  Delete  ////////
app.delete('/request/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

///////////////////////////////////////////
////////  Begin listening  ////////////////
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});



