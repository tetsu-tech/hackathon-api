// ENV設定
const basicUser = process.env.BASIC_USER
const basicPassword = process.env.BASIC_PASSWORD
const githubUserName = process.env.GITHUB_USER_NAME
const githubUserPassword = process.env.GITHUB_USER_PASSWORD
const githubOrganizationName = process.env.GITHUB_ORGANIZATION_NAME
const githubRepositoryName = process.env.GITHUB_REPOSITORY_NAME

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
//     const userMatch = basicAuth.safeCompare(username, basicUser)
//     const passMatch = basicAuth.safeCompare(password, basicPassword)

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
  res.json("/api/templates")
  // try {
  //   const doc = await IssueTemplate.find().exec();
  //   res.json(doc);
  // } catch (error) {
  //   console.log(error)
  //   res.json("validation failed")
  // }
});

app.post("/api/templates", async (req, res) => {
  const issute_template = new IssueTemplate();
  try {
    issute_template.title = req.body.title;
    issute_template.issue_items = req.body.issue_items;
    const doc = await issute_template.save();
    res.json(doc);
  } catch (error) {
    console.log(error)
    res.json("validation failed")
  }
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
    username: githubUserName,
    password: githubUserPassword
  });

  const ghObj = gh.getIssues(
    githubOrganizationName,
    githubRepositoryName
  );
  try {
    const ghRes = await ghObj.listIssues({});
    res.json(ghRes.data);
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/issues", async (req, res) => {
  const GitHub = require("github-api");
  const gh = new GitHub({
    username: githubUserName,
    password: githubUserPassword
  });

  const issueObj = gh.getIssues(
    githubOrganizationName,
    githubRepositoryName
  );
  try {
    const ghRes = await issueObj.createIssue(req.body);
    res.json(ghRes.data);
  } catch (error) {
    console.log(error);
    res.status(error.response.status).json(error.response.statusText);
  }
});

app.listen(8080, () => {
  console.log(`app is running on port 8080`);
});
