const express = require("express");
const status = require("http-status");
const spoilersRoute = require("./routes/spoilers");
const sequelize = require("./database/database");
const app = express();

app.use(express.json());

app.use("/api", spoilersRoute);

app.use((req, res, next) => {
  return res.status(status.NOT_FOUND).send();
});

app.use((error, req, res, next) => {
  return res.status(status.INTERNAL_SERVER_ERROR).json({ error });
});

//force: true somente na primeira vez que
//a api for executada
sequelize.sync({ force: false }).then(() => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log("servidor rodando em http://localhost:3000");
  });
});
