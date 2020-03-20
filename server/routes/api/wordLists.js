const mongoose = require('mongoose');
const auth = require('../auth');
const WordLists = mongoose.model('WordLists');
const router = require('express').Router();
const { VISIBILITY, ROLES } = require('../../models/utils')


router.get('/', auth.optional, (req, res, next) => {
    const {payload} = req;

    if (payload && payload.id && payload.role !== ROLES.Customer)
    {
        Words.find({})
        .then(words => {
            console.log('API WORDLISTS get all words as ADMIN or MODERATOR')
            console.log(words);
            return res.json({ words: words })
         })
    }
    else if (payload && payload.id)
    {
        Words.find({$or:[{ visibility: VISIBILITY.Visitor, validated: true }, { visibility: VISIBILITY.LoggedIn, validated: true }, {visibility: VISIBILITY.Owner, owner: payload.id }] })
        .then(words => {
            console.log('API WORDLISTS get all words as CUSTOMER')
            console.log(words);
            return res.json({ words: words })
         }) 
    }
    else{
        Words.find({ visibility: VISIBILITY.Visitor, validated: true })
        .then(words => {
            console.log('API WORDLISTS get all words as VISITOR')
            console.log(words);
            return res.json({ words: words })
         })
    }
});


router.post('/', auth.required, (req, res, next) => {
    const { payload: { id, role } } = req;
    const { body: { wordLists } } = req;

    const finalWordLists = role === ROLES.Admin || role === ROLES.Moderator 
        ? wordLists.map(wordList => {return new WordLists({...wordList, owner: id})})
        : words.map(word => {return new Words({...word, owner: id, validated: false})});

    WordLists.collection.insertMany(finalWordLists)
    .then(data => res.json({wordLists: data}))
    .catch(error => {
        console.log("Couldn't save words");
        console.log(error);
        return res.sendStatus(400);
    });
})

module.exports = router;