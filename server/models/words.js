const mongoose = require('mongoose');
const { LANGUAGES, VISIBILITY } = require('./utils');

const { Schema } = mongoose;

const WordsSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'Users' },
    name: {type: String, required: true},
    internationalName: {type: String, required: true},
    language: {type: String, default: LANGUAGES.Fr},
    subject: {type: [String], default: 'other'},
    translations: [{
                      name: {type: String, required: true},
                      internationalName: {type: String, required: true},
                      language: {type: String, required: true},
                      sentences: [{sentence: String, translatedSentence: String}],
                      rank: {type: Number, default: 0},
                      comments: String
                    }],
    validated: Boolean, //this field is to differenciate cards validated by admin from others)
    visibility: {type: String, default: VISIBILITY.Owner} //rank of visibility wanted by the card owner (visitor, loggedin, owner)
});

mongoose.model('Words', WordsSchema);