const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const notesRouter = require('./notes.js');
const notebooksRouter = require('./notebooks.js');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/notebooks', notebooksRouter);

router.use('/notes', notesRouter);


module.exports = router;
