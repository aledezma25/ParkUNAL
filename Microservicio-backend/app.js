const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const cors = require('cors');
app.use(cors());

app.use(express.json());

// Conexión a la base de datos
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'parkunvisitors',
};

// Ruta para guardar un dato en la tabla
app.post('/guardarVisitor', async (req, res) => {
    try {
        const conexion = await mysql.createConnection(dbConfig);
        let { name, lastName, documentNumber, phone, mark, color, typeVehicle, plate, entryDate, exitDate } = req.body;

        // Reemplazar valores `undefined` con `null`
        name = name !== undefined ? name : null;
        lastName = lastName !== undefined ? lastName : null;
        documentNumber = documentNumber !== undefined ? documentNumber : null;
        phone = phone !== undefined ? phone : null;
        mark = mark !== undefined ? mark : null;
        color = color !== undefined ? color : null;
        typeVehicle = typeVehicle !== undefined ? typeVehicle : null;
        plate = plate !== undefined ? plate : null;
        entryDate = entryDate !== undefined ? entryDate : null;
        exitDate = exitDate !== undefined ? exitDate : null;

        // Insertar datos en la tabla 'visitors'
        await conexion.execute('INSERT INTO visitors (name, lastName, documentNumber, phone, mark, color, typeVehicle, plate, entryDate, exitDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
            [name, lastName, documentNumber, phone, mark, color, typeVehicle, plate, entryDate, exitDate]);

        await conexion.end();

        res.json({ mensaje: 'Registro guardado correctamente' });
    } catch (error) {
        console.error('Error al guardar el registro:', error.message); // Solo el mensaje del error
        res.status(500).json({ error: 'Error al guardar el registro', details: error.message }); // Enviar detalles del error
    }
    console.log('Datos recibidos:', req.body);

});


app.get('/obtenerVisitors', async (req, res) => {
    try {
        const conexion = await mysql.createConnection(dbConfig);
        const [datos] = await conexion.execute('SELECT * FROM visitors');
        await conexion.end();
        res.json(datos);
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        res.status(500).json({ mensaje: 'Error al obtener los datos' });
    }
});

// Ruta para actualizar un dato en la tabla
app.put('/actualizarVisitor/:id', async (req, res) => {
    try {
        const conexion = await mysql.createConnection(dbConfig);
        const { id } = req.params;
        let { name, lastName, documentNumber, phone, mark, color, typeVehicle, plate, entryDate, exitDate } = req.body;

        // Reemplazar valores `undefined` con `null`
        name = name !== undefined ? name : null;
        lastName = lastName !== undefined ? lastName : null;
        documentNumber = documentNumber !== undefined ? documentNumber : null;
        phone = phone !== undefined ? phone : null;
        mark = mark !== undefined ? mark : null;
        color = color !== undefined ? color : null;
        typeVehicle = typeVehicle !== undefined ? typeVehicle : null;
        plate = plate !== undefined ? plate : null;
        entryDate = entryDate !== undefined ? entryDate : null;
        exitDate = exitDate !== undefined ? exitDate : null;

        // Actualizar datos en la tabla 'visitors'
        await conexion.execute('UPDATE visitors SET name = ?, lastName = ?, documentNumber = ?, phone = ?, mark = ?, color = ?, typeVehicle = ?, plate = ?, entryDate = ?, exitDate = ? WHERE id = ?', 
            [name, lastName, documentNumber, phone, mark, color, typeVehicle, plate, entryDate, exitDate, id]);

        await conexion.end();

        res.json({ mensaje: 'Registro actualizado correctamente' });
    } catch (error) {
        console.error('Error al actualizar el registro:', error.message);
        res.status(500).json({ error: 'Error al actualizar el registro', details: error.message });
    }
});



// Puerto en el que el servidor escuchará
const puerto = 3000;
app.listen(puerto, () => {
    console.log(`Servidor iniciado en http://localhost:${puerto}`);
});
