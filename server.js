const express = require('express');

const app = express();

app.get('/', (req, res) => res.send({ msg: 'hello I am here' }))

// Define Routes
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contact', require('./routes/contact'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server started on port ${PORT}`))