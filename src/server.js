const app = require("./app")
const config = require("./configs/config")();

app.listen(config.app.port, () => {
  console.log(`app is running on port ${config.app.port}`);
});
