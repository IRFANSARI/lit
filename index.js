const handleGitHubRepoCloning = require('./controllers/githubRepoCloning.js');
const args = process.argv.slice(2);

if (args[0] == 'clone') {
  const repoURL = args[1];
  handleGitHubRepoCloning(repoURL);
} else {
  console.log('LOL');
}
