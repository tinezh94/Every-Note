const express = require('express');
const asyncHandler = require('express-async-handler');

const db = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

//Get notebooks
router.get('/user/:id', asyncHandler(async(req, res) => {
    const userId = req.params.id;
    const notebooks = await db.Notebook.findAll({
        where: {userId: userId},
        include: [db.Note],
        order: ['id', 'DESC']
    });

    return res.json(notebooks)
}))

//Get notebook
router.get('/:id', asyncHandler(async (req, res) => {
    const notebookId = req.params.id;
    const notebook = await db.Notebook.findByPk(notebookId, {
        include: [db.Note],
        order: ['id', 'DESC']
    });

    return res.json(notebook)

}))
//Create notebook
router.post('/user/:id', asyncHandler(async (req, res) => {
    const userId = req.params.id;

    const { name } = req.body;
    const notebook = await db.Notebook.create({
        name,
        userId: userId,
    });

    return res.json(notebook);
}))

//Update notebook
router.put('/:id', asyncHandler(async (req, res) => {
    const notebookId = req.params.id;
    const { name } = req.body;
    const notebook = await db.Notebook.findByPk(notebookId);
    notebook.name = name;
    return res.json(notebook);
}))

//Delete notebook
router.delete('/:id', asyncHandler(async (req, res) => {
    const notebookId = req.params.id;
    await db.NoteBook.destroy();
    return res.json(notebookId);
}))

module.exports = router;
