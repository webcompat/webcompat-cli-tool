'use strict'

// GH API for oAuth token (+ repo key later)
var gh = require('github');

module.exports.generateOAuthKey = function(usr, pwd){
	return 'key111' + usr + pwd;
}