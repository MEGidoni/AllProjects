const indexR = require("./index");
const DataR = require("./data");

exports.routesInit = (app) => {
  app.use("/",indexR);
  app.use("/data",DataR);
}
