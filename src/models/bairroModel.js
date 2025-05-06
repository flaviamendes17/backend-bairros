const pool = require('../config/database');

const getBairros = async () => {
    const result = await pool.query("SELECT * FROM bairros");
    return result.rows;
};

const getBairroById = async (id) => {
    const result = await pool.query("SELECT * FROM bairros WHERE id = $1", [id]);
    return result.rows[0];
};

const createBairro = async (bairro) => {
    const result = await pool.query(
        "INSERT INTO bairros (nome, cidade, estado) VALUES ($1, $2, $3) RETURNING *",
        [bairro.nome, bairro.cidade, bairro.estado]
    );
    return result.rows[0];
};

const deleteBairro = async (id) => {
    try {
        console.log("Tentando deletar o bairro com ID:", id);

        await pool.query("DELETE FROM ocorrencias WHERE bairro_id = $1", [id]);

        // Excluir o bairro
        const result = await pool.query("DELETE FROM bairros WHERE id = $1 RETURNING *", [id]);
        if (result.rowCount === 0) {
            console.log("Bairro não encontrado.");
            return { error: "Bairro não encontrado" };
        }
        console.log("Bairro deletado com sucesso:", result.rows[0]);
        return { message: "Bairro deletado com sucesso" };
    } catch (error) {
        console.error("Erro ao deletar o bairro no banco de dados:", error);
        throw error;
    }
};

const updateBairro = async (id, bairro) => {
    const result = await pool.query (
        "UPDATE bairros SET nome = $1, cidade = $2, estado = $3 WHERE id = $4 RETURNING *",
        [bairro.nome, bairro.cidade, bairro.estado, id]
    );
    return result.rows[0];
};

module.exports = { getBairros, getBairroById, createBairro, deleteBairro, updateBairro };