@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-2">
            <div class="card mb-3 d-flex">
                <img src="imagenes/logos/roles.png" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Roles</h5>
                    <p class="card-text">En esta sección el administrador puede gestionar los roles de los usuarios</p>
                    <a href="{{ route('roles.index') }}" class="btn btn-primary">Entrar</a>
                </div>
            </div>
        </div>
        <div class="col-md-2">
            <div class="card mb-3 d-flex">
                <img src="imagenes/logos/users.png" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Usuarios</h5>
                    <p class="card-text">En esta sección el administrador puede gestionar los usuarios, crear, editar, eliminar...</p>
                    <a href="{{ route('usuarios.index') }}" class="btn btn-primary">Entrar</a>
                </div>
            </div>
        </div>
        <div class="col-md-2">
            <div class="card mb-3 d-flex">
                <img src="imagenes/logos/vehicles.png" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Vehículos</h5>
                    <p class="card-text">En esta sección el administrador puede gestionar los vehículos, crear, editar, eliminar...</p>
                    <a href="{{ route('vehicles.index') }}" class="btn btn-primary">Entrar</a>
                </div>
            </div>
        </div>
        <div class="col-md-2">
            <div class="card mb-3 d-flex">
                <img src="imagenes/logos/records.png" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Registrar Visitantes</h5>
                    <p class="card-text">En esta sección el administrador puede registrar a usuarios visitantes.
                    </p>
                    <a href="{{ route('records.index') }}" class="btn btn-primary">Entrar</a>
                </div>
            </div>
        </div>
        <div class="col-md-2">
            <div class="card mb-3 d-flex">
                <img src="imagenes/logos/types.png" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Tipos de Vehículos</h5>
                    <p class="card-text">En esta sección el administrador puede gestionar los tipos de vehículos</p>
                    <a href="{{ route('types.index') }}" class="btn btn-primary">Entrar</a>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
