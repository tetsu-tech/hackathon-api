// ENV設定
const config = require("./configs/config")();

// アプリケーション設定
const express = require("express");
const cors = require('cors')
const app = express();

// const basicAuth = require("express-basic-auth")

// app.use(basicAuth({
//   challenge: true,
//   unauthorizedResponse: () => {
//       return "Unauthorized" // 認証失敗時に表示するメッセージ
//   },
//   authorizer: (username, password) => {
//     const userMatch = basicAuth.safeCompare(username, config.auth.basicUser)
//     const passMatch = basicAuth.safeCompare(password, config.auth.basicPassword)

//     return userMatch & passMatch
//   }
// }))

const mongoose = require("mongoose");
const databaseUrl = process.env.MONGO_DATABASE || "mongodb://localhost/myapp";
const { IssueTemplate } = require("./models/issueTemplate");

// reqest bodyをパースする
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors())

mongoose.connect(databaseUrl, { useNewUrlParser: true });

app.get("/hello", (req, res) => {
  res.send("hello")
})

app.get("/api/templates", async (req, res) => {
  try {
    const doc = await IssueTemplate.find().exec();
    res.json(doc);
  } catch (error) {
    console.log(error)
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
    console.log(error)
    next(error)
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

app.get("/api/issues", async (req, res) => {
  const GitHub = require("github-api");

  // basic auth
  const gh = new GitHub({
    username: config.github.githubUserName,
    password: config.github.githubUserPassword
  });

  const ghObj = gh.getIssues(
    config.github.githubOrganizationName,
    config.github.githubOrganizationName
  );
  try {
    const ghRes = await ghObj.listIssues({});
    res.json(ghRes.data);
  } catch (error) {
    console.log(error);
    next(error)
  }
});

app.post("/api/issues", async (req, res) => {
  const GitHub = require("github-api");
  const gh = new GitHub({
    username: config.github.githubUserName,
    password: config.github.githubUserPassword
  });

  const issueObj = gh.getIssues(
    config.github.githubOrganizationName,
    config.github.githubOrganizationName
  );
  try {
    const ghRes = await issueObj.createIssue(req.body);
    res.json(ghRes.data);
  } catch (error) {
    console.log(error);
    next(error)
  }
});

module.exports = app;