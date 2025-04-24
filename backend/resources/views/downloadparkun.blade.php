<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Descargar ParkUN</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: 'Nunito', sans-serif;
            margin: 0;
            padding: 0;
            background: #f7fafc;
            color: #2d3748;
        }

        .descargar-container {
            max-width: 1100px;
            margin: 2rem auto;
            background: white;
            padding: 3rem;
            /* antes era 2rem */
            border-radius: 12px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .contenido-flex {
            display: flex;
            flex-direction: row;

            align-items: flex-start;
            justify-content: space-between;
        }


        .texto-columna {
            flex: 1.5;
            margin: 50px 0 0 150px;
        }

        .promo-columna {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            margin-top: 4rem;
        }

        .promo-columna img {
            max-width: 100%;
            width: 300px;
            border-radius: 16px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
            position: fixed;
        }
        .promo-columna img:hover {
            /* opacidad */
            opacity: 0.5;
            transition: opacity 0.3s ease;
        }


        h2,
        h3 {
            color: #2d3748;
        }

        .btn {
            display: inline-block;
            background-color: #94b43b;
            color: white;
            padding: 12px 30px;
            font-size: 1.1rem;
            border-radius: 10px;
            text-decoration: none;
            margin-top: 1rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: background-color 0.3s, transform 0.2s;
        }

        .btn:hover {
            background-color: #7a9830;
            transform: translateY(-2px);
        }

        ol {
            padding-left: 1.2rem;
        }

        li {
            margin-bottom: 1rem;
            font-size: 1rem;
        }

        .paso {
            margin-bottom: 3rem;
        }

        .paso img {
            max-width: 100%;
            border-radius: 8px;
            margin-top: 1.5rem;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
            width: 40%;
            display: block;
        }

        @media (max-width: 600px) {
            .btn {
                padding: 10px 20px;
                font-size: 1rem;
            }
        }

        @media (max-width: 768px) {
            .contenido-flex {
                flex-direction: column;
            }

            .promo-columna img {
                width: 90%;
                position: relative;
            }

            .paso img {
                max-width: 100%;
                border-radius: 8px;
                margin-top: 1.5rem;
                box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
            }

            .paso img {
                width: 100%;
            }

            .texto-columna {
                margin: 0 1rem;
            }
        }


        .promo-imagen {
            text-align: center;
            margin: 1.5rem 0 2rem;
        }

        .promo-imagen img {
            max-width: 400px;
            width: 90%;
            border-radius: 16px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease;
        }

        .promo-imagen img:hover {
            transform: scale(1.02);
        }

        .modal-overlay {
            display: none;
            position: fixed;
            z-index: 1000;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            justify-content: center;
            align-items: center;
            animation: fadeIn 0.3s ease-in-out;
        }

        .modal-content {
            background: white;
            padding: 2rem;
            border-radius: 16px;
            max-width: 500px;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            animation: slideUp 0.4s ease;
        }

        @keyframes slideUp {
            from {
                transform: translateY(40px);
                opacity: 0;
            }

            to {
                transform: translateY(0);
                opacity: 1;
            }
        }

    </style>
</head>

<body>

    <div class="contenido-flex">
        <!-- Columna izquierda -->
        <div class="texto-columna">
            <h2>Descarga la aplicación ParkUN</h2>
            <p>Puedes descargar el archivo APK de nuestra app aquí:</p>
            <a href="{{ asset('apks/parkun.apk') }}" class="btn" download>Descargar APK</a>
            <!-- Modal de agradecimiento -->
            <div id="graciasModal" class="modal-overlay">
                <div class="modal-content">
                    <h2>🎉 ¡Gracias por descargar ParkUN!</h2>
                    <p>Tu descarga ha comenzado. Si necesitas ayuda, revisa la guía de instalación.</p>
                    <div style="margin-top: 1.5rem;">
                        {{-- <a href="{{ url('/') }}" class="btn">Volver al Inicio</a> --}}
                        <button id="cerrarModal" class="btn"
                            style="background-color: #e53e3e; margin-left: 1rem;">Cerrar</button>
                    </div>
                </div>
            </div>



            <h3 style="margin-top: 2rem;">Guía de instalación</h3>

            <div class="paso">
                <strong>Paso 1:</strong> Descarga el archivo APK en tu dispositivo Android.
                <img src="{{ asset('imagenes/app/image1.jpeg') }}" alt="Paso 1: Descargar APK">
            </div>

            <div class="paso">
                <strong>Paso 2:</strong> Abre el archivo descargado. Si ves una advertencia de seguridad, habilita la
                opción <em>"Instalar desde fuentes desconocidas"</em>.
                <img src="{{ asset('imagenes/app/image2.jpeg') }}" alt="Paso 2: Fuentes desconocidas">
            </div>

            <div class="paso">
                <strong>Paso 3:</strong> Si sale modal de peligro confirmar y aceptar.
                <img src="{{ asset('imagenes/app/image3.jpeg') }}" alt="Paso 3: Confirmación de modal">
            </div>

            <div class="paso">
                <strong>Paso 4:</strong> Confirma la instalación.
                <img src="{{ asset('imagenes/app/image4.jpeg') }}" alt="Paso 4: Instalación en curso">
            </div>

            <div class="paso">
                <strong>Paso 5:</strong> ¡Listo! Abre la app desde el menú de aplicaciones.
                <img src="{{ asset('imagenes/app/image5.jpg') }}" alt="Paso 5: App instalada">
            </div>
        </div>

        <!-- Columna derecha: imagen promocional -->
        <div class="promo-columna">
            <img src="{{ asset('imagenes/app/promo-app.png') }}" alt="Vista previa ParkUN">
        </div>
    </div>


    {{-- Footer incluido --}}
    @extends('layouts.footer')
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            const descargarBtn = document.querySelector('.btn[download]');
            const modal = document.getElementById('graciasModal');
            const cerrarModal = document.getElementById('cerrarModal');

            descargarBtn.addEventListener('click', function() {
                setTimeout(() => {
                    modal.style.display = 'flex';
                }, 500);
            });

            cerrarModal.addEventListener('click', function() {
                modal.style.display = 'none';
            });
        });
    </script>


</body>

</html>
