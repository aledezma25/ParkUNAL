@extends('layouts.app')

@section('content')
<div class="container">
    <a href="/administrador" class="btn btn-primary">Regresar</a>
    <div class="text-center">
        <h2>Gestión de Roles</h2>
    </div>
    <div class="card">
        <div class="card-body">
            <form action="{{ route('roles.store') }}" method="POST">
                @csrf
                <div class="mb-3 row">
                    <label for="name" class="col-md-4 col-form-label text-md-end">{{ __('Nombre') }}</label>
                    <div class="col-md-6">
                        <input type="text" name="name" id="name" placeholder="Nombre" class="form-control" required>
                    </div>
                </div>
                <div class="text-center">
                    <button type="submit" class="btn btn-primary">Crear</button>
                </div>
            </form>
        </div>
    </div>
    <br>
    <br>
    <h2>Lista de Roles</h2>
    <br>
    <table class="table table-striped">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Acciones</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($roles as $role)
            <tr>
                <td>{{ $role->id }}</td>
                <td>{{ $role->name }}</td>
                <td>
                    <form action="{{ route('roles.destroy', $role->id) }}" method="POST">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn btn-danger">Eliminar</button>
                    </form>
                    <a href="{{ route('roles.edit', $role->id) }}" class="btn btn-warning">Editar</a>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
</div>
@endsection
