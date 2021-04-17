const express = require('express');
const router = express.Router();
const User = require('../models/Users2');

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users)
    } catch (err) {
        res.json({
            message: err
        })
    }
})

router.post('/login', async (req, res) => {
    User.findOne({
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
    const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        chip_code: req.body.chip_code,
        password: req.body.password,
        dominantHalf: req.body.dominantHalf,
        skills: req.body.skills,
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
        const user = await User.find({
            chip_code: req.params.chip_code,
        });
        res.json(user);
    } catch (err) {
        res.json({
            message: err
        })
    }
});

router.delete('/:userId', async (req, res) => {
    try {
        const removedUser = await User.remove({
            _id: req.params.userId
        });
        res.json(removedUser);
    } catch (err) {
        res.json({
            message: err
        })
    }

});

module.exports = router;