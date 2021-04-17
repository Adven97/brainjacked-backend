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

router.post('/login', async (req, res) => {
    Human.findOne({
        chip_code: req.body.chip_code
    }, (err, usr) => {
        if (usr === null) {
            return res.status(400).send({
                message: "User not found."
            });
        } else {
            if (usr.validPassword(req.body.password)) {
                return res.status(201).send(usr);
            } else {
                return res.status(400).send({
                    message: "Wrong Password"
                });
            }
        }
    })
});
router.post('/register', async (req, res) => {
    const user = new Human({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        chip_code: req.body.chip_code,
        password: req.body.password,
    });
    user.setPassword(req.body.password);

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