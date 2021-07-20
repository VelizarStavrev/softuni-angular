const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config/config');

const register = (email, password, name, phone) => {
    let user = new User({ email, password, name, phone });

    return user.save();
};

const login = async (email, password) => {

    let user = await User.findOne({email});
    if (!user) return Promise.reject({ message: 'No such user!', status: 404 });

    let areEqual = await bcrypt.compare(password, user.password);
    if (!areEqual) return Promise.reject({ message: 'Invalid password', status: 404 });
    
    let token = jwt.sign({_id: user._id, email: user.email}, SECRET);
    return [token, user._id];
};

const getOneUser = (id) => {
    return User
        .findById(id)
        .then(user => {
            return user;
        });
}

module.exports = {
    register,
    login,
    getOneUser
}