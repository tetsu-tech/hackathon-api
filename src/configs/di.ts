// const serviceLocator = require("../lib/service-locator")
import serviceLocator from "../lib/service-locator"
import issueTemplateController from "../controllers/issue_templates"
import issueController from "../controllers/issues"
import IssueTemplateService from "../services/issue_template"
import mongoose from "mongoose"
import { IssueTemplate } from "../models/issueTemplate"

serviceLocator.register('mongoose', () => {
  return mongoose
});

serviceLocator.register("issueTemplate", () => {
  return IssueTemplate
})

serviceLocator.register("issueTemplateService", () => {
  const IssueTemplate = serviceLocator.get("issueTemplate")
  return new IssueTemplateService(IssueTemplate)
})

serviceLocator.register("issueTemplateController", () => {
  const issueTemplateService = serviceLocator.get("issueTemplateService")
  return new issueTemplateController(issueTemplateService)
})

serviceLocator.register("issueController", () => {
  return new issueController()
})

export default serviceLocator;