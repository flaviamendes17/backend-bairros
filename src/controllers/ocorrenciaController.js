const ocorrenciaModel = require('../models/ocorrenciaModel');

const getAllOcorrencias = async (req, res) => {
    try {
        const { nomeOcorrencia} = req.query;
        const ocorrencias = await ocorrenciaModel.getOcorrencias(nomeOcorrencia);
        res.status(200).json(ocorrencias); 
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar as ocorrências" });
    }
};

const getOcorrencia = async (req, res) => {
    try {
        const ocorrencia = await ocorrenciaModel.getOcorrenciaById(req.params.id); 
        if (!ocorrencia) {
            return res.status(404).json({ message: "Ocorrência não encontrada" });
        }
        res.json(ocorrencia);
    } catch (error) {
        console.error("Erro ao buscar a ocorrência:", error);
        res.status(500).json({ message: "Erro ao buscar a ocorrência" });
    }
};

const createOcorrencia = async (req, res) => {
    try {
        const { bairro_id, descricao } = req.body; 
        const newOcorrencia = await ocorrenciaModel.createOcorrencia({ bairro_id, descricao });
        res.status(201).json(newOcorrencia);
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar a ocorrência" });
    }
};

const deleteOcorrencia = async (req, res) => {
    try {
        const message = await ocorrenciaModel.deleteOcorrencia(req.params.id);
        res.status(200).json({ message });
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar a ocorrência" });
    }
};

const updateOcorrencia = async (req, res) => {
    try {
        console.log("ID recebido para atualização:", req.params.id);
        const { descricao, bairro_id } = req.body;

        const updatedOcorrencia = await ocorrenciaModel.updateOcorrencia(req.params.id, { descricao, bairro_id });

        if (!updatedOcorrencia) {
            console.log("Erro: Ocorrência não encontrada.");
            return res.status(404).json({ message: "Ocorrência não encontrada" });
        }

        console.log("Ocorrência atualizada com sucesso:", updatedOcorrencia);
        res.status(200).json(updatedOcorrencia);
    } catch (error) {
        console.error("Erro ao atualizar a ocorrência:", error);
        res.status(500).json({ message: "Erro ao atualizar a ocorrência" });
    }
};

module.exports = { getAllOcorrencias, getOcorrencia, createOcorrencia, deleteOcorrencia, updateOcorrencia };