// importando o módulo de box
const Box = require("../models/Box");

class BoxController {
    // método para criar novos box ou pastas
    async store(req, res) {
        // criando nova box
        const box = await Box.create(req.body);

        return res.json(box);
    }

    async show(req, res) {
        const box = await Box.findById(req.params.id).populate({
            path: "files",
            options: { sort: { createdAt: -1 } }
        });

        return res.json(box);
    }
}

// executando a criação da box, instanciando uma nova box
module.exports = new BoxController();