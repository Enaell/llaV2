const mongoose = require('mongoose');
const auth = require('../auth');
const WordLists = mongoose.model('WordLists');
const Users = mongoose.model('Users');
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
        wordLists = await WordLists.find({...language, ...targetLanguage} ).populate('words').populate('owner');
    }
    else if (payload && payload.id)
    {
        console.log('API WORDLISTS get all wordLists as CUSTOMER')
        wordLists = await WordLists.find({$or:[{ visibility: VISIBILITY.Visitor, validated: true }, { visibility: VISIBILITY.LoggedIn, validated: true }, {visibility: VISIBILITY.Owner, owner: payload.id }] }).populate('words');
    }
    else
    {
        console.log('API WORDLISTS get all wordLists as VISITOR')
        wordLists = await WordLists.find({ visibility: VISIBILITY.Visitor, validated: true }).populate('words');
    }
    formattedWordLists = formatter.formatWordLists(wordLists, 'name', language.language);
    return res.json({ wordLists: formattedWordLists })
});


router.post('/', auth.required, async (req, res, next) => {

  const { payload: { id, role } } = req;
  const { body: { wordLists } } = req;
  
  if (!role)
    res.status(401).send({status: 401, message: "User not logged"})
  try {      
    const validated = role === ROLES.Admin || role === ROLES.Moderator;

    const finalWordLists = wordLists.map(wordList => {return new WordLists({...wordList, owner: id, validated: validated})});
    const data = await WordLists.collection.insertMany(finalWordLists);
    res.json({wordLists: data});
  }
  catch (error) {
    console.log("Couldn't save wordlists");
    console.log(error);
    return res.status(400).send({status: 400, message: "Couldn't save wordlists"});
  }
})

router.patch('/', auth.required, async (req, res, next) => {
  try {
    const { payload: { id, role } } = req;
    const { body: {wordList} } = req;
    
    const owner = await Users.findOne({username: wordList.owner}) 
    if (owner._id !== id && !(role === ROLES.Admin || role.Moderator))
      return res.status(401).send({status: 401, message: "User is not allowed to modify other's wordlist"});
    
    const wordListUpdates = formatter.formatWordListUpdates(wordList, (role === ROLES.Admin || role.Moderator));

    const wl = await WordLists.findByIdAndUpdate(wordList.id, wordListUpdates,{new: true})

    return res.status(200).send({status:200, message: wl})
  } catch (error) {
    console.log("Couldn't update wordlist");
    console.log(error);
    return res.status(500).send({status: 500, message: error});
  }
})

router.delete('/:wordlistid', auth.required, async (req, res, next) => {
  try {
    const { payload: { id, role } } = req;
    const wordListId = req.params.wordlistid;

    wl = await WordLists.findById(wordListId);

    if (wl.owner !== id && !(role === ROLES.Admin || role.Moderator))
      return res.status(401).send({status: 401, message: "User is not allowed to delete other's wordlist"});

    await WordLists.findByIdAndDelete(wordListId);
    return res.status(200).send({status: 200, message: `wordList ${wordListId} deleted`});

  } catch (error) {
    console.log("couldn't delete worlist");
    console.log(error);
    return res.statusMessage(500).send({status: 500, message: error});
  }
})

module.exports = router;