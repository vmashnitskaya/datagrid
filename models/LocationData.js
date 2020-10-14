
const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    city: {type: String, required: true},
    country: {type: String, required: true},
    state: {type: String, required: true},
    country_code: {type: String, required: true},
    timezone: {type: String, required: true},
    owner: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('LocationData', schema)