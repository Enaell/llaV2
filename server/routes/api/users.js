const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('Users');
const UserGridBlock = mongoose.model('UserGridBlocks');
const userGridBlocks = require('../../models/Default/userGridBlocks');


//POST new user route (optional, everyone has access)
router.post('/', auth.optional, (req, res, next) => {
  const { body: { user } } = req;  
  if(!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  const finalUser = new Users(user);
  finalUser.setPassword(user.password);

  finalUser.userBoard = userGridBlocks.map(gridBlock => {
    const userGridBlock = new UserGridBlock(gridBlock);
    userGridBlock.save();
    return userGridBlock;
  });

  return finalUser.save()
    .then(() => res.json({ user: finalUser.populate('userBoard').toAuthJSON() }))
    .catch((error) => {
      res.status(500).json({ error });
    });
});

//POST login route (optional, everyone has access)
router.post('/login', auth.optional, (req, res, next) => {
  const { body: { user } } = req;

  if(!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if(err) {
      return next(err);
    }

    if(passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();

      

      return Users.findOById(user._id)
      .populate('userBoard')
      .then((foundUser) => {
        return { ...(user.toAuthJSON()), userBoard: foundUser.userBoard}
      })
      .then(finalUser => res.json({user: finalUser}));


      // console.log('=========================');
      // console.log(finalUser);

      // user.userBoard = finalUser.userBoard;

      // console.log(user)

      // return res.json({ user: user.toAuthJSON() });
    }

    return status(400).info;
  })(req, res, next);
});

router.get('/logout', function(req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});


//GET user by id route (required, only authenticated users have access)
router.get('/users/:id', auth.required, (req, res, next) => {
  const userId = req.params.id;

  return Users.findById(userId)
    .then((user) => {
      if (!user) {
        return res.sendStatus(400); 
      }
      return res.json({ user: user.toAuthJSON()})
    });
});

//GET current route (required, only authenticated users have access)
router.get('/current', auth.required, (req, res, next) => {
  const { payload: { id } } = req;

  return Users.findById(id)
    .then((user) => {
      if(!user) {
        return res.sendStatus(400);
      }

      return res.json({ user: user.toAuthJSON() });
    });
});

module.exports = router;