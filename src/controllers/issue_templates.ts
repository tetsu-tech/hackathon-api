export default class IssueTemplateController {
  issueTemplateService: any;

  constructor(issueTemplateService) {
    this.issueTemplateService = issueTemplateService
  }

  async index(req, res, next) {
    try {
      const result = await this.issueTemplateService.getIssueTemplates()
      res.json(result);
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  async show(req, res, next) {
    try {
      const result = await this.issueTemplateService.getIssueTemplateById(req.params.template_id, next)  
      res.json(result);
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      const result = await this.issueTemplateService.createIssueTemplate(req.body)
      res.json(result);
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const result = await this.issueTemplateService.deleteIssueTemplateById(req.params.template_id)
      res.json(result);  
    } catch (error) {
      next(error)
    }
  }
}