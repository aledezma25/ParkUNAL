<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Park UNAL</title>
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Nunito', sans-serif;
            margin: 0;
            padding: 0;
            min-height: 100vh;
            background: linear-gradient(135deg, #94b43b, #f7fafc);
            color: #1a202c;
            position: relative;
        }
        .top-right {
            position: absolute;
            top: 20px;
            right: 30px;
        }
        .content {
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 6rem;
        }
        .container {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
            max-width: 600px;
            width: 100%;
            animation: fadeIn 1s ease-in-out;
        }
        .logo-container img {
            max-width: 50%;
            height: auto;
            margin-bottom: 1rem;
        }
        .welcome-message {
            font-size: 1.5rem;
            font-weight: bold;
            margin-bottom: 1rem;
            color: #2d3748;
        }
        .btn-container {
            margin-top: 1.5rem;
        }
        .btn {
            background-color: #94b43b;
            color: white;
            padding: 15px 40px;
            font-size: 1.2rem;
            border: none;
            border-radius: 12px;
            text-decoration: none;
            cursor: pointer;
            transition: transform 0.2s, background-color 0.4s;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .btn:hover {
            background-color: #7a9830;
            transform: translateY(-2px);
        }
        .btn:active {
            transform: translateY(0);
            box-shadow: inset 0 4px 6px rgba(0, 0, 0, 0.2);
        }
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        @media (max-width: 768px) {
            .logo-container img {
                max-width: 70%;
            }
            .btn {
                font-size: 1rem;
                padding: 10px 30px;
            }
            .top-right {
                top: 10px;
                right: 15px;
            }
        }
    </style>
</head>
<body>

    {{-- Botón superior derecho de Ingreso --}}
    <div class="top-right">
        @if (Route::has('login'))
            @auth
                <a href="{{ url('/home') }}" class="btn">Ir a Inicio</a>
            @else
                <a href="{{ route('login') }}" class="btn">Ingresar</a>
            @endif
        @endif
    </div>

    {{-- Contenido central --}}
    <div class="content">
        <div class="container">
            <div class="logo-container">
                <img src="imagenes/logoappParkUN.png" alt="Logo Park UNAL">
            </div>
            <div class="welcome-message">
                ¡Bienvenido a ParkUN!<br>
                Disfruta de una experiencia rápida, sencilla y eficaz.
            </div>
            <div class="btn-container">
                <a href="{{ url('/downloadparkun') }}" class="btn">Descargar Aplicación</a>
            </div>
        </div>
    </div>

    @extends('layouts.footer')

</body>
</html>
