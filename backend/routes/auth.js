const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// password must be at least 5 chars long
// Create a User using: POST "/api.auth". Doesn't require Auth.
router.post('/',
body('name', 'Enter a Valid Name').isLength({min:3}),
body('email', 'Enter a Valid Email').isEmail(),
body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
 (req, res)=>{ 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
res.send(req.body);
})

module.exports = router;