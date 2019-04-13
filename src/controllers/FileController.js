const Box = require("../models/Box");

// importando o módulo de box
const File = require("../models/File");

class FileController {
    async store(req, res) {
        // req.params.id pegando o id
        const box = await Box.findById(req.params.id);

        const file = await File.create({
            title: req.file.originalname,
            path: req.file.key
        });

        box.files.push(file);

        await box.save();

        // avisando aos outros usuários que houve um novo arquivo adicionado
        req.io.sockets.in(box._id).emit("file", file);

        return res.json(file);
    }
}

// executando a criação da box, instanciando uma nova box
module.exports = new FileController();