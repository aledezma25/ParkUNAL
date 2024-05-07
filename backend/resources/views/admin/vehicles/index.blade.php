@extends('layouts.app')

@section('content')
    <div class="container">
        <a href="/administrador" class="btn btn-primary">Regresar</a>
        <br><br>
        <h2>Gestión de vehiculos </h2>
        <div class="container text-left">
            <a href="{{ route('createVehi') }}" class="btn btn-primary">Crear</a>
        </div>
        <br>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Color</th>
                    <th scope="col">Marca</th>
                    <th scope="col">Placa</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($vehicles as $vehicle)
                    <tr>
                        <td>{{ $vehicle->id }}</td>
                        <td>{{ $vehicle->type->name }}</td>
                        <td>{{ $vehicle->color }}</td>
                        <td>{{ $vehicle->mark }}</td>
                        <td>{{ $vehicle->plate }}</td>
                        <td>
                            <a href="{{ route('vehicles.edit', $vehicle->id) }}" class="btn btn-warning">Editar</a>
                            <form action="{{ route('vehicles.destroy', $vehicle->id) }}" method="POST">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-danger">Eliminar</button>
                            </form>
                        </td>
                    </tr>
                @endforeach
            </tbody>
    </div>
@endsection