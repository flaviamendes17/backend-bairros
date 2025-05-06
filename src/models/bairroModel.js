const pool = require('../config/database');

const getBairros = async () => {
    try {
        console.log("Buscando todos os bairros...");
        const result = await pool.query("SELECT * FROM bairros");
        console.log("Bairros encontrados:", result.rows); 
        return result.rows;
    } catch (error) {
        console.error("Erro ao buscar os bairros no banco de dados:", error);
        throw error;
    }
};

const getBairroById = async (req, res) => {
    try {
        const { id } = req.params;
        const bairro = await bairroModel.getBairroById(id);

        if (!bairro) {
            return res.status(404).json({ message: "Bairro não encontrado" });
        }

        res.status(200).json(bairro);
    } catch (error) {
        console.error("Erro ao buscar o bairro:", error);
        res.status(500).json({ message: "Erro ao buscar o bairro" });
    }
};

const getBairrosByName = async (nome) => {
    try {
        console.log(`Buscando bairros com o nome: ${nome}`);
        const result = await pool.query(
            "SELECT * FROM bairros WHERE nome ILIKE $1", 
            [`%${nome}%`] 
        );
        console.log("Bairros filtrados encontrados:", result.rows);
        return result.rows;
    } catch (error) {
        console.error("Erro ao buscar bairros pelo nome:", error);
        throw error;
    }
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
    try {
        console.log("Tentando atualizar o bairro com ID:", id);
        console.log("Dados recebidos para atualização:", bairro);

        const result = await pool.query(
            "UPDATE bairros SET nome = $1, cidade = $2, estado = $3 WHERE id = $4 RETURNING *",
            [bairro.nome, bairro.cidade, bairro.estado, id]
        );

        if (result.rowCount === 0) {
            console.log("Bairro não encontrado.");
            return null;
        }

        console.log("Bairro atualizado com sucesso:", result.rows[0]);
        return result.rows[0];
    } catch (error) {
        console.error("Erro ao atualizar o bairro no banco de dados:", error);
        throw error;
    }
};



module.exports = { getBairros, getBairrosByName, getBairroById, createBairro, deleteBairro, updateBairro,  };