const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const notesRouter = require('./notes.js');
const notebooksRouter = require('./notebooks.js');
const scratchesRouter = require('./scratchpad.js');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/notebooks', notebooksRouter);

router.use('/notes', notesRouter);

router.use('/scratches', scratchesRouter);


module.exports = router;
