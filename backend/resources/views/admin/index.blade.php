@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <!-- Sección de Roles -->
        <div class="col-md-4 col-lg-3 mb-4">
            <div class="card position-relative overflow-hidden">
                <img src="imagenes/logos/roles.png" class="card-img-top" alt="Roles">
                <div class="card-img-overlay d-flex flex-column justify-content-center text-center">
                    <h5 class="card-title text-white">Roles</h5>
                    <p class="card-text d-none d-md-block text-white">En esta sección el administrador puede gestionar los roles de los usuarios.</p>
                    <a href="{{ route('roles.index') }}" class="btn btn-light mt-3">Entrar</a>
                </div>
            </div>
        </div>

        <!-- Sección de Usuarios -->
        <div class="col-md-4 col-lg-3 mb-4">
            <div class="card position-relative overflow-hidden">
                <img src="imagenes/logos/users.png" class="card-img-top" alt="Usuarios">
                <div class="card-img-overlay d-flex flex-column justify-content-center text-center">
                    <h5 class="card-title text-white">Usuarios</h5>
                    <p class="card-text d-none d-md-block text-white">En esta sección el administrador puede gestionar los usuarios, crear, editar, eliminar...</p>
                    <a href="{{ route('usuarios.index') }}" class="btn btn-light mt-3">Entrar</a>
                </div>
            </div>
        </div>

        <!-- Sección de Vehículos -->
        <div class="col-md-4 col-lg-3 mb-4">
            <div class="card position-relative overflow-hidden">
                <img src="imagenes/logos/vehicles.png" class="card-img-top" alt="Vehículos">
                <div class="card-img-overlay d-flex flex-column justify-content-center text-center">
                    <h5 class="card-title text-white">Vehículos</h5>
                    <p class="card-text d-none d-md-block text-white">En esta sección el administrador puede gestionar los vehículos, crear, editar, eliminar...</p>
                    <a href="{{ route('vehicles.index') }}" class="btn btn-light mt-3">Entrar</a>
                </div>
            </div>
        </div>

        <!-- Sección de Registrar Visitantes -->
        <div class="col-md-4 col-lg-3 mb-4">
            <div class="card position-relative overflow-hidden">
                <img src="imagenes/logos/records.png" class="card-img-top" alt="Registrar Visitantes">
                <div class="card-img-overlay d-flex flex-column justify-content-center text-center">
                    <h5 class="card-title text-white">Registrar Visitantes</h5>
                    <p class="card-text d-none d-md-block text-white">En esta sección el administrador puede registrar a usuarios visitantes.</p>
                    <a href="{{ route('records.registervisited') }}" class="btn btn-light mt-3">Entrar</a>
                </div>
            </div>
        </div>

        <!-- Sección de Tipos de Vehículos -->
        <div class="col-md-4 col-lg-3 mb-4">
            <div class="card position-relative overflow-hidden">
                <img src="imagenes/logos/types.png" class="card-img-top" alt="Tipos de Vehículos">
                <div class="card-img-overlay d-flex flex-column justify-content-center text-center">
                    <h5 class="card-title text-white">Tipos de Vehículos</h5>
                    <p class="card-text d-none d-md-block text-white">En esta sección el administrador puede gestionar los tipos de vehículos.</p>
                    <a href="{{ route('types.index') }}" class="btn btn-light mt-3">Entrar</a>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@section('css')
    <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.3.0/css/bootstrap.min.css" rel="stylesheet">
    <style>
        .card {
            position: relative;
            overflow: hidden;
        }
        .card-img-overlay {
            transition: opacity 0.3s ease-in-out;
            opacity: 0;
            background: rgba(0, 0, 0, 0.5);
        }
        .card:hover .card-img-overlay {
            opacity: 1;
        }
        .card-title, .card-text, .btn {
            transition: opacity 0.3s ease-in-out;
        }
        .card:hover .card-title, .card:hover .card-text, .card:hover .btn {
            opacity: 1;
        }
        .card-title, .card-text, .btn {
            opacity: 0;
        }
    </style>
@endsection
