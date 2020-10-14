const {Router} = require('express');
const AppData = require('../models/AppData');
const auth = require('../middleware/auth.middleware');
const router = Router();

router.post('/create', auth, async (req, res) => {
    try {
        const {app_id, app_name, app_version, app_domain, app_url} = req.body;

        const appDataUnit = new AppData({
            app_id, app_name, app_version, app_domain, app_url, owner: req.user.userId
        });

        await appDataUnit.save();

        res.status(201).json({ data: appDataUnit, message: 'The item is created.' });
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try again later' });
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const appsData = await AppData.find({ owner: req.user.userId });
        res.status(200).json(appsData)
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try again later' });
    }
})

router.delete('/delete', auth, async (req, res) => {
    try {
        const {rowsSelected} = req.body;
        const documentsDeleted = await AppData.deleteMany({_id: { $in: rowsSelected}})
        res.status(200).json({deleted: documentsDeleted.deletedCount, ids: rowsSelected})
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try again later' });
    }
})


module.exports = router;