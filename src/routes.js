// require serve para acessar alguma dependência da aplicação
const express = require("express");
const multer = require("multer");
const multerConfig = require("./config/multer");

const routes = express.Router();

// acesssando o controller
const BoxController = require("./controllers/BoxController");

const FileController = require("./controllers/FileController");

// API REST:
// GET      - busacar alguma informação da API
// POST     - criar
// PUT      - editar
// DELETE   - deletar

// midlleware é uma função(interceptador) que recebe uma requisição, modifica ou retorna uma resposta

// req é a requisição feita para o servidor
// exemplo: se o front-end está enviando um formulário, estará os campos no req(dados), se enviar algum parâmetro ou informação
// res é a resposta ao cliente
routes.post("/boxes", BoxController.store);

routes.get("/boxes/:id", BoxController.show);

// .single('file') é um upload por vez com o nome do campo file, no qual o frontend precisa enviar
// :id está informando para o express que está esperando um parâmetro
routes.post(
    "/boxes/:id/files",
    multer(multerConfig).single("file"),
    FileController.store
);

// está exportando a variável routes para o arquivo principal da aplicação o server.js
module.exports = routes;