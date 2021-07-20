// Authentication middleware

const { SECRET, COOKIE_NAME } = require('../config/config');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    let token = req.cookies[COOKIE_NAME];

    if (token) {

        jwt.verify(token, SECRET, function(err, decoded) {
            if (err) {
                res.clearCookie(COOKIE_NAME); // delete if unverified token
            } else {
                req.user = decoded; 
                res.locals.user = decoded; // adds access to all of the info
                res.locals.isAuth = true; // used by handlebars to see if user is logged in
            }
        });
    }

    next();
}

module.exports = auth;