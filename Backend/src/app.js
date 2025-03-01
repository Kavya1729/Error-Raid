const express = require('express');
const aiRoutes = require('./routes/ai.routes');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Hello World');
})

async function ConnectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Error:', error.message);
    }
}

ConnectDB();

app.use('/auth',authRoutes);
app.use('/ai',aiRoutes);



module.exports = app;