const express = require('express');
const fileController = require('./api/fileController');
const fs = require('fs');
const fileUpload = require('express-fileupload');
const crypto = require('crypto'); // Módulo necesario para calcular el SHA-1


const app = express();

const controller = new fileController();

app.use(express.json());
app.use(fileUpload());


app.get('/api/generar-archivo/', async (req, res) => {
    const nombreArchivo = 'output.txt';

    try {
        // Generate the multiline content
        const contenido = await controller.processData();
        fs.writeFileSync(nombreArchivo, contenido);

        const fileContent = fs.readFileSync(`${nombreArchivo}`);
        const sha1Hash = crypto.createHash('sha1').update(fileContent).digest('hex');
        console.log('SHA-1:', sha1Hash);

        // Send the content as a response with appropriate headers for download
        res.set('Content-Disposition', `attachment; filename="${nombreArchivo}"`);
        res.set('Content-Type', 'text/plain');
        res.send(contenido);
    } catch (error) {
        console.error('Error al generar el archivo:', error.message);
        res.status(500).send('Error al generar el archivo');
    }
});

app.get('/api/sha1', (req, res) => {
    const nombreArchivo = 'output.txt';
    try {
        const fileContent = fs.readFileSync(nombreArchivo);
        const sha1Hash = crypto.createHash('sha1').update(fileContent).digest('hex');
        res.send(`SHA-1 Hash: ${sha1Hash}`);
    } catch (error) {
        console.error('Error al obtener el SHA-1:', error.message);
        res.status(500).send('Error al obtener el SHA-1');
    }
});


const port = 8099;
app.listen(port, () => {
    console.log(`server http://localhost:${port}`);
});
