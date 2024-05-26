const express = require("express");
const cors = require("cors");
const produtos = require("./produtos.json");
const path = require("path");

const app = express();

const PORT = 8080;

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.get("/produtos", (req, res) => {
  res.json(produtos);
});

app.listen(PORT, () => {
  console.log(`Servidor em execução em http://localhost:${PORT}`);
});
