const pool = require('../config/database');

const getOcorrencias = async (nomeOcorrencia) => {
    if (nomeOcorrencia) {
        const result = await pool.query(
            "SELECT * FROM ocorrencias WHERE descricao ILIKE $1",
            [`%${nomeOcorrencia}%`]
        );
        return result.rows;
    } else {
        const result = await pool.query("SELECT * FROM ocorrencias");
        return result.rows;
    }
};

const getOcorrenciaById = async (id) => {
    const result = await pool.query("SELECT * FROM ocorrencias WHERE id = $1", [id]);
    return result.rows[0];
};

const createOcorrencia = async (ocorrencia) => {
    const result = await pool.query(
        "INSERT INTO ocorrencias (bairro_id, descricao) VALUES ($1, $2) RETURNING *",
        [ocorrencia.bairro_id, ocorrencia.descricao]
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