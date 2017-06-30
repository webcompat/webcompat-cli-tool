const secretValues = require('./secret.json');
const defaultValues = require('./config.json');
var oauth = require('github-oauth-prompt');
const Conf = require('conf');

const config = new Conf({
	configName: "secret",
	defaults: defaultValues,
	cwd: './'
});

oauth({
    name: 'the-life-aquatic',
    prompt: {
        username: 'Enter username:',
        password: 'Enter password:'
    },
    scopes: ['repo', 'gist']
}, function (err, token) {
        console.log(token);
    });

/*
console.log(config.path)
console.log(config.size)
console.log(config.store)

console.log(secretValues.OAUTH_TOKEN.length < 1)
console.log(config.has('GITHUB_CLIENT_ID'))

console.log(username)

oa.getToken(function(err, token){
  console.log(err, token)
});
*/
