require ("dotenv").config();
const express = require("express");
const cors = require("cors");
const bairroRoutes = require("./src/routes/bairroRoutes");
const ocorrenciaRoutes = require("./src/routes/ocorrenciaRoutes");
const reportRoutes = require("./src/routes/reportRoutes");
const path = require("path");



const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/bairros", bairroRoutes);
app.use("/api/ocorrencias", ocorrenciaRoutes);
app.use("/api/reports", reportRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(` 💻Servidor rodando na porta ${PORT}`);
});