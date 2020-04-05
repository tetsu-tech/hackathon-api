const serviceLocator = require("../lib/service-locator")
const config = require("../configs/config")
const issueTemplateController = require("../controllers/issue_templates")

serviceLocator.register('mongoose', () => {
  return require('mongoose');
});

serviceLocator.register("issueTemplate", () => {
  const { IssueTemplate } = require("../models/issueTemplate");
  return IssueTemplate
})

serviceLocator.register("issueTemplateService", () => {
  const IssueTemplateService = require("../services/issue_template")
  const IssueTemplate = serviceLocator.get("issueTemplate")
  return new IssueTemplateService(IssueTemplate)
})

serviceLocator.register("issueTemplateController", () => {
  const issueTemplateService = serviceLocator.get("issueTemplateService")
  return new issueTemplateController(issueTemplateService)
})

module.exports = serviceLocator;