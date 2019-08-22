const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String
  },
  register_date: {
    type: Date,
    default: Date.now
  }
});

UserSchema.methods.validatePassword = function(password, user) {
    const isMatch = bcrypt.compare(password, user.password);   
    return isMatch;
};

UserSchema.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      id: this.id,
      name: this.name,
      email: this.email
      }, process.env.JWT_SECRET_KEY);
}

UserSchema.methods.toAuthJSON = function() {
  return {
    _id: this._id,
    name: this.name,
    email: this.email,
    token: this.generateJWT(),
  };
};

module.exports = User = mongoose.model('user', UserSchema);
