const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    users: [{
        type: Schema.ObjectId,
        ref: 'Users'
    }]
});

const model = mongoose.model('Chats', mySchema);

module.exports = model;