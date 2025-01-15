// Import necessary modules
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

// Initialize the app   
const app = express();
const PORT = 5050;

//Middleware setup

// Use morgan to log HTTP requests in 'dev' mode
app.use(morgan('dev'));

// Use cors to allow requests from specific origins
const allowedOrigins = ['http://localhost:4000', 'http://example.com'];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }   else {
                callback(new Error('Not Allowed by CORS'));
        }
    }
}))

// Middleware to parse JSON request
app.use(express.json());

// Routes

// Home route
app.get('/', (req, res) => {
    res.send('Welcome to the Middleware Practice API!');
});

// Data Route
app.get('/data', (req, res) => {
    res.json({ message : 'Here is your data!', data: [1, 2, 3, 4, 5] });
});

// Submit Route
app.post('/submit', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email must be provided!' });
    }
    res.status(200).json({ message : 'Data submitted successfully', data: { name, email } });
});

// Error handling
app.use(( err, req, res, next) => {
    if (err.message === 'Not allowed by CORS') {
        return res.status(403).json({ error: err.message });
    }
    next(err);
});

// Start the server and connect
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});