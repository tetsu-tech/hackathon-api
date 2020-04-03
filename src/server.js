const app = require("./app")
const config = require("./configs/config")();

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).json({err})
})

app.listen(config.app.port, () => {
  console.log(`app is running on port ${config.app.port}`);
});
