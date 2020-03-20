const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/usergridBlocks', require('./userGridBlocks'));
router.use('/words', require('./words'));
router.use('/wordlists', require('./wordLists'))

module.exports = router;