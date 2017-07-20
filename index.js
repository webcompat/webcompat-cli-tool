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

var schema = {
 	oAuthKey: {
		name: 			'oauthkey',
		description: 	'Please paste here your Github oAuthKey',
		type: 			'string',
		required: 		true 
	},

	step: {
		name: 			'step',
		description: 	'Please type 1, 2 or 3',
		type: 			'integer'
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
	*    Step 2 - Setting up way of reading / sending dynamic content (bug reports, labels)        *
	*    Step 3 - Setting up image upload and database                                             *
	*                                                                                              *
	************************************************************************************************
	
	
	> With which setup step can I help you with?
	
	`,
	step1 : `  
	Please generate your personal access token. If you are not sure how its done, 
	here is a handy explanation: https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/. 
	After you've done that, please come back and paste it here. So I can save it for you and finish your first step of the setup.\n`,
	step2 : `
	Please add your test repository for the filed bugs. If you are part of the webcompat project, you can also use the repository there.\n`,
	step3 : `
	We need to add your credentials and where to upload the images. Do you want to add something specific or just go with the default?\n`
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
	    	if(res && res.oauthkey.length != 40){
	    		console.log('Looks like something went wrong with pasting your personal access token. Wanna try again?'.red)
	    	} else if(res && res.oauthkey.length == 40) {
	    		config.set('OAUTH_TOKEN', res);
	    		console.log('Thank you! Your personal access token has been saved in the secret.json!'.yellow);
	    	} else {
				console.log('An error occoured. Please try again.');
	    	}
	    });
	    break;

	  	case 2:
	    	console.log('\n 	Step 2 - Setting up way of reading / sending dynamic content (bug reports, labels). \n'.magenta.inverse + messages.step2.magenta);
	    break;

	    case 3:
	    	console.log('\n 	Step 3 - Setting up image upload and database. \n'.yellow.inverse + messages.step3.yellow);
	    break;

	  	default:
	    	console.log('Please select step one, two or three!');
	    break;
	}

});
