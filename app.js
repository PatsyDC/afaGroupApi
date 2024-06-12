require('dotenv').config() //inicializar
const multer = require('multer');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const {databaseService} = require('./services/datebaseService');
const {dirname, extname, join} = require('path');
const {fileURLToPath} = require('url');
const path = require('path');
const mainModuleFilename = require.main.filename;

const CURRENT_DIR = path.dirname(mainModuleFilename);

const MIMETYPES = ['image/jpeg', 'image/png']; //tipo de dato q acepta la img

const multerUpload = multer({
    storage: multer.diskStorage({
        destination: join(CURRENT_DIR, './uploads'),
        filename: (req, file, cb) => {
            const fileExtension = extname(file.originalname);
            const fileName = file.originalname.split(fileExtension)[0];

            cb(null, `${fileName}-${Date.now()}${fileExtension}`);
        },
    }),
    fileFilter: (req, file, cb) => {
        if (MIMETYPES.includes(file.mimetype)) cb(null, true);
        else cb(new Error(`Only ${MIMETYPES.join(' ')} mimetypes are allowed`));
    },
    limits: {
        fieldSize: 10000000,
    },
});

const app =express();
app.use(cors());

app.post('/upload', multerUpload.single('file'), (req, res) => {
    console.log(req.file);

    res.sendStatus(200);
});

app.use('/public', express.static(join(CURRENT_DIR, './uploads')));

app.use(bodyParser.json());

require('./routes')(app, databaseService()); //inyección de dependecias

app.listen(3000, () => {
    console.log(`Servidor corriendo en el puerto 3000`);
});

