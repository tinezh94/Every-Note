const express = require('express');
const asyncHandler = require('express-async-handler');

const db = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();
router.use((req, res, next) => {
    next();
})

// Get all scratches belong to the user
router.get('/user/:id', asyncHandler(async(req, res) => {
    const userId = req.params.id;
    const scratches = await db.Scratchpad.findAll({
        where: {
            userId: userId
        }
    });
    res.json(scratches);
}));

// Create new scratch
router.post('/', asyncHandler(async (req, res) => {
    const { scratch, userId } = req.body;
    console.log('backend', req.body);
    const newScratch = await db.Scratchpad.create({
        scratch,
        userId,
    });

    res.json(newScratch);
}));

// Update a scratch;
router.post('/:id(\\d+)', asyncHandler(async (req, res) => {
    // const scratchId = req.params.id;
    console.log('backend', req.body);
    const { scratch, userId } = req.body;
    // const oneScratch = await db.Scratchpad.findByPk(scratchId);
    const scratches = await db.Scratchpad.findAll({
        where: {
            userId: userId
        }
    });

    console.log('scratches', scratches)
    const updatedScratch = await scratches.update({
        scratch
    });

    return res.json(updatedScratch);
}));

// Delete a scratch;
router.delete('/:id(\\d+)', asyncHandler(async (req, res) => {
    const scratchId = req.params.id;
    const scratch = await db.Scratchpad.findByPk(parseInt(scratchId));
    const userId = scratch.userId;

    await scratch.destroy();

    const scratches = await db.Scratchpad.findAll({
        where: {
            userId: userId,
        }
    });

    return res.json(scratches);
}));

module.exports = router;