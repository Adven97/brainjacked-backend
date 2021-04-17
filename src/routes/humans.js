const express = require('express');
const router = express.Router();
const Human = require('../models/Human');

router.get('/', async (req, res) => {
    try {
        const users = await Human.find();
        res.json(users)
    } catch (err) {
        res.json({
            message: err
        })
    }
})

router.post('/register', async (req, res) => {
    const user = new Human({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        chip_code: req.body.chip_code,
        password: req.body.password,
    });

    try {
        const savedHuman = await user.save();
        res.json(savedHuman)
    } catch (err) {
        res.json({
            message: err
        })
    }
});

router.get('/:chip_code', async (req, res) => {
    try {
        const user = await Human.findById(req.params.chip_code);
        res.json(user);
    } catch (err) {
        res.json({
            message: err
        })
    }
});

router.delete('/:chip_code', async (req, res) => {
    try {
        const removedHuman = await Human.remove({
            _id: req.params.chip_code
        });
        res.json(removedHuman);
    } catch (err) {
        res.json({
            message: err
        })
    }

});

module.exports = router;