const {Router} = require('express');
const LocationData = require('../models/LocationData');
const auth = require('../middleware/auth.middleware');
const router = Router();

router.post('/create', auth, async (req, res) => {
    try {
        const {id, city, country, state, country_code, timezone} = req.body;

        const locationDataUnit = new LocationData({
            id, city, country, state, country_code, timezone, owner: req.user.userId
        });

        await locationDataUnit.save();

        res.status(201).json({ locationDataUnit });
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try again later' });
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const locationsData = await LocationData.find({ owner: req.user.userId });
        res.status(200).json(locationsData)
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try again later' });
    }
})

router.delete('/delete', auth, async (req, res) => {
    try {
        const {rowsSelected} = req.body;
        const documentsDeleted = LocationData.deleteMany({_id: { $in: rowsSelected}})
        res.status(200).json({message: `${documentsDeleted.deletedCount} items were deleted.`})
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try again later' });
    }
})


module.exports = router;