const md5 = require('md5');

module.exports.genererToken = function(sel){
    return md5(new Date().getTime() + sel);
}