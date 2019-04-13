const multer = require("multer");

// padronizar os paths
const path = require("path");

// gerar conjunto de caracteres únicos, hash
const crypto = require("crypto");

module.exports = {
    // path.resolve padroniza os caminhos, pois no Windows a barra é de um lado, no linux de outro
    // '..', '..', está voltando até a pasta tmp, no lugar da barra coloca vírgula
    //__dirname é o diretório onde o arquivo multer se encontra
    dest: path.resolve(__dirname, "..", "..", "tmp"),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, "..", "..", "tmp"));
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err);

                file.key = `${hash.toString("hex")}-${file.originalname}`;

                cb(null, file.key);
            });
        }
    })
};