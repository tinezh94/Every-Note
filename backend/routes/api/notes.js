const express = require('express');
const asyncHandler = require('express-async-handler');

const db = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');

const router = express.Router();

//Get notes
router.get('/', asyncHandler(async (req, res) => {
    const notes = await db.Note.findAll();
    return res.json(notes);
}));

const validationNote = [
    check('content')
        .exists({checkFalsy: true})
        .notEmpty()
        .withMessage('Please provide a title for your note'),
    handleValidationErrors
];

// Post note
router.post('/', validationNote, asyncHandler(async (req, res) => {
    console.log(req.body)
    const note = await db.Note.create(req.body);
    console.log(note)
    return res.json(note);
}));

//Update note
router.put('/:id', validationNote, asyncHandler(async (req, res) => {
    const noteId = req.params.id;
    const { title, content } = req.body;
    const note = await db.Note.findByPk(noteId);
    await db.Note.update({
        title,
        content
    },
    {where: {}
    })
    return res.json(note);
}));

router.delete('/:id', asyncHandler(async (req, res) => {
    const noteId = req.params.id;
    const note = await db.Note.findByPk(noteId);
    await note.destroy();
    res.json({noteId});
}));

module.exports = router;
