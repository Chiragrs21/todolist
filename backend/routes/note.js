const express = require('express')
const route = express.Router()
const fetchuser = require('../middleware/fetchuser')
const notes = require('../models/notebook')
const { body, validationResult } = require('express-validator');

route.post('/data', fetchuser, [
    body('title', 'Enter valid title').isLength({ min: 3 }),
    body('Description', "Enter valid description").isLength({ min: 4 }),
    body('Tag', 'Enter valid tag').isLength({ min: 2 })
], async (req, res) => {

    let error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }
    try {
        const data = await notes.create({
            user: req.collection.id,
            title: req.body.title,
            Description: req.body.Description,
            Tag: req.body.Tag,
        })
        res.json(data)
    }
    catch (err) {
        res.send(err.message).status(400)
    }


})
route.get('/getnotebook', fetchuser, async (req, res) => {
    const data = await notes.find({ user: req.collection.id })
    res.json(data)
})


route.put('/updatethings/:id', fetchuser, async (req, res) => {
    try {
        const { title, Description, tag } = req.body;
        const newnote = {}
        if (title) { newnote.title = title };
        if (Description) { newnote.Description = Description };
        if (tag) { newnote.tag = tag }

        let note = await notes.findById(req.params.id);
        if (!note) { return res.status(404).send("not found") }

        // res.send(notes.collection)
        if (note.user.toString() !== req.collection.id) {
            return res.status(401).send("not allowed")
        }

        note = await notes.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true })

        res.json({ note });

    }

    catch (err) {
        res.status(400).send(err.message)
    }


})

//route 4:delete the notes /auth/note/deletethings/:id

route.delete('/delete/:id', fetchuser, async (req, res) => {
    try {
        let note = await notes.findById(req.params.id);
        if (!note) { return res.status(404).send("not found") }

        // res.send(notes.collection)
        if (note.user.toString() !== req.collection.id) {
            return res.status(401).send("not allowed")
        }

        note = await notes.findByIdAndDelete(req.params.id)

        res.json({ note });

    }
    catch (err) {
        res.send(err.message)
    }

})
module.exports = route;