import express from 'express';
import morgan from 'morgan';
import path from 'node:path';

const app = express();
const PORT = 3000;

app.use(express.static(path.join(path.resolve(), 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

app.post('/sumar-matrices', (req, res) => {
    const { matriz1, matriz2 } = req.body;

    // Validar que las matrices tengan las mismas dimensiones
    if (matriz1.length !== matriz2.length || matriz1[0].length !== matriz2[0].length) {
        return res.status(400).json({ error: 'Las matrices deben tener las mismas dimensiones' });
    }

    // Sumar las matrices
    const resultado = [];
    for (let i = 0; i < matriz1.length; i++) {
        const fila = [];
        for (let j = 0; j < matriz1[i].length; j++) {
            fila.push(Number(matriz1[i][j]) + Number(matriz2[i][j]));
        }
        resultado.push(fila);
    }

    res.json({ resultado });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});