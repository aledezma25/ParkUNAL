@extends('layouts.app')

@section('content')
<div class="container">
    <a href="/administrador" class="btn btn-primary">Regresar</a>
    <div class="text-center">
        <h2>Gestión de los tipos de vehículos</h2>
    </div>
    <div class="card">
        <div class="card-body">
            <form action="{{ route('types.store') }}" method="POST" enctype="multipart/form-data">
                @csrf
                <div class="mb-3 row">
                    <label for="name" class="col-md-4 col-form-label text-md-end">{{ __('Nombre') }}</label>
                    <div class="col-md-6">
                        <input type="text" name="name" id="name" class="form-control" placeholder="Nombre" required>
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="image" class="col-md-4 col-form-label text-md-end">{{ __('Imagen') }}</label>
                    <div class="col-md-6">
                        <input type="file" name="image" id="image" class="form-control">
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="description" class="col-md-4 col-form-label text-md-end">{{ __('Descripción') }}</label>
                    <div class="col-md-6">
                        <input type="text" name="description" id="description" class="form-control" placeholder="Descripción" required>
                    </div>
                </div>
                <div class="text-center">
                    <button type="submit" class="btn btn-primary">Enviar</button>
                </div>
            </form>
        </div>
    </div>
    <br>
    <br>
    <h2>Lista de tipos</h2>
    <br>
    <table class="table table-striped">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Imagen</th>
                <th scope="col">Descripción</th>
                <th scope="col">Acciones</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($types as $type)
            <tr>
                <td>{{ $type->id }}</td>
                <td>{{ $type->name }}</td>
                <td>
                    <img src="{{ asset($type->image) }}" alt="{{ $type->name }}" width="150px">
                </td>
                <td>{{ $type->description }}</td>
                <td>
                    <form action="{{ route('types.destroy', $type->id) }}" method="POST">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn btn-danger">Eliminar</button>
                    </form>
                    <a href="{{ route('types.edit', $type->id) }}" class="btn btn-warning">Editar</a>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
</div>
@endsection
