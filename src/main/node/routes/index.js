/*
 * GET home page.
 */
var crypto = require('crypto');
var index = function (req, res) {
    res.render('index', {title: 'Express'})
};
module.exports = function (app) {
    app.get('*', index);
};
