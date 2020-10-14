
const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    date: {type: String, required: true},
    email: {type: String, required: true},
    gender: {type: String, required: true},
    job_title: {type: String, required: true},
    owner: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('UserData', schema)