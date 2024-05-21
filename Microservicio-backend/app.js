const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise'); 
const app = express();

app.use(bodyParser.json());

// Conexión a la base de datos
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'chatparkun',

};

// Ruta para guardar un dato en la tabla
app.post('/guardarResenia', async (req, res) => {
    try {
        const conexion = await mysql.createConnection(dbConfig);
        const { id_product, id_user, name_user, stars, title_comment, description_comment, date } = req.body;

        // Insertar datos en la tabla 'reviews'        
        await conexion.execute('INSERT INTO reviews (id_product, id_user, name_user, stars, title_comment, description_comment, date) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [id_product, id_user, name_user, stars, title_comment, description_comment, date]);

        await conexion.end();

        res.json({ mensaje: 'Reseña guardada correctamente' });
    } catch (error) {
        console.error('Error al guardar la reseña:', error);
        res.status(500).json({ error: 'Error al guardar la reseña' });
    }
});


app.get('/obtenerResenias', async (req, res) => {
    try {
        const conexion = await mysql.createConnection(dbConfig);
        const [datos] = await conexion.execute('SELECT * FROM reviews');
        await conexion.end();
        res.json(datos);
    } catch (error) {
        console.error('Error al obtener las datos:', error);
        res.status(500).json({ mensaje: 'Error al obtener los datos' });
    }
});

// Puerto en el que el servidor escuchará
const puerto = 3000;
app.listen(puerto, () => {
    console.log(`Servidor iniciado en http://localhost:${puerto}`);
});

// app.listen(PORT, IP, () => {
//     console.log(`La aplicación está escuchando en http://${IP}:${PORT}`);
//   });