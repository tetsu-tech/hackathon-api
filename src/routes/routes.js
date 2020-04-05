const config = require("../configs/config")();

module.exports.register = (app, serviceLocator) => {

  app.get("/hello", (req, res) => {
    res.send("hello")
  })

  app.get("/api/templates", async (req, res, next) => {
    serviceLocator.get('issueTemplateController').list(req, res, next)
  });

  app.get("/api/templates/:template_id", async (req, res, next) => {
    serviceLocator.get('issueTemplateController').show(req, res, next)
  });
  
  app.post("/api/templates", async (req, res, next) => {
    serviceLocator.get('issueTemplateController').create(req, res, next)
  });
  
  app.delete("/api/templates/:template_id", async (req, res, next) => {
    serviceLocator.get('issueTemplateController').delete(req, res, next)
  })
  
  app.get("/api/issues", async (req, res, next) => {
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
  });
  
  app.post("/api/issues", async (req, res, next) => {
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
  });
};