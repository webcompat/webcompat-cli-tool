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
	"SECRET_KEY": "SECRETS",
	"HOOK_SECRET_KEY": "~*change me*~",
	"UPLOADS_DEFAULT_DEST": "/uploads/",
	"UPLOADS_DEFAULT_URL": "http://localhost:5000/uploads/",
	"BACKUP_DEFAULT_DEST": "/backups/"
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

var messages = {
	welcome : `	************************************************************************************************
	*                                                                                              *
	*                                                                   ,,,,,,         ,,,,,       *
	*                                                                  ,,,,,,         ,,,,,        *
	*                                                                ,????,,+++ +++++,,???,,       *
	*                                                                ,????+++++ +++++++???,,       *
	*                                                                ,,,+++++++ +++++++++,,,       *
	*                                                                +++++++,,, ,,,+++++++++       *
	*                                                                +++,,,,,,, ,,,,,+++++++       *
	*                                                                +,,,,,,,,, ,,,,,,,,,+++       *
	*                                                                +,,,,,,,,, ,,,,,,,,,+++       *
	*                                                                +,,    ,,, ,,,    ,,+++       *          
	*             Welcome to the WEBCOMPAT.COM                       +,,    ,,, ,,,    ,,+++       *
	*                   project setup.                               +,,,,,,,,   ,,,,,,+++         *
	*                                                                 ++,,,,,,, ,,,,,++++          *
	*                                                                   +++++++ +++++++++          *
	*              I'm your friendly wompat!                              ,,+++ +++++,,,,          *
	*                                                                     ,,+++ +++++,,,,          *
	*                                                                   ,,,,+++ +????,,,,,         *
	*                                                                   ,,,,+++ ?????,,,,,         *
	*                                                                     ,,,,, ???,,,,,,          *
	*                                                                       ,,, ,,,,,,,            *
	*                                                                       ,,,    ,,,,            *
	*                                                                                              *
	************************************************************************************************
	*  Thank you for your help! Let´s set up webcompat.com in a local enviroment.                  *
	*                                                                                              *
	*  We have three different setps to setup the project. You do not need to finish all 3 steps,  *
	*  but you'd need to stay in order. So, please complete e.g. step 1 before step 2.             *
	*  Otherwise the project will not start and exit with errors.                                  *
	*                                                                                              *
	************************************************************************************************
	*                                                                                              *
	*    Step 1 - Setting up static files + access to repository                                   *
	*    Step 2 - Setting up the way of reading / sending dynamic content (bug reports, labels)    *
	*    Step 3 - Setting up image upload and database                                             *
	*                                                                                              *
	************************************************************************************************
	
	
	> With which setup step can I help you with?
	
	`,
	step1 : `  
	For the first step, we need a personal access token or also called oAuth token. 

	You need to generate this token and paste it here, so it will be saved in your secret.json. If you are not sure how its done, 
	here is a handy explanation: 

	👉  https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/ 👈. 

	🌈  Please come back after you have generated them and paste them in the prompt. 🌈


	\n`,
	
	step2 : `
	For the next step, we need 3 values.
	The first value is the URL to the repository, where the app can find the filed issues. 
	If you don't have a repo by yourself or are not sure what this means, just hit enter and use the default.

	The second and third values are your application tokens. How to get them? 
	Open the link below in the browser of your choice and fill out the form.
	👉  https://github.com/settings/applications/new 👈. 

	The homepage URL is http://localhost:5000/.
	The Authorization callback URL http://localhost:5000/callback.

	🌈  Please come back after you have generated them and paste them in the prompt. 🌈


	\n`,
	
	step3 : `
	We just added the paths to your backup as well as image upload automatically. You are done!\n`
}


//********************************************************//
// importing all needed steps
// running prompt + creating / overwriting secret.json
//********************************************************//
var step1 = require('./lib/step1');
var step2 = require('./lib/step2');
var step3 = require('./lib/step3');


prompt.start();

console.log(messages.welcome);

prompt.get(schema.step, function (err, result) {	
	switch (result.step) {
	  	case 1:
	  		console.log('\n 	Step 1 - Setting up static files + access to repository. \n'.cyan.inverse + messages.step1.cyan);
	    	prompt.get([schema.oAuthKey], function(err, res){
		    	if (res && res.oauthkey.length != 40){
		    		console.log('\n Looks like something went wrong with pasting your personal access token. Wanna try again? \n'.red.inverse)
		    	} else if(res && res.oauthkey.length == 40) {
		    		config.set('OAUTH_TOKEN', res.oauthkey);
		    		console.log('\n Thank you! Your personal access token has been saved in the secret.json! \n'.green.inverse);
		    	} else {
					console.log('An error occoured. Please try again.'.red.inverse);
		    	}
		    });
	    break;

	  	case 2:
	    	console.log('\n 	Step 2 - Setting up the way of reading / sending dynamic content (bug reports, labels). \n'.magenta.inverse + messages.step2.magenta);
	    	
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
	    	
	    	config.set('UPLOADS_DEFAULT_DEST', process.cwd() + "/uploads/"); // @todo check, if path still works as NPM PKG
	    	config.set('BACKUP_DEFAULT_DEST', process.cwd() + "/backups/"); // @todo check, if path still works as NPM PKG
	    	config.set('UPLOADS_DEFAULT_URL', 'http://localhost:5000/uploads/');
	    	console.log(messages.step3.green.inverse)

	    break;

	  	default:
	    	console.log('Please start again and select step 1, 2 or 3!'.red);
	    break;
	}

});
