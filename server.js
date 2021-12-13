const express = require('express');
const app = express();
const connectToDB = require('./config/mongoConnection');

// Connect to Mongo DB
connectToDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (request, response) => response.send('Test API ...'));

// Routes
app.use('/api/users', require('./api/users'));
app.use('/api/auth', require('./api/auth'));
app.use('/api/profile', require('./api/profile'));
app.use('/api/posts', require('./api/posts'));

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
