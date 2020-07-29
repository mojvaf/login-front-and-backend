const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator/check')



const User = require('../models/User')
// Get api/auth
// Get logged in user
// private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch (err) {
        console.error(err.message)
        res.status(500).json('server error')
    }
})

// Post api/auth
// Auth user and get token
router.post('/', [
    check('email', 'please include a valid email').isEmail(),
    check('password', 'password is required').exists()
]
    , async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const { email, password } = req.body

        try {
            let user = await User.findOne({ email })

            if (!user) {
                return res.status(400).json({ msg: 'invalid credentials email' })
            }
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({ mes: 'invalid credentials password' })
            }

            const payload = {
                user: {
                    id: user.id
                }
            }
            jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
                if (err) throw err
                res.json({ token })
            })

        } catch (err) {
            console.error(err.message)
            res.status(500).send('server erros auth part')
        }


    })

module.exports = router