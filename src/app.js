const express = require("express");
const spoilersRoute = require("./routes/spoilers");
const sequelize = require("./database/database");
const app = express();

app.use(express.json());

app.use("/api", spoilersRoute);

app.use((req, res, next) => {
  return res.status(404).send();
});

app.use((error, req, res, next) => {
  return res.status(500).json({ error });
});

//force: true somente na primeira vez que
//a api for executada
sequelize.sync({ force: false }).then(() => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log("servidor rodando em http://localhost:3000");
  });
});
