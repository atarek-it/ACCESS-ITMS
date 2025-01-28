const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');  // Update this path to match your file structure
const authenticateToken = require('./middleware/authmiddleware'); // Update this path to match your middleware file
const itSupportRoutes = require('./routes/itSupport');
const ITSupport = require('./models/Itsupport');
const User = require('./models/Users');
const printerRoutes = require('./routes/printers');
const PrinterModel = require('./models/Printers');  
const app = express();
const PORT = 5000;
require("dotenv").config()

// Middleware
app.use(express.json());  // Parse JSON data in requests
app.use(cors());

// Handle preflight requests
app.options('*', cors()); // Enable preflight for all routes
// Connect to MongoDB using the URI from the .env file
mongoose.connect("mongodb+srv://ACCESSOILITMS:2481001ACCESSITMS@cluster0.0xyqn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Routes
app.use('/api/auth', authRoutes);  // Authentication-related routes (e.g., login, register)
app.use(itSupportRoutes);  // IT support routes
app.use('/api', printerRoutes);  // Printer routes
app.use('/api', require('./routes/pc'));
app.use('/api', require('./routes/itInventory')); // IT inventory routes
app.use('/api', require('./routes/phones'));  // IT support routes
// Optional: A public route to test server functionality
app.get('/', (req, res) => {
  res.send('Welcome to the server');
});

app.get('/api/printers', async (req, res) => {
  try {
    const printers = await PrinterModel.find(); // Fetch data from MongoDB
    res.json(printers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch printers' });
  }
});
app.post('/api/printers', async (req, res) => {
  try {
    const newPrinter = new PrinterModel(req.body); // Expecting ip, officeNo, officeName
    const savedPrinter = await newPrinter.save();
    res.status(201).json(savedPrinter);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add printer' });
  }
});


// Admin dashboard route protected by authentication middleware
app.get('/api/admin-dashboard', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).send('Access Denied: You do not have permission to view this page');
  }

  res.send(`Welcome Eng., ${req.user.name}`);
});
app.get('/api/user-dashboard', authenticateToken, async (req, res) => {
  try {
    const issues = await ITSupport.find({ email: req.user.email }) || [];
    res.json({
      message: `Hello Mr./Ms. ${req.user.name}`,
      name: req.user.name,
      email: req.user.email,
      issues, // Always return an array, even if empty
    });
  } catch (error) {
    console.error('Error fetching user dashboard data:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

app.post('/api/contact-it-support', authenticateToken, (req, res) => {
  const { name, email, problem } = req.body;

  if (!name || !email || !problem) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Simulate saving the issue (e.g., to a database or sending an email)
  console.log(`New IT support request from ${name} (${email}): ${problem}`);

  // Respond with success
  res.status(200).json({ message: 'Issue submitted successfully!' });
});

app.post('/api/it-support-response', authenticateToken, async (req, res) => {
  try {
    const { issueId, responseMessage } = req.body;

    if (req.user.role !== 'support') {
      return res.status(403).send('Access Denied: You do not have permission.');
    }

    // Update the issue with the IT Support response
    await ITSupport.findByIdAndUpdate(issueId, { response: responseMessage });

    res.status(200).send('Response sent successfully.');
  } catch (error) {
    console.error('Error sending IT Support response:', error);
    res.status(500).send('Server error.');
  }
});









// Start the server
app.listen(PORT||procces.env.PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
