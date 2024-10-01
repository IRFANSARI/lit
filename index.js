const handleGitHubRepoCloning = require('./controllers/githubRepoCloning.js');
const args = process.argv.slice(2);

if (args[0] == 'clone') {
  handleGitHubRepoCloning(args[1]);
} else {
  console.log('LOL');
}
