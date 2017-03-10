/*
 * GET home page.
 */
var crypto = require('crypto');
var index = function (req, res) {
    res.render('index', {title: 'Express'})
};
var login = function (req, res) {
    res.render('login', {title: '登录页'})
};
module.exports = function (app) {
    //app.get('/', index);
    //app.get('/login', login);
    app.get('*', index);
};
