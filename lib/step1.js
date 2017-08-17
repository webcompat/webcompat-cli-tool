'use strict'

// This function is not used at the moment, but should get github credentials like username + password
// and generate a personal token from github (please use the following package: https://www.npmjs.com/package/github)
// It returns the token, so it can be saved.

// Main function in the index needs to be changed from one param to two and include some options, like replacing
// the password with * or similar. This can be added in the schema above the main function.

module.exports.generateOAuthKey = function(usr, pwd){

	// So it would go something like
	// var token = github.generateToken(usr, pwd);

	var token = usr + pwd; // just to keep the linter happy

	return token;
}