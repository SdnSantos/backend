// representa uma pasta dentro da aplicação onde jogará os arquivos

const mongoose = require("mongoose");

// mongose.Schema é como é chamado uma tabela em bancos NoSQL
const File = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    }
}, {
    // timestamps faz com que crie um campo created at e updated at em cada registro da schema(tabela)
    // created at armazena a data de criação do registro
    // updated at armazena a data de alteração do registro
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

File.virtual("url").get(function() {
    return `http://localhost:3333/files/${encodeURIComponent(this.path)}`;
});

// exportando o model
module.exports = mongoose.model("File", File);