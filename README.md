# BACKEND BAIRROS 🌇
Este é um projeto de backend desenvolvido em Node.js com Express.js para gerenciar informações de bairros e ocorrências relacionadas. 
Ele fornece uma API RESTful para realizar operações CRUD em bairros e ocorrências, além de gerar relatórios em PDF.

## 🎯Objetivo: 
Desenvolver uma aplicação back-end simples sobre bairros com a entidade 1 sendo o bairro, entidade 2 as ocorrências 
e um filtro referente ao nome do bairro.

## ⚙Funcionalidades:
### Gerenciamento de Bairros:

- Listar todos os bairros.

- Buscar bairros por ID ou nome.

- Criar, atualizar e deletar bairros.

- Upload de imagens para bairros.

- Gerenciamento de Ocorrências:

- Listar todas as ocorrências.

- Buscar ocorrências por ID.

- Criar, atualizar e deletar ocorrências.

### - 📜Relatório:

Gerar relatórios em PDF com a lista de bairros.
  
  ### - 🔏Segurança:

Middleware para autenticação via chave de API.

## Estrutura do projeto:
```
backend-bairros/
├── src/
│   ├── config/
│   │   ├── apiKey.js          
│   │   ├── database.js        
│   │   └── upload.js        
│   ├── controllers/
│   │   ├── bairroController.js  
│   │   ├── ocorrenciaController.js  
│   │   └── reportController.js  
│   ├── models/
│   │   ├── bairroModel.js     
│   │   └── ocorrenciaModel.js 
│   ├── routes/
│   │   ├── bairroRoutes.js    
│   │   ├── ocorrenciaRoutes.js 
│   │   └── reportRoutes.js    
│   └── database/
│       └── schema.sql        
├── .env                      
├── server.js                  
├── package.json               
└── uploads/
```           
