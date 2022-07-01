const express = require('express');
const asyncHandler = require('express-async-handler');

const db = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();
router.use((req, res, next) => {
    console.log("In THE NOTEBOOK ROUTER");
    next();
})
//Get all notes belong to the notebook
router.get('/:id(\\d+)/notes', asyncHandler(async (req, res) => {
    const notebookId = req.params.id;
    console.log("In backend route, get notes", notebookId)
    const notes = await db.Note.findAll({
        where: {
            notebookId: notebookId
        },
        order: [["updatedAt", "DESC"]],
    });
    console.log("These are notes", notes)
    res.json(notes);
}));

//Get notebooks
router.get('/user/:id', asyncHandler(async(req, res) => {
    const userId = req.params.id;
    const notebooks = await db.Notebook.findAll({
        where: {
            userId: userId
        },
        include: [db.Note],
        // order: ['id', 'DESC']
    });
    console.log("BACKEND ROUTE", notebooks)

    res.json(notebooks)
}))

//Get notebook
router.get('/notebook/:id', asyncHandler(async (req, res) => {
    const notebookId = req.params.id;
    console.log(notebookId)
    const notebook = await db.Notebook.findByPk(notebookId,{
        include: [db.Note],
    }
        // order: ['id', 'DESC']
    );
    return res.json(notebook)
}));


//Create notebook
router.post('/', asyncHandler(async (req, res) => {
    // const userId = req.params.id;
    console.log("in backend ROUTE")
    const { name, userId } = req.body;
    console.log("BACKEND", req.body)
    const notebook = await db.Notebook.create({
        name,
        userId,
    });

    console.log("BACKEND CREATED NOTBOOK", notebook)

    res.json(notebook);
}))

//Update notebook
router.put('/:id(\\d+)', asyncHandler(async (req, res) => {
    const notebookId = req.params.id;
    const { name } = req.body;
    const notebook = await db.Notebook.findByPk(notebookId);
    const newNotebook = await notebook.update({
        name
    });

    return res.json(newNotebook);
}))

//Delete notebook
router.delete('/:id(\\d+)', asyncHandler(async (req, res) => {
    const notebookId = req.params.id;
    console.log("backend ROUTE", 'notebookId')
    const notebook = await db.Notebook.findByPk(parseInt(notebookId));
    // console.log(notebook);
    const userId = notebook.userId;
    // console.log(notebook.userId)

    await notebook.destroy();

    console.log('notebook DESTROYE backend', notebook)
    const notebooks = await db.Notebook.findAll({
        where: {
            userId: userId,
        }
    });

    return res.json(notebooks);
    console.log(notebooks)
}))

module.exports = router;
