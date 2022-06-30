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
    console.log(req.body)
    const { title, content, userId, notebookId } = req.body;
    console.log('This is req.body', req.body)
    const newNote = await db.Note.create({
        title: title,
        content: content,
        userId: userId,
        notebookId: notebookId
    });
    console.log(newNote)
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
router.put('/:id(\\d+)', asyncHandler(async (req, res) => {
    const noteId = req.params.id;
    console.log("IN BACKEND ROUTE", noteId)
    const { title, content, userId, notebookId } = req.body;

    console.log("THIS IS BACKEND ROUTE", req.body)
    const note = await db.Note.findByPk(noteId);
    console.log("This is the note", note)
    const newNote = await note.update({
        title: title,
        content: content,
        userId: userId,
        notebookId: notebookId
    });

    console.log("IN BACKEND ROUTE THIS IS NEW NOTE", newNote)

    res.json(newNote);
}));

router.delete('/note/:id(\\d+)', asyncHandler(async (req, res) => {
    const noteId = req.params.id;

    console.log('BACKEND DELETE ROUTE, NOTE ID', noteId);
    const note = await db.Note.findByPk(noteId);
    console.log("THIS IS NOTE TO DELETE", note)
    await note.destroy();
    console.log('NOTE IS DESTRYOYED')
    res.json(noteId);
}));

module.exports = router;
