const ocorrenciaModel = require('../models/ocorrenciaModel');

const getAllOcorrencias = async (req, res) => {
    try {
        const { nomeOcorrencia} = req.query;
        const ocorrencias = await ocorrenciaModel.getOcorrencias(nomeOcorrencia);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar as ocorrências" });
    }
};

const getOcorrencia = async (req, res) => {
    try {
        const ocorrencias = await ocorrenciaModel.getOcorrencias(req.params.id);
        if (!ocorrencias) {
            return res.status(404).json({ message: "Ocorrência não encontrada" });
        }
        res.json(ocorrencias);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar a ocorrência" });
    }
};

const createOcorrencia = async (req, res) => {
    try {
        const { bairro_id, descricao} = req.body;
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
        const { bairro_id, descricao } = req.body;
        const updatedOcorrencia = await ocorrenciaModel.updateOcorrencia(req.params.id, { bairro_id, descricao });
        if (!updatedOcorrencia) {
            return res.status(404).json({ message: "Ocorrência não encontrada" });
        }
        res.json(updatedOcorrencia);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar a ocorrência" });
    }
};

module.exports = { getAllOcorrencias, getOcorrencia, createOcorrencia, deleteOcorrencia, updateOcorrencia };