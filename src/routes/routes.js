const { IssueTemplate } = require("../models/issueTemplate");
const config = require("../configs/config")();

module.exports.register = (app) => {

  app.get("/hello", (req, res) => {
    res.send("hello")
  })

  app.get("/api/templates", async (req, res) => {
    try {
      const doc = await IssueTemplate.find().exec();
      res.json(doc);
    } catch (error) {
      res.json("validation failed")
    }
  });
  
  app.post("/api/templates", async (req, res, next) => {
    const issute_template = new IssueTemplate();
    try {
      issute_template.title = req.body.title;
      issute_template.issue_items = req.body.issue_items;
      const doc = await issute_template.save();
      res.json(doc);
    } catch (error) {
      next(error.data.messege)
    }
  });
  
  app.get("/api/templates/:template_id", async (req, res) => {
    const templateId = req.params.template_id;
    const doc = await IssueTemplate.find({ _id: templateId }).exec();
    res.json(doc);
  });
  
  app.delete("/api/templates/:template_id", async (req, res) => {
    const templateId = req.params.template_id;
    const doc = await IssueTemplate.deleteOne({ _id: templateId });
    res.json(doc);
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