// representa uma pasta dentro da aplicação onde jogará os arquivos

const mongoose = require("mongoose");

// mongose.Schema é como é chamado uma tabela em bancos NoSQL
const Box = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    files: [{
        // Relacionamento com o schema file
        // file irá armazenar os ids dos files em box
        type: mongoose.Schema.Types.ObjectId,
        ref: "File"
    }]
}, {
    // timestamps faz com que crie um campo createdAt e updatedAt em cada registro da schema(tabela)
    // createdAt armazena a data de criação do registro
    // updatedAt armazena a data de alteração do registro
    timestamps: true
});

// exportando o model
module.exports = mongoose.model("Box", Box);