const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db.js')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('TaskMaster is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});