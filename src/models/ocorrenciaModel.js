const pool = require('../config/database');

const getOcorrencias = async () => {
    if (!nomeBairro) {
        const result = await pool.query(
            `SELECT ocorrencias.*, bairro_id AS descricao
            FROM ocorrencias`
        );
        return result.rows;
    }else {
        const result = await pool.query(
            `SELECT ocorrencias.*, bairro_id AS descricao
            FROM ocorrencias WHERE bairro_id = $1`, [`%${nomeBairro}%`]
        );
        return result.rows;
    }
};

const getOcorrenciaById = async (id) => {
    const result = await pool.query(
        `SELECT ocorrencias.*, bairro_id AS descricao
        FROM ocorrencias WHERE id = $1`, [id]
    );
    return result.rows[0];
};

const createOcorrencia = async (ocorrencia) => {
    const result = await pool.query(
        `INSERT INTO ocorrencias (descricao, bairro_id, data_ocorrencia) 
        VALUES ($1, $2, $3) RETURNING *`, [ocorrencia.descricao, ocorrencia.bairro_id, ]
    );
    return result.rows[0];
};

const deleteOcorrencia = async (id) => {
    const result = await pool.query(
        `DELETE FROM ocorrencias WHERE id = $1 RETURNING *`, [id]);
        if (result.rowCount === 0) {
            return { error: "Ocorrencia não encontrada." };
        }
        return { message: "Ocorrencia deletada com sucesso." };
};

const updateOcorrencia = async (bairro_id, descricao) => {
    const result = await pool.query(
        `UPDATE ocorrencias SET descricao = $1, bairro_id = $2 WHERE id = $3 RETURNING *`, [descricao, bairro_id]
    );
    return result.rows[0];
};

module.exports = { getOcorrencias, getOcorrenciaById, createOcorrencia, deleteOcorrencia, updateOcorrencia };