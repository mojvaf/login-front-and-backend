const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator/check')


const User = require('../models/User')
const Contact = require('../models/Contact')

// Get api/contact
// get all users contacts
router.get('/', auth, async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 })
        res.json(contacts)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('server Errors')
    }
})

// post api/contacts
// add new contact
router.post('/', [auth, [
    check('name', 'Name is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { name, email, phone, type } = req.body
    try {
        const newContact = new Contact({
            name,
            email,
            phone,
            type,
            user: req.user.id
        })
        const contact = await newContact.save()

        res.json(contact)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("server errors in contact")

    }

}
)


// put api/contacts/:id
// update a contact
router.put('/:id', auth, async (req, res) => {
    const { name, email, phone, type } = req.body

    //build contact object
    const contactField = {};
    if (name) contactField.name = name
    if (email) contactField.email = email
    if (phone) contactField.phone = phone
    if (type) contactField.type = type


    try {
        let contact = await Contact.findById(req.params.id)
        if (!contact) return res.status(404).json({ mes: "contact nt found" })

        // make sure user owns the contact

        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "not authorized" })

        }
        contact = await Contact.findByIdAndUpdate(req.params.id, { $set: contactField }, { new: true })

        res.json(contact)
    } catch (err) {

        console.error(err.message)
        res.status(500).send("server errors in contact")
    }


})

// delete api/contact
// delete a contact
router.delete('/:id', auth, async (req, res) => {


    try {
        let contact = await Contact.findById(req.params.id)
        if (!contact) return res.status(404).json({ mes: "contact not found" })

        // make sure user owns the contact

        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "not authorized" })

        }
        await Contact.findByIdAndRemove(req.params.id)

        res.json({ msg: "contact removed" })
    } catch (err) {

        console.error(err.message)
        res.status(500).send("server errors in contact")
    }
})

module.exports = router