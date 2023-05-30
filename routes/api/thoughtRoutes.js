const router = require('express').Router();

const { Router } = require('express');
const {
    getThoughts,
    getSingleThought,
    createThought
} =require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId').get(getSingleThought);

module.exports = router;