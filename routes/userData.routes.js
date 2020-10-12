const {Router} = require('express');
const UserData = require('../models/UserData');
const auth = require('../middleware/auth.middleware');
const router = Router();

router.post('/create', auth, async (req, res) => {
    try {
        const {id, first_name, last_name, date, email, gender, job_title} = req.body;

        const userDataUnit = new UserData({
            id, first_name, last_name, date, email, gender, job_title, owner: req.user.userId
        });

        await userDataUnit.save();

        res.status(201).json({ userDataUnit });
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try again later' });
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const usersData = await UserData.find({ owner: req.user.userId });
        res.status(200).json(usersData)
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try again later' });
    }
});

router.delete('/delete', auth, async (req, res) => {
    try {
        const {rowsSelected} = req.body;
        const documentsDeleted = UserData.deleteMany({_id: { $in: rowsSelected}})
        res.status(200).json({message: `${documentsDeleted.deletedCount} items were deleted.`})
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try again later' });
    }
})


module.exports = router;