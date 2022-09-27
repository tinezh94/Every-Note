const express = require('express');
const asyncHandler = require('express-async-handler');

const db = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');

const router = express.Router();

//Get notes
router.get('/user/:id', asyncHandler(async (req, res) => {
    const userId = req.params.id;

    const notes = await db.Note.findAll({
        where: {
            userId: userId,
        },
        order: [["updatedAt", "DESC"]],
    });
    return res.json(notes);
}));

// Get One Note
router.get('/:id', asyncHandler(async (req, res) => {
    const noteId = req.params.id;
    const note = await db.Note.findByPk(noteId);
    return res.json(note);
}))

const validationNote = [
    check('title')
        .exists({checkFalsy: true})
        .notEmpty()
        .withMessage('Please provide a title for your note'),
    handleValidationErrors
];

// Post note
router.post('/', validationNote, asyncHandler(async (req, res) => {

    const { title, content, userId, notebookId } = req.body;

    const newNote = await db.Note.create({
        title: title,
        content: content,
        userId: userId,
        notebookId: notebookId
    });

    console.log('backend post newnote', newNote)

    const notes = await db.Note.findAll({
        where: {
            userId,
            notebookId
        },
        order: [["updatedAt", "DESC"]],
    });

    return res.json(notes);
}));

//Update note
router.put('/:id(\\d+)', validationNote, asyncHandler(async (req, res) => {
    const noteId = req.params.id;

    const { title, content, userId, notebookId } = req.body;

    const note = await db.Note.findByPk(noteId);

    const newNote = await note.update({
        title: title,
        content: content,
        userId: userId,
        notebookId: notebookId
    });


    res.json(newNote);
}));

router.delete('/note/:id(\\d+)', asyncHandler(async (req, res) => {
    const noteId = req.params.id;


    const note = await db.Note.findByPk(noteId);

    await note.destroy();

    res.json(noteId);
}));

module.exports = router;
