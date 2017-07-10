'use strict';

//********************************************************//
// init config file - secret.json
//********************************************************//

// read / write config.json to secret.json
const Conf = require('conf');

// default schema for config
const defaultSchema = {
	"OAUTH_TOKEN": "",
	"ISSUES_REPO_URI": "",
	"GITHUB_CLIENT_ID": "",
	"GITHUB_CLIENT_SECRET": "",
	"GITHUB_CALLBACK_URL": "http://localhost:5000/callback",
	"SECRET_KEY": "~*change me*~",
	"HOOK_SECRET_KEY": "~*change me*~",
	"UPLOADS_DEFAULT_DEST": "",
	"UPLOADS_DEFAULT_URL": "",
	"BACKUP_DEFAULT_DEST": "./backups/"
}

// define config file + settings
const config = new Conf({
	configName: "secret",
	defaults: defaultSchema,
	cwd: './'
});

//********************************************************//
// init prompt + add pre-settings
//********************************************************//

// prompting info and getting input with color fun
var prompt = require('prompt');
var colors = require('colors');

// changing config values for prompt
prompt.message = '>';
prompt.delimiter = ' ';

// Valid Property Settings Overview: https://www.npmjs.com/package/prompt#valid-property-settings
// define schema for prompt inputs
var username = {
	name: 			'username',
	description: 	'Please enter your GitHub username',
	type: 			'string',
	required: 		true 
}

var password = {
	name: 			'password',
 	description: 	'Please enter your GitHub password', 
    type: 			'string', 
    hidden: 		true,
    replace: 		'*',
    required: 		true        
}

var num = {
	name: 'num',
	description: 'Step 1, 2 or 3'
}


//********************************************************//
// importing all needed steps
// running prompt + creating / overwriting secret.json
//********************************************************//
var step1 = require('./lib/step1');
var step2 = require('./lib/step2');
var step3 = require('./lib/step3');


prompt.start();

prompt.get([num], function (err, result) {	
	console.log(result)

	switch (result.num) {
	  	case '1':
	  		console.log('Step 1');
	    	prompt.get([username, password], function(err, res){
	    	var key = step1.generateOAuthKey(result.username, result.password);
	    	config.set('OAUTH_TOKEN', key);
			console.log('Your generated oAuth key is: ', key.white)
	    });
	    break;

	  	case '2':
	    	console.log('Step 2');
	    break;

	    case '3':
	    	console.log('Step 3');
	    break;

	  	default:
	    	console.log('Please select step one, two or three!');
	    break;
	}

});
