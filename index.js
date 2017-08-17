'use strict';

//********************************************************//
// init config file - secret.json
//********************************************************//

// read / write config.json to secret.json
var Conf = require('conf');

// default schema for config
var defaultSchema = {
	"OAUTH_TOKEN": "",
	"ISSUES_REPO_URI": "",
	"GITHUB_CLIENT_ID": "",
	"GITHUB_CLIENT_SECRET": "",
	"GITHUB_CALLBACK_URL": "http://localhost:5000/callback",
	"SECRET_KEY": "SECRETS",
	"HOOK_SECRET_KEY": "~*change me*~",
	"UPLOADS_DEFAULT_DEST": "/uploads/",
	"UPLOADS_DEFAULT_URL": "http://localhost:5000/uploads/",
	"BACKUP_DEFAULT_DEST": "/backups/"
}

// define config file + settings
var config = new Conf({
	configName: "secret",
	defaults: defaultSchema,
	cwd: './'
});

//********************************************************//
// init prompt + add pre-settings
//********************************************************//

// prompting info and getting input with color fun
var prompt = require('prompt');
var colors = require('colors'); // eslint-disable-line

// changing config values for prompt
prompt.message = '>';
prompt.delimiter = ' ';

// Valid Property Settings Overview: https://www.npmjs.com/package/prompt#valid-property-settings
// define schema for prompt inputs

var schema = {
 	oAuthKey: {
		name: 			'oauthkey',
		description: 	'Please paste here your GitHub oAuthKey',
		type: 			'string',
		hidden: 		true,
		replace: 		'*',    
		required: 		true 
	},

	issueRepo: {
		name: 			'issuerepo',
		description: 	'Please paste here your GitHub issue repository (or hit ENTER for default)  👉 ',
		default: 		'webcompat/webcompat-tests/issues',
		type: 			'string'
	},

	clientId: {
		name: 			'clientid',
		description: 	'Please paste now your GitHub client ID',
		type: 			'string',
		hidden: 		true,
		replace: 		'*',
		required: 		true
	},

	clientSecret: 	{
		name: 			'clientsecret',
		description: 	'Please paste now your GitHub client secret',
		type: 			'string',
		hidden: 		true,
		replace: 		'*',
		required: 		true
	},

	step: {
		name: 			'step',
		description: 	'Please type 1, 2 or 3',
		type: 			'integer',
		message:        'Please start again and select step 1, 2 or 3!' 
	}
}





//********************************************************//
// importing all needed steps
// running prompt + creating / overwriting secret.json
//********************************************************//
var messages  	= require('./messages.js');
// var step1 		= require('./lib/step1');
// var step2 		= require('./lib/step2');
// var step3 		= require('./lib/step3');


prompt.start();

console.log(messages.text.welcome);

prompt.get(schema.step, function (err, result) {	
	switch (result.step) {
	  	case 1:
	  		console.log('\n 	Step 1 - Setting up static files + access to repository. \n'.cyan.inverse + messages.text.step1.cyan);
	    	prompt.get([schema.oAuthKey], function(err, res){
		    	if (res && res.oauthkey.length !== 40){
		    		console.log('\n Looks like something went wrong with pasting your personal access token. Wanna try again? \n'.red.inverse)
		    	} else if(res && res.oauthkey.length === 40) {
		    		config.set('OAUTH_TOKEN', res.oauthkey);
		    		console.log('\n Thank you! Your personal access token has been saved in the secret.json! \n'.green.inverse);
		    	} else {
					console.log('An error occoured. Please try again.'.red.inverse);
		    	}
		    });
	    break;

	  	case 2:
	    	console.log('\n 	Step 2 - Setting up the way of reading / sending dynamic content (bug reports, labels). \n'.magenta.inverse + messages.text.step2.magenta);
	    	
	    	prompt.get([schema.issueRepo, schema.clientId, schema.clientSecret], function(err, res){
	    		if (res){
	    			if(res.issuerepo.length > 0) {
	    				config.set('ISSUES_REPO_URI', res.issuerepo);
	    			}

		    		if(res.clientid && res.clientsecret){
		    			console.log('\n Thank you! We stored both values in your secret.json! \n'.green.inverse)
		    			config.set('GITHUB_CLIENT_ID', res.clientid);
		    			config.set('GITHUB_CLIENT_SECRET', res.clientsecret);
		    		} else {
		    			console.log('\n Your ID and / or secret are too short. Please try again. \n'.red.inverse);
		    		}
	    		} else {
	    			console.log('\n An error occoured. Please try again. \n'.red.inverse);
	    		}
	    	});
	    break;

	    case 3:
	    	console.log('\n 	Step 3 - Setting up image upload and database.'.yellow.inverse);
	    	
	    	config.set('UPLOADS_DEFAULT_DEST', process.cwd() + "/uploads/");
	    	config.set('BACKUP_DEFAULT_DEST', process.cwd() + "/backups/");
	    	config.set('UPLOADS_DEFAULT_URL', 'http://localhost:5000/uploads/');
	    	console.log(messages.text.step3.green.inverse)

	    break;

	  	default:
	    	console.log('Please start again and select step 1, 2 or 3!'.red);
	    break;
	}

});
