-- Creación de roles --
INSERT INTO roles(name) VALUES ('administrador'), ('usuario');

-- Creación de usuarios --
-- La contraseña por defecto es prueba1234
INSERT INTO users(role_id, name, last_name, document_number, address, phone_number, email, password)
    VALUES (1,'Adrian Admin', 'Ledezma', '1004710780', 'Manizales, Caldas', '3167383112', 'aledezma@unal.edu.co', '$2y$10$vuklFwEPog24PmvN1DWcn.btDAFToOmGyda3nH/W7NwCQuFzJhw0q');

-- Creación de categorias --
INSERT INTO types(name, image, description)
    VALUES ('Carro','imagenes/types/carro.jpg','Camionetas, Eléctricos, Deportivos, Clásicos, etc.', 10),
           ('Moto','imagenes/types/moto.jpg','Deportivas, Clásicas, Chopper, etc.', 10),
           ('Bicicleta','imagenes/types/bici.jpg','De montaña, De ruta, Eléctricas, Urbanas, Monopatín, Scooter, etc.', 10);



