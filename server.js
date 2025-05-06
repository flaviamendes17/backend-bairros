require ("dotenv").config();
const express = require("express");
const cors = require("cors");
const bairroRoutes = require("./src/routes/bairroRoutes");
const ocorrenciaRoutes = require("./src/routes/ocorrenciaRoutes");



const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/bairros", bairroRoutes);
app.use("/api/ocorrencias", ocorrenciaRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(` 💻Servidor rodando na porta ${PORT}`);
});