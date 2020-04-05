// ENV設定
import config from "./configs/config"

// アプリケーション設定
import express from "express"
const app = express();
import routes from "./routes/routes"
import serviceLocator from "./configs/di"
import mongoose from "mongoose"

// reqest bodyをパースする
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import cors from "cors"
app.use(cors())

const databaseUrl = process.env.MONGO_DATABASE || "mongodb://localhost/myapp";
mongoose.connect(databaseUrl, { useNewUrlParser: true });


routes.register(app, serviceLocator);

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).json({err: err.stack || err})
})

app.listen(config().app.port, () => {
  console.log(`app is running on port ${config().app.port}`);
});
