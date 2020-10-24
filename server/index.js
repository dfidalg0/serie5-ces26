const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const { randomBytes } = require('crypto');

const app = express();

app.use(express.json());

app.post('/send', async (req, res) => {
    const { name, age } = req.body;

    if (
        typeof name !== 'string' ||
        typeof age !== 'number' ||
        age < 18 || name === ''
    ) return res.json({
        message: 'Formulário inválido'
    });

    const filename = randomBytes(20).toString('hex') + '.json';

    await fs.writeFile(
        path.join(__dirname, 'data', filename),
        JSON.stringify({ name, age }, null, 2)
    );

    return res.json({
        message: 'Formulário enviado com sucesso!'
    });
});

app.get('/data', async (_req, res) => {
    const files = await fs.readdir(path.join(__dirname, 'data'));

    const data = (await Promise.all(files.map(filename =>
        fs.readFile(path.join(__dirname, 'data', filename), 'utf-8')
    ))).map(d => JSON.parse(d));

    res.json(data);
});

app.use(express.static(path.join(__dirname, '../build')));

app.listen(5000, () => {
    console.log('Server Started');
});
