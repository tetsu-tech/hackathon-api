const config = require("../configs/config")()

class IssueController {
  constructor(){}

  async index(req, res, next) {
    const GitHub = require("github-api");
  
    // basic auth
    const gh = new GitHub({
      username: config.github.githubUserName,
      password: config.github.githubUserPassword
    });
    
    const ghObj = gh.getIssues(
      config.github.githubOrganizationName,
      config.github.githubRepositoryName
    );
    
    try {  
      const ghRes = await ghObj.listIssues({});
      res.json(ghRes.data);
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    const GitHub = require("github-api");

    const gh = new GitHub({
      username: config.github.githubUserName,
      password: config.github.githubUserPassword
    });
  
    const issueObj = gh.getIssues(
      config.github.githubOrganizationName,
      config.github.githubRepositoryName
    );
    try {
      const ghRes = await issueObj.createIssue(req.body);
      res.json(ghRes.data);
    } catch (error) {
      next(error)
    }
  }
}

module.exports = IssueController