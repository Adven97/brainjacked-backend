const express = require('express');
const router = express.Router();
const User = require('../../models/Users2');

router.patch('/:chip_code', async (req, res) => {
    try {
        const user = await User.updateOne({
            chip_code: req.params.chip_code,
        }, {
            $set: {
                "skills.emotion.value": req.body.value
            }
        });
        res.json(user);
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
        }, {
            "skills.emotion": 1
        });
        res.json(user);
    } catch (err) {
        res.json({
            message: err
        })
    }
});

router.delete('/:chip_code', async (req, res) => {
    try {
        const removedUser = await User.remove({
            _id: req.params.chip_code
        });
        res.json(removedUser);
    } catch (err) {
        res.json({
            message: err
        })
    }
});

module.exports = router;