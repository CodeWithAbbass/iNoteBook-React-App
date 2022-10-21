const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');// This is bcryptjs, Which is Convert our PlaintextPassword to Hashing
const jwt = require('jsonwebtoken'); // This is JSON Web Token We User Sign in We give the User A Token, and When a User Again Login, Token Will be check
const JWT_SECRET = "Anonymouse";     // This is Signture.
// password must be at least 5 chars long
// Create a User using: POST "/api.createuser". No Login Require.
router.post('/createuser',
    body('name', 'Enter a Valid Name').isLength({ min: 3 }),
    body('email', 'Enter a Valid Email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
    async (req, res) => {
        // If there are errors, return Bad Request and the errors  
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Check whether the user with this email exists already
        try {
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                return res.status(400).json({ Error: "Sorry User Already Exist" })
            }
            // Here We Hashing 
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const SecPass = await bcrypt.hash(req.body.password, salt);
            // Create a New User 
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: SecPass // Hashing Password
            })
            //This is Data Variable in Which We Store User ID After User is Created.
            const data = { user: { id: user.id } }
            const authToken = jwt.sign(data, JWT_SECRET)
            res.json({authToken})

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Something Wrong")
        }
        // .then(user => res.json(user))
        // .catch(err => {
        //     console.log(err);
        //     res.json({ Error: "Please Enter Unique Email Address" }
        //     )
        // })
    })



module.exports = router;