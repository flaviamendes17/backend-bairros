const bairroModel = require("../models/bairroModel");

const getAllBairros = async (req, res) => {
    try {
        const { nome } = req.query;
        let bairros;

        if (nome) {
            console.log(`Filtrando bairros pelo nome: ${nome}`);
            bairros = await bairroModel.getBairrosByName(nome); 
        } else {
            console.log("Buscando todos os bairros...");
            bairros = await bairroModel.getBairros(); 
        }

        res.status(200).json(bairros);
    } catch (error) {
        console.error("Erro ao buscar os bairros:", error);
        res.status(500).json({ message: "Erro ao buscar os bairros" });
    }
};

const getBairros = async (req, res) => {
    try {
        const { nome } = req.query;
        let bairros;

        if (nome) {
            console.log(`Filtrando bairros pelo nome: ${nome}`);
            bairros = await bairroModel.getBairrosByName(nome); 
        } else {
            console.log("Buscando todos os bairros...");
            bairros = await bairroModel.getBairros(); 
        }

        res.status(200).json(bairros);
    } catch (error) {
        console.error("Erro ao buscar os bairros:", error);
        res.status(500).json({ message: "Erro ao buscar os bairros" });
    }
};

const createBairro = async (req, res) => {
    try {
        const { nome, cidade, estado } = req.body;
        const photo = req.file ? req.file.filename : null; 

        console.log("Dados recebidos:", { nome, cidade, estado, photo });

        const newBairro = await bairroModel.createBairro({ nome, cidade, estado, photo });
        res.status(201).json(newBairro);
    } catch (error) {
        console.error("Erro ao criar o bairro:", error);
        res.status(500).json({ message: "Erro ao criar o bairro" });
    }
};

const deleteBairro = async (req, res) => {
    try {
        console.log("ID recebido para exclusão:", req.params.id); 
        const result = await bairroModel.deleteBairro(req.params.id);
        if (result.error) {
            console.log("Erro: Bairro não encontrado."); 
            return res.status(404).json({ message: result.error });
        }
        console.log("Bairro deletado com sucesso:", result); 
        res.json(result);
    } catch (error) {
        console.error("Erro ao deletar o bairro:", error);
        res.status(500).json({ message: "Erro ao deletar o bairro" });
    }
};

const updateBairro = async (req, res) => {
    try {
        console.log("ID recebido para atualização:", req.params.id);
        const { nome, cidade, estado } = req.body;

        const updatedBairro = await bairroModel.updateBairro(req.params.id, { nome, cidade, estado });

        if (!updatedBairro) {
            console.log("Erro: Bairro não encontrado.");
            return res.status(404).json({ message: "Bairro não encontrado" });
        }

        console.log("Bairro atualizado com sucesso:", updatedBairro);
        res.status(200).json(updatedBairro);
    } catch (error) {
        console.error("Erro ao atualizar o bairro:", error);
        res.status(500).json({ message: "Erro ao atualizar o bairro" });
    }
};

module.exports = { getAllBairros, getBairros, createBairro, deleteBairro, updateBairro };