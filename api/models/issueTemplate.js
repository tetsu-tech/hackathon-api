const mongoose = require('mongoose');

// id: falseを定義することでsub collectionには_idを生成しない
var issueItemsSchema = mongoose.Schema({
  order: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    requred: true,
  },
  description: {
    type: String,
    required: true,
  }
});

const issueTemplateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  issue_items: {
    type: [issueItemsSchema],
    required: true,
  }
});

const IssueTemplate = mongoose.model('IssueTemplate', issueTemplateSchema);

module.exports = { IssueTemplate };
