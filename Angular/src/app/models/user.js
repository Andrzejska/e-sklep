var mongoose = require('mongoose')
var Schema = mongoose.Schema;

const userSchema = new Schema({
  password: String,
  email: String,
  phoneNumber: String,
  deliveryAddress: String,
  name: String,
  surname: String,
  role: String
}, {
  collection: 'users'
})
const User = mongoose.model('User', userSchema);
module.exports = User;
