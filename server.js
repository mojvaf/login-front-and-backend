const express = require('express');
const connectDB = require('./config/db')


const app = express();

//connect Database
connectDB()


//Init Middleware(we can accept data)
app.use(express.json({ extended: false }))

app.get('/', (req, res) => res.send({ msg: 'hello I am here' }))

// Define Routes
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contact', require('./routes/contact'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server started on port ${PORT}`))