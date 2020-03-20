const mongoose = require('mongoose');
const auth = require('../auth');
const Words = mongoose.model('Words');
const router = require('express').Router();
const { VISIBILITY, ROLES } = require('../../models/utils')


router.get('/', auth.optional, (req, res, next) => {
    const {payload} = req;
    const language = req.query && req.query.language ? {language: req.query.language} : {}

    console.log(payload);
    if (payload && payload.id && payload.role !== ROLES.Customer)
    {
        Words.find(language)
        .then(words => {
            console.log('API WORDS get all words as ADMIN or MODERATOR')
            console.log(words);
            return res.json({ words: words })
         })
    }
    else if (payload && payload.id)
    {
        Words.find({$or:[{ visibility: VISIBILITY.Visitor, validated: true, ...language }, { visibility: VISIBILITY.LoggedIn, validated: true, ...language }, {visibility: VISIBILITY.Owner, owner: payload.id, ...language }] })
        .then(words => {
            console.log('API WORDS get all words as CUSTOMER')
            console.log(words);
            return res.json({ words: words })
         }) 
    }
    else{
        Words.find({ visibility: VISIBILITY.Visitor, validated: true, ...language })
        .then(words => {
            console.log('API WORDS get all words as VISITOR')
            console.log(words);
            return res.json({ words: words })
         })
    }
});

router.post('/', auth.required, (req, res, next) => {
    const { payload: { id, role } } = req;
    const { body: { words } } = req;

    const finalWords = role === ROLES.Admin || role === ROLES.Moderator 
        ? words.map(word => {return new Words({...word, owner: id})})
        : words.map(word => {return new Words({...word, owner: id, validated: false})});

    Words.collection.insertMany(finalWords)
    .then(data => res.json({words: data}))
    .catch(error => {
        console.log("Couldn't save words");
        console.log(error);
        return res.sendStatus(400);
    });
})

module.exports = router;