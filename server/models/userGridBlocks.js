const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserGridLayoutsSchema = new Schema({
    name: {type: String, required: true},
    lgPosition: {type: Object, default: {x: 1, y: 1, w: 1, h: 1}},
    mdPosition: {type: Object, default: {x: 1, y: 1, w: 1, h: 1}},
    smPosition: {type: Object, default: {x: 1, y: 1, w: 1, h: 1}},
    xsPosition: {type: Object, default: {x: 1, y: 1, w: 1, h: 1}} 
});

mongoose.model('UserGridBlocks', UserGridLayoutsSchema);