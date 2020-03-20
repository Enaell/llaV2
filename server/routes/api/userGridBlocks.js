const mongoose = require('mongoose');
const router = require('express').Router();
const auth = require('../auth');
const formatter = require('../utils');
const UserGridBlocks = mongoose.model('UserGridBlocks');
const Users = mongoose.model('Users');


router.put('/', auth.required, async (req, res, next) => {
    const { payload, body } = req;

    const userGridBlocks = formatter.formatGrid(body);

    const user = await Users.findById(payload.id);

    UserGridBlocks.deleteMany(
        {
          _id: { $in: user.toObject({ virtuals: true }).userBoard }
        },
        async function(err, result) {
          if (err) {
            res.send(err);
          } else {
            try {
                user.userBoard = userGridBlocks.map(gridBlock => {
                    const userGridBlock = new UserGridBlocks(gridBlock);
                    userGridBlock.save();
                    return userGridBlock;
                });
                
                await user.save();
                const foundUser = user.populate('userBoard');
                const frontUser = await {...(user.toAuthJSON()), userBoard: formatter.formatUserBoard(foundUser.userBoard, 'name')};
                res.json({ user: frontUser });
            }
            catch( error ) {
                console.log(error);
                res.status(500).json({ error });
            }
          }
        }
      );
});

module.exports = router;