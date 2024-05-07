@extends('layouts.app')

@section('content')
    <div class="container">
        <a href="/administrador" class="btn btn-primary">Regresar</a>
        <br><br>
        <h2>Gestión de usuarios </h2>
        <div class="container text-left">
            <a href="{{ route('create') }}" class="btn btn-primary">Crear</a>
        </div>
        
        <br>
        <div class="container text-center">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Apellido</th>
                    <th scope="col">Cédula</th>
                    <th scope="col">rol</th>
                    <th scope="col">Dirección</th>
                    <th scope="col">Telefono</th>
                    <th scope="col">Correo</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($users as $user)
                    <tr>
                        <td> {{ $loop->iteration }} </td>
                        <td> {{ $user->name }} </td>
                        <td> {{ $user->last_name }} </td>
                        <td> {{ $user->document_number }} </td>
                        <td> {{ $user->role_id }} </td>
                        <td> {{ $user->address }} </td>
                        <td> {{ $user->phone_number }} </td>
                        <td> {{ $user->email }} </td>
                        <td>
                            <form action="{{ route('usuarios.destroy', $user->id) }}" method="POST">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-danger">Eliminar</button>
                            </form>
                            <a href="{{ route('usuarios.edit', $user->id) }}" class="btn btn-warning">Editar </a>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
@endsection