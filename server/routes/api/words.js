const mongoose = require('mongoose');
const auth = require('../auth');
const Words = mongoose.model('Words');
const Users = mongoose.model('Users');
const router = require('express').Router();
const formatter = require('../utils');
const { VISIBILITY, ROLES } = require('../../models/utils');

router.get('/', auth.optional, (req, res, next) => {
    const {payload} = req;
    const language = req.query && req.query.language ? {language: req.query.language} : {}

    console.log(payload);
    if (payload && payload.id && payload.role !== ROLES.Customer)
    {
        Words.find({...language})
        .then(words => {
            console.log('API WORDS get all words as ADMIN or MODERATOR')
            console.log(words);
            return res.json({ words: words.map(word => {
                let newWord = {...word, id: word._id};
                delete newWord._id;
                return newWord;
            })})
         })
    }
    else if (payload && payload.id)
    {
        Words.find({$or:[{ visibility: VISIBILITY.Visitor, validated: true, ...language }, { visibility: VISIBILITY.LoggedIn, validated: true, ...language }, {visibility: VISIBILITY.Owner, owner: payload.id, ...language }] })
        .then(words => {
            console.log('API WORDS get all words as CUSTOMER')
            console.log(words);
            return res.json({ words: words.map(word => {
                let newWord = {...word, id: word._id};
                delete newWord._id;
                return newWord;
            })})         }) 
    }
    else{
        Words.find({ visibility: VISIBILITY.Visitor, validated: true, ...language })
        .then(words => {
            console.log('API WORDS get all words as VISITOR')
            console.log(words);
            return res.json({ words: words.map(word => {
                let newWord = {...word, id: word._id};
                delete newWord._id;
                return newWord;
            })})         })
    }
});

router.post('/', auth.required, async (req, res, next) => {
    const { payload: { id, role } } = req;
    const { body: { words } } = req;

    try {
        const finalWords = role === ROLES.Admin || role === ROLES.Moderator 
            ? words.map(word => {return new Words({...word, owner: id})})
            : words.map(word => {return new Words({...word, owner: id, validated: false})});
    
        const data = await Words.collection.insertMany(finalWords);
        res.json({words: data})
    }
    catch(error) {
        console.log("Couldn't save words");
        console.log(error);
        return res.sendStatus(400);
    };
});

router.patch('/', auth.required, async (req, res, next) => {
    try {
        const { payload: { id, role } } = req;
        const { body: {word} } = req;
        
        const owner = await Users.findOne({username: word.owner})
        if (owner._id !== id && !(role === ROLES.Admin || role.Moderator))
            return res.status(401).send({status: 401, message: "User is not allowed to modify other's wordlist"});
        
        const wordUpdates = formatter.formatWordUpdates(word, (role === ROLES.Admin || role.Moderator));

        const w = await Words.findByIdAndUpdate(word.id, wordUpdates, {new: true})

        return res.status(200).send({status:200, message: w})
        } catch (error) {
        console.log("Couldn't update word");
        console.log(error);
        return res.status(500).send({status: 500, message: error});
    }
});

module.exports = router;