'use strict';

// Schema settings for prompts
// Valid Property Settings Overview: https://www.npmjs.com/package/prompt#valid-property-settings

module.exports.settings = {
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