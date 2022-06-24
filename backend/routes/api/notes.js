const express = require('express');
const asyncHandler = require('express-async-handler');
cnst { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Note } = require('../../db/models/note');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');

const route = express.Router();
