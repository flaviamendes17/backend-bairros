const bairroModel = require('../models/bairroModel ');

const getAllBairros = async (req, res) => {
    try {
        const bairros = await bairroModel.getBairros();
        res.status(bairros);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar os bairros" });
    }
};

const getBairros = async (req, res) => {
    try {
        const bairros = await bairroModel.getBairros(req.params.id);
        if (!bairro){
            return res.status(404).json({ message: "Bairro não encontrado" });
        }
        res.status(200).json(bairro);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar o bairro" });
    }
};

const createBairro = async (req, res) => {
    try {
        const { nome, cidade, estado } = req.body;
        const newBairro = await bairroModel.createBairro({ nome, cidade, estado });
        res.status(201).json(newBairro);
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar o bairro" });
    }
};

const updateBairro = async (req, res) => {
    try {
        const { nome, cidade, estado } = req.body;
        const updatedBairro = await bairroModel.updateBairro(req.params.id, { nome, cidade, estado });
        if (!updatedBairro) {
            return res.status(404).json({ message: "Bairro não encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar o bairro" });
    }
};

module.exports = { getAllBairros, getBairros, createBairro, updateBairro };