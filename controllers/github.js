var github = require('octonode');
var request = require('request');

var Ghub = function () {
    this.username = null;
    this.password = null;
    this.repo = null;

    this.startGithub = function (username, password) {
        _setCredentials(username, password);
    }

    function _setCredentials(username, password) {
        this.username = username;
        this.password = password;
    }

    function _createClient() {
        return github.client({
            username: this.username,
            password: this.password
        });
    }

    this.createRepo = function (name, desc) {
        var client = _createClient(this.username, this.password);
        client.post("/user/repos", {
            "name": name,
            "description": desc
        },
        function (error, status, body, headers) {
            console.log(status);
            if(status == 201) {
                this.repo = name;
                // Add files and collaborators
                addCollaborator('ColinLMacLeod1')
                addFile('Test', 'index.js', 'Some text');
            }
        });
    }

    function addCollaborator(collaborator) {
        // TO DO
//        request.post('https://api.github.com/repos/' + this.username + '/' + this.repo + '/collaborators/' + collaborator, function(error, response, body) {
//            console.log(response);
//            if(!error) {
//                console.log('Add Collaborator:' + response.statusCode)
//            }
//        });
    }

    function addFile(repoName, filename, content) {
        var client = _createClient(this.username, this.password);
        var ghrepo = client.repo(this.username + '/' + repoName);
        console.log(ghrepo);
        ghrepo.createContents(filename, 'Add ' + filename + ' template.', content, function(error, status, body, headers) {
            console.log(body + '\n' + status);
            
        });
    }
}

module.exports = new Ghub();