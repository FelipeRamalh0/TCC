import multer from "multer";

import path from "path";

// CONFIGURAÇÃO

const storage = multer.diskStorage({

   destination: (req, file, cb) => {

      cb(null, "uploads/");

   },

   filename: (req, file, cb) => {

      const extensao =
         path.extname(file.originalname);

      const nomeArquivo =
         Date.now() + extensao;

      cb(null, nomeArquivo);

   }

});

const upload = multer({

   storage

});

export default upload;