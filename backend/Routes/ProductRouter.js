const express = require('express');
const ensureAuthenticated = require('../Middlewares/Auth');

const router = express.Router();

router.get('/', ensureAuthenticated, (req, res) => {
    res.status(200).json([
        {
            name: 'Alok Yadav',
            course: "BCA",
            Jobrole:"Full Stack Developer"
        },
        {
            name: 'Atul Kumar',
            course: "BCA",
            Jobrole:" Java Developer"
        }
    ]);
});

module.exports = router;