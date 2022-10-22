const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const fetchuser = require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator');

// Endpoint. FetchAllNotes using: GET "/api/notes/fetchallnotes". Login Require.
router.get('/fetchallnotes', fetchuser,
    async (req, res) => {
        try {
            const notes = await Note.find({ user: req.user.id })
            res.json(notes);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })
// Endpoint. Add a Notes using: POST "/api/notes/addnote". Login Require.
router.post('/addnote',
    fetchuser, // This fetchuser Gives us a user ID, This Function is in Middleware directory
    [
        body('title', 'Enter a Valid Title').isLength({ min: 3 }), // Title Must be at least 3 Character
        body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }) //Decription Must be at least 5 Character long
    ], async (req, res) => {
        try {

            const { title, description, tag } = req.body;   // Destructuring.
            const errors = validationResult(req);           // If there are errors, return Bad Request and the errors  
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Note({                         // Create New Note. new keyword create A new empty object.
                title, description, tag, user: req.user.id
            })
            const savedNote = await note.save();            // .save() method Save New Created Note.
            res.json(savedNote);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })


// Endpoint. Update an Existing Note using: POST "/api/notes/updatenote/:id'". Login Require.
router.put('/updatenote/:id',
    fetchuser, // This fetchuser Gives us a user ID, This Function is in Middleware directory3
    async (req, res) => {
        try {
            const { title, description, tag, update } = req.body;   // Destructuring.
            const NewNote = {};
            console.log(NewNote);
            if (title) { NewNote.title = title }
            if (description) { NewNote.description = description }
            if (tag) { NewNote.tag = tag }
            // {NewNote.update =  Date.now()};

            // Find the Note to be Updated and Update it.
            let note = await Note.findById(req.params.id);
            if (!note) { return res.status(404).send("Not Found") }
            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("Not Allowed")
            }
            note = await Note.findByIdAndUpdate(req.params.id, { $set: NewNote }, { new: true })
            res.json(note);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })
// Endpoint. Delete Note using: DELETE "/api/notes/deletenote/:id'". Login Require.
router.delete('/deletenote/:id',
    fetchuser, // This fetchuser Gives us a user ID, This Function is in Middleware directory3
    async (req, res) => {
        try {
            // Find the Note to be Deleted and Delete it.
            let note = await Note.findById(req.params.id);
            if (!note) { return res.status(404).send("Not Found") }
            // Allow Deletion Only if User Own this Note
            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("Not Allowed")
            }
            note = await Note.findByIdAndDelete(req.params.id)
            res.json({ "Succes": "Note Has Been Deleted", note: note });

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

module.exports = router;