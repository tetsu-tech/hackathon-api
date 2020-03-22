const express = require('express');
const app = express();
const mongoose = require('mongoose');
const databaseUrl = process.env.MONGO_DATABASE || "mongodb://localhost/myapp"

// reqest bodyをパースする
app.use(express.json())

mongoose.connect(databaseUrl, { useNewUrlParser: true });

const dummy_issue_item = {
  order: 1,
  name: "hogehoge",
  description: "aaaaaaaaaaa"
}

const dummy_issue_item2 = {
  order: 1,
  name: "hogehoge",
  description: "aaaaaaaaaaa"
}

const dummy_templates = [
  {
    _id: "dummy1",
    title: "",
    issue_items: [dummy_issue_item]
  },
  {
    _id: "dummy2",
    title: "",
    issue_items: [dummy_issue_item, dummy_issue_item2]
  }
]

const new_dummy_template = {
  _id: "dummy_added",
  title: "ああああああああああ",
  issue_items: [dummy_issue_item, dummy_issue_item2]
}

app.get('/api/templates', (req, res) => {
  res.json(dummy_templates);
})

app.post('/api/templates', (req, res) => {
  dummy_templates.push(new_dummy_template)
  res.json(new_dummy_template);
})

app.get('/api/templates/:template_id', (req, res) => {
  const templateId = req.params.template_id;
  res.json(dummy_templates[0]);
})

app.get('/api/issues', (req, res) => {
  res.json("Githubにissue作る");
})

app.listen(8080, () => {
  console.log(`app is running on port 8080`);
});
