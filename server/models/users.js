const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { ROLES, LANGUAGES } = require('./utils');
const { Schema } = mongoose;

const UsersSchema = new Schema({
  username: String,
  email: {type: String, required: true} ,
  role: {type: String, default: ROLES.Customer},
  language: {type: String, default: LANGUAGES.Fr},
  learningLanguage: {type: String, default: LANGUAGES.Fr},
  userBoard: [{ type: Schema.Types.ObjectId, ref: 'UserGridBlocks' }],
  hash: String,
  salt: String,
});

UsersSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UsersSchema.methods.validatePassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

UsersSchema.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign({
    id: this._id,
    email: this.email,
    role: this.role,
    language: this.language,
    learningLanguage: this.learningLanguage,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, 'secret');
}

UsersSchema.methods.toAuthJSON = function() {
  return {
    name: this.name,
    role: this.role,
    language: this.language,
    learningLanguage: this.learningLanguage,
    userBoard: this.userBoard,
    token: this.generateJWT(),
  };
};

mongoose.model('Users', UsersSchema);