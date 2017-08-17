module.exports.text = {
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