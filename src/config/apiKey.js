require('dotenv').config();

const apiKeyMiddleware = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    console.log("Chave de API recebida:", apiKey); 
    console.log("Chave de API esperada:", process.env.API_KEY); 

    if (!process.env.API_KEY) {
        console.error("Erro: Chave de API não definida no .env");
        return res.status(500).json({ error: "Erro interno no servidor: Chave de API não configurada." });
    }

    if (!apiKey) {
        return res.status(401).json({ error: "Chave de API ausente! Sem acesso autorizado!" });
    }

    if (apiKey === process.env.API_KEY) {
        console.log("Chave de API válida. Acesso permitido.");
        next();
    } else {
        console.log("Chave de API inválida. Acesso negado.");
        res.status(401).json({ error: "Chave de API incorreta! Sem acesso autorizado!" });
    }
};

module.exports = apiKeyMiddleware;