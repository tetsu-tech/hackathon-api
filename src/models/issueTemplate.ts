import mongoose from "mongoose" 

const issueItemsSchema = mongoose.Schema({
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

export const IssueTemplate = mongoose.model('IssueTemplate', issueTemplateSchema);