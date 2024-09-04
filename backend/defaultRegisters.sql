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

-- Creación de comments --
INSERT INTO comments (id, idUser, nameUser, lastNameUser, photoURL, message, image, reaction, created_at)
VALUES
(1, 1, 'Juan', 'Gonzales', 'users/icons/image1.jpg', 'El parcero que dejó las llaves en la moto, que me escriba pa devolverselas', 'comments/images/image1.jpg', '1', '2024-08-26 08:30:00'),
(2, 3, 'Ana', 'Gómez', 'users/icons/image2.jpg', 'Encontré éstas llaves, las dejé en portería', 'comments/images/image2.jpg', '3', '2024-08-26 08:35:00'),
(3, 6, 'Luis', 'Martínez', 'users/icons/image3.jpg', 'Casco olvidado en el P207', 'comments/images/image3.jpg', '8', '2024-08-26 08:40:00'),
(4, 9, 'María', 'Hernández', 'users/icons/image4.jpg', 'Dejaron las estacionarias prendidas', 'comments/images/image4.jpg', '3', '2024-08-26 08:45:00');



