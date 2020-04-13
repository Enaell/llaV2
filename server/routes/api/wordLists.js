const mongoose = require('mongoose');
const auth = require('../auth');
const WordLists = mongoose.model('WordLists');
const router = require('express').Router();
const { VISIBILITY, ROLES } = require('../../models/utils')


router.get('/', auth.optional, (req, res, next) => {
    const {payload} = req;
    const language = req.query && req.query.language ? {language: req.query.language} : {};
    const targetLanguage = req.query && req.query.targetlanguage ? {targetLanguage: req.query.targetlanguage} : {};

    if (payload && payload.id && payload.role !== ROLES.Customer)
    {
        WordLists.find({...language, ...targetLanguage} )
        .then(wordLists => {
            console.log('API WORDLISTS get all wordLists as ADMIN or MODERATOR')
            console.log(wordLists);
            return res.json({ wordLists: wordLists })
         })
    }
    else if (payload && payload.id)
    {
        WordLists.find({$or:[{ visibility: VISIBILITY.Visitor, validated: true }, { visibility: VISIBILITY.LoggedIn, validated: true }, {visibility: VISIBILITY.Owner, owner: payload.id }] })
        .then(wordLists => {
            console.log('API WORDLISTS get all words as CUSTOMER')
            console.log(wordLists);
            return res.json({ wordLists: wordLists })
         }) 
    }
    else{
        WordLists.find({ visibility: VISIBILITY.Visitor, validated: true })
        .then(wordLists => {
            console.log('API WORDLISTS get all words as VISITOR')
            console.log(wordLists);
            return res.json({ wordLists: wordLists })
         })
    }
});


router.post('/', auth.required, (req, res, next) => {
    const { payload: { id, role } } = req;
    const { body: { wordLists } } = req;

    const finalWordLists = role === ROLES.Admin || role === ROLES.Moderator 
        ? wordLists.map(wordList => {return new WordLists({...wordList, owner: id, validated: true})})
        : wordLists.map(wordList => {return new Words({...wordList, owner: id, validated: false})});

    WordLists.collection.insertMany(finalWordLists)
    .then(data => res.json({wordLists: data}))
    .catch(error => {
        console.log("Couldn't save words");
        console.log(error);
        return res.sendStatus(400);
    });
})

module.exports = router;