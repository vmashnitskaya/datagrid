
const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    app_id: {type: String, required: true},
    app_name: {type: String, required: true},
    app_version: {type: String, required: true},
    app_domain: {type: String, required: true},
    app_url: {type: String, required: true},
    owner: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('AppData', schema)