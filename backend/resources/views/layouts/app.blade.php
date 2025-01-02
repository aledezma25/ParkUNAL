<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>                    {{ __('Panel Administrativo') }}
    </title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">
    {{-- Ancizar Sans --}}
    <link href="https://fonts.googleapis.com/css2?family=Ancizar+Sans:wght@400;700&display=swap" rel="stylesheet">

    {{-- Datatable --}}
    @yield('css')
    {{-- <link rel="stylesheet" href="https://cdn.datatables.net/2.1.3/css/dataTables.dataTables.css" /> --}}

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body>
    <div id="app">
        <style>
            /* Estilos generales del navbar */
            .navbar {
                background-color: #2d3748; /* Fondo oscuro */
                border-bottom: 2px solid #94b43b; /* Línea decorativa */
                padding: 0.8rem 1rem;
            }
        
            .navbar-brand img {
                width: 60px;
                height: auto;
            }
        
            .navbar-brand {
                color: #94b43b;
                font-weight: bold;
                font-size: 1.5rem;
                font-family: 'Ancizar Sans', sans-serif;
                text-transform: uppercase;
                text-decoration: none;
            }
        
            .navbar-brand:hover {
                color: #7aa232;
            }
        
            .navbar-nav .nav-link {
                color: #e2e8f0; /* Blanco grisáceo */
                font-size: 1rem;
                font-weight: 500;
                transition: color 0.3s ease-in-out;
            }
        
            .navbar-nav .nav-link:hover {
                color: #94b43b;
            }
        
            .nav-item .dropdown-menu {
                background-color: #2d3748;
                border: 1px solid #94b43b;
                color: #e2e8f0;
            }
        
            .dropdown-item {
                color: #e2e8f0;
                transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
            }
        
            .dropdown-item:hover {
                background-color: #94b43b;
                color: #2d3748;
            }
        
            .navbar-toggler {
                border: none;
                background-color: #94b43b;
                padding: 5px 10px;
                border-radius: 5px;
            }
        
            .navbar-toggler-icon {
                background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23ffffff' viewBox='0 0 30 30'%3E%3Cpath stroke='none' d='M0 0h30v30H0z'/%3E%3Cpath d='M4 7h22a1 1 0 010 2H4a1 1 0 010-2zm0 7h22a1 1 0 010 2H4a1 1 0 010-2zm0 7h22a1 1 0 010 2H4a1 1 0 010-2z' fill='%23ffffff'/%3E%3C/svg%3E");
            }
        
            /* Responsividad */
            @media (max-width: 768px) {
                .navbar-brand {
                    font-size: 1.2rem;
                }
        
                .navbar-nav .nav-link {
                    font-size: 0.9rem;
                }
            }
        </style>
        
        <nav class="navbar navbar-expand-md">
            <div class="container">
                <!-- Logo -->
                <a class="navbar-brand" href="{{ url('home') }}">
                    <img src="imagenes/logoappParkUN.png" alt="Logo UNAL">
                    ParkUN
                </a>
        
                <!-- Botón Toggle -->
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
        
                <!-- Menú -->
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <!-- Menú Izquierdo -->
                    <ul class="navbar-nav me-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="/administrador">Panel Administrativo</a>
                        </li>
                    </ul>
        
                    <!-- Menú Derecho -->
                    <ul class="navbar-nav ms-auto">
                        @guest
                            @if (Route::has('login'))
                                <li class="nav-item">
                                    <a class="nav-link" href="{{ route('login') }}">Ingresar</a>
                                </li>
                            @endif
                            @if (Route::has('register'))
                                <li class="nav-item">
                                    {{-- <a class="nav-link" href="{{ route('register') }}">Registrar</a> --}}
                                </li>
                            @endif
                        @else
                            <li class="nav-item dropdown">
                                <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {{ Auth::user()->name }}
                                </a>
                                <div class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                    <a class="dropdown-item" href="{{ route('logout') }}"
                                       onclick="event.preventDefault();
                                                 document.getElementById('logout-form').submit();">
                                        Salir
                                    </a>
                                    <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                                        @csrf
                                    </form>
                                </div>
                            </li>
                        @endguest
                    </ul>
                </div>
            </div>
        </nav>

        <main class="py-4">
            @yield('content')
        </main>
        @include('layouts.footer')

    </div>
    @yield('js')


</body>
</html>
