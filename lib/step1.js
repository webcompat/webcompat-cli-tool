'use strict'

// GH API for oAuth token (+ repo key later)
var GitHubApi = require('github');
 
var gh = new GitHubApi({
    // optional 
    debug: true,
    protocol: "https",
    host: "api.github.com", // should be api.github.com for GitHub 
    pathPrefix: "/api/v3", // for some GHEs; none for GitHub 
    headers: {
        "user-agent": "webcompat-cli-tool" // GitHub is happy with a unique user agent 
    },
    Promise: require('bluebird'),
    followRedirects: false, // default: true; there's currently an issue with non-get redirects, so allow ability to disable follow-redirects 
    timeout: 5000
});

module.exports.generateOAuthKey = function(usr, pwd){
	
	gh.authenticate({
	    type: "basic",
	    username: usr,
	    password: pwd
	});

	gh.users.getKeys({}, function(err, res) {
    // console.log(JSON.stringify(res));
});
	return 'key111' + usr;
}