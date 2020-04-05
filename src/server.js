// ENV設定
const config = require("./configs/config")();

// アプリケーション設定
const express = require("express");
const app = express();
const routes = require("./routes/routes")

const mongoose = require("mongoose");
const databaseUrl = process.env.MONGO_DATABASE || "mongodb://localhost/myapp";

// reqest bodyをパースする
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require('cors')
app.use(cors())

mongoose.connect(databaseUrl, { useNewUrlParser: true });

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

routes.register(app);

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).json({err: err.stack || err})
})

app.listen(config.app.port, () => {
  console.log(`app is running on port ${config.app.port}`);
});
