require('dotenv').config() //inicializar
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const {databaseService} = require('./services/datebaseService');
const {dirname, extname, join} = require('path');
const {fileURLToPath} = require('url');
const path = require('path');
const mainModuleFilename = require.main.filename;

const CURRENT_DIR = __dirname;
const app =express();
app.use(cors());

// app.post('/upload', multerUpload.single('file'), (req, res) => {
//     console.log(req.file);

//     res.sendStatus(200);
// });

console.log('directorio actual', CURRENT_DIR);
app.use('/uploads', express.static(join(CURRENT_DIR, './uploads')));

app.use(bodyParser.json());

require('./routes')(app, databaseService()); //inyección de dependecias

app.listen(3000, () => {
    console.log(`Servidor corriendo en el puerto 3000`);
});

