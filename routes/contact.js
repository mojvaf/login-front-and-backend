const express = require('express')
const router = express.Router()

// Get api/contact
// get all users contacts
router.get('/', (req, res) => {
    res.send('get all contacts')
})

// post api/contacts
// add new contact
router.post('/', (req, res) => {
    res.send('add contact')
})

// put api/contacts/:id
// update a contact
router.put('/:id', (req, res) => {
    res.send('update contact')
})

// delete api/contact
// delete a contact
router.delete('/:id', (req, res) => {
    res.send('delete a contacts')
})

module.exports = router