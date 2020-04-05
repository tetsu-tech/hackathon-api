export default class IssueTemplateService {
  issueTemplate: any;
  
  constructor(issueTemplate) {
    this.issueTemplate = issueTemplate
  }

  async getIssueTemplates() {
    const doc = await this.issueTemplate.find().exec();

    return doc
  }

  async getIssueTemplateById(template_id) {
    const doc = await this.issueTemplate.find({ _id: template_id }).exec();

    return doc
  }

  async createIssueTemplate(body) {
    const issue_template = new this.issueTemplate()
    issue_template.title = body.title
    issue_template.issue_items = body.issue_items
    const doc = await issue_template.save()

    return doc
  }

  async deleteIssueTemplateById(template_id) {
    const doc = await this.issueTemplate.deleteOne({ _id: template_id });

    return doc
  }
}