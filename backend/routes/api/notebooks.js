const express = require('express');
const asyncHandler = require('express-async-handler');

const db = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();
router.use((req, res, next) => {
    next();
})
//Get all notes belong to the notebook
router.get('/:id(\\d+)/notes', asyncHandler(async (req, res) => {
    const notebookId = req.params.id;
    const notes = await db.Note.findAll({
        where: {
            notebookId: notebookId
        },
        order: [["updatedAt", "DESC"]],
    });

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


    res.json(notebooks)
}))

//Get notebook
router.get('/notebook/:id', asyncHandler(async (req, res) => {
    const notebookId = req.params.id;
    console.log("IN BACKEND ROUTE, THIS IS NOTEBOOKid", notebookId)

    const notebook = await db.Notebook.findByPk(notebookId,{
        include: [db.Note],
    }
        // order: ['id', 'DESC']
    );
    console.log("IN BACKEND, THIS IS NOTEBOOK", notebook)
    return res.json(notebook)
}));

const validateName = [
    check('name')
    .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Notebook name cannot be empty')
        .isLength({max: 50})
        .withMessage('Notebook name cannot be longer than 50 characters'),
        handleValidationErrors
];


//Create notebook
router.post('/', validateName, asyncHandler(async (req, res) => {
    // const userId = req.params.id;

    const { name, userId } = req.body;

    const notebook = await db.Notebook.create({
        name,
        userId,
    });


    res.json(notebook);
}))

//Update notebook
router.put('/:id(\\d+)', validateName, asyncHandler(async (req, res) => {
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

    const notebook = await db.Notebook.findByPk(parseInt(notebookId));
    // console.log(notebook);
    const userId = notebook.userId;
    // console.log(notebook.userId)

    await notebook.destroy();


    const notebooks = await db.Notebook.findAll({
        where: {
            userId: userId,
        }
    });

    return res.json(notebooks);

}))

module.exports = router;
