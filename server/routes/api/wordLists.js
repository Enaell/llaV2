const mongoose = require('mongoose');
const auth = require('../auth');
const WordLists = mongoose.model('WordLists');
const router = require('express').Router();
const formatter = require('../utils');
const { VISIBILITY, ROLES } = require('../../models/utils')


router.get('/', auth.optional, async (req, res, next) => {
    const {payload} = req;
    const language = req.query && req.query.language ? {language: req.query.language} : {};
    const targetLanguage = req.query && req.query.targetlanguage ? {targetLanguage: req.query.targetlanguage} : {};

    let wordLists = []

    if (payload && payload.id && payload.role !== ROLES.Customer)
    {
        console.log('API WORDLISTS get all wordLists as ADMIN or MODERATOR')
        wordLists = await WordLists.find({...language, ...targetLanguage} ).populate('words');

    }
    else if (payload && payload.id)
    {
        console.log('API WORDLISTS get all words as CUSTOMER')
        wordLists = await WordLists.find({$or:[{ visibility: VISIBILITY.Visitor, validated: true }, { visibility: VISIBILITY.LoggedIn, validated: true }, {visibility: VISIBILITY.Owner, owner: payload.id }] }).populate('words');
    }
    else
    {
        console.log('API WORDLISTS get all words as VISITOR')
        wordLists = await WordLists.find({ visibility: VISIBILITY.Visitor, validated: true }).populate('words');
    }
    console.log('-----------------------------------------------------')
    console.log(wordLists);

    formattedWordLists = formatter.formatWordLists(wordLists, 'name');
    console.log(formattedWordLists);
    return res.json({ wordLists: formattedWordLists })
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