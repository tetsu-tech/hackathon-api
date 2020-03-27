const express = require("express");
const app = express();

const mongoose = require("mongoose");
const databaseUrl = process.env.MONGO_DATABASE || "mongodb://localhost/myapp";
const { IssueTemplate } = require("./models/issueTemplate");

// reqest bodyをパースする
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(databaseUrl, { useNewUrlParser: true });

app.get("/api/templates", async (req, res) => {
  const doc = await IssueTemplate.find().exec();
  res.json(doc);
});

app.post("/api/templates", async (req, res) => {
  const issute_template = new IssueTemplate();
  issute_template.title = req.body.title;
  issute_template.issue_items = req.body.issue_items;
  const doc = await issute_template.save();
  res.json(doc);
});

app.get("/api/templates/:template_id", async (req, res) => {
  const templateId = req.params.template_id;
  const doc = await IssueTemplate.find({ _id: templateId }).exec();
  res.json(doc);
});

app.get("/api/issues", async (req, res) => {
  const GitHub = require("github-api");

  // basic auth
  const gh = new GitHub({
    username: "tetsu-tech-user",
    password: "tetsu55555"
  });

  const gh_obj = gh.getIssues("tetsu-tech", "hackathon-api");
  try {
    const gh_res = await gh_obj.listIssues({});
    res.json(gh_res.data);
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/issues", async (req, res) => {
  const GitHub = require("github-api");
  const gh = new GitHub({
    username: "<user name>",
    password: "<password>"
  });

  const issue_obj = gh.getIssues("tetsu-tech", "hackathon-api");

  try {
    const gh_res = await issue_obj.createIssue(req.body)
    res.json(gh_res.data)
  } catch (error) {
    console.log(error);
    res.status(error.response.status).json(error.response.statusText)
  }
})

app.listen(8080, () => {
  console.log(`app is running on port 8080`);
});
