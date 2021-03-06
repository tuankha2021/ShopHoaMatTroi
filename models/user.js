'use strict';
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// create user schema
var userSchema = mongoose.Schema(
    {
        fullname: { type: String,require: true },
        email: { type: String, require: true },
        password: { type : String},
        role: { type: String, default: '' },
        company: {
            name: { type: String, default: '' } ,
            image: { type: String, default: '' },
        },
        passwordResetToken: { type: String, default:'' },
        passwordResetExpires: { type: Date, default: Date.now },
        facebook: {type: String, default: ''},
        tokens: Array
    }
);

userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}
module.exports = mongoose.model('User', userSchema);