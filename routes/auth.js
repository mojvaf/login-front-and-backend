const express = require('express')
const router = express.Router()

// Get api/auth
// Get logged in user
// private
router.get('/', (req, res) => {
    res.send('get logged in user')
})

// Post api/auth
// Auth user and get token
router.post('/', (req, res) => {
    res.send('get logged in user')
})

module.exports = router