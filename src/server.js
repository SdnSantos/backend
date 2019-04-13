// require serve para acessar alguma dependência da aplicação
const express = require("express");

const path = require("path");

const cors = require("cors");

// permitirá manipularo banco de dados com lingaugem javascript
const mongoose = require("mongoose");

// variável app guardará as informações da aplicação
const app = express();

app.use(cors());

const server = require("http").Server(app);
const io = require("socket.io")(server);

// conexão do usuário em uma sala única
// socket é a representação da conexão do usuário com o real time
io.on("connection", socket => {
    // criando uma rota dentro do socket
    socket.on("connectRoom", box => {
        socket.join(box);
    });
});

// useNewUrlParser passando para o mongoose que estamos utilizando o formato novo de conexão
mongoose.connect(
    "mongodb+srv://sidney:sidney@cluster0-avaor.mongodb.net/teste?retryWrites=true", {
        useNewUrlParser: true
    }
);

app.use((req, res, next) => {
    req.io = io;

    // enviar para o restante da aplicação processar essa requisição
    return next();
});

// .use é para cadastrar um módulo dentro do express
// express.json é um módulo midlleware no qual ajuda o servidor a entender as requisições no formato json(estrutura de dados muito utilizado em api rest)
// api rest é um serviço sem interface visual, que apenas fornece dados para outras interfaces visuais que poderá ser o React ou React Native
app.use(express.json());

// express.urlencoded permiti o envio de arquivos nas requisições
app.use(express.urlencoded({ extended: true }));

app.use("/files", express.static(path.resolve(__dirname, "..", "tmp")));
// informando onde ficará as rotas para a aplicação
// ./ significa a pasta atual, sem ele vai pensar que queremos importar o módulo routes que não existe
// importando a variável routes do arquivo routes.js
app.use(require("./routes"));

// detar a porta
server.listen(3333);