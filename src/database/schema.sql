CREATE DATABASE moradia;

\c moradia;

CREATE TABLE bairros (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cidade VARCHAR(255) NOT NULL,
    estado VARCHAR(2) NOT NULL
);

CREATE TABLE ocorrencias (
    id SERIAL PRIMARY KEY,
    bairro_id INTEGER NOT NULL,
    descricao TEXT NOT NULL,
    data_ocorrencia TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (bairro_id) REFERENCES bairros(id)
);

INSERT INTO bairros (nome, cidade, estado) VALUES
('Jardins', 'São Paulo', 'SP'),
('Copacabana', 'Rio de Janeiro', 'RJ'),
('Ipanema', 'Rio de Janeiro', 'RJ'),
('Lourdes', 'Belo Horizonte', 'MG'),
('Pinheiros', 'São Paulo', 'SP'),
('Leblon', 'Rio de Janeiro', 'RJ'),
('Vila Madalena', 'São Paulo', 'SP');

INSERT INTO ocorrencias (bairro_id, descricao) VALUES
(1, 'Aumento de assaltos na região'),
(2, 'Melhoria na iluminação pública'),
(3, 'Protesto contra a violência'),
(4, 'Reunião comunitária sobre segurança'),
(5, 'Aumento de furtos em veículos'),
(6, 'Campanha de conscientização sobre segurança'),
(7, 'Aumento de casos de vandalismo');