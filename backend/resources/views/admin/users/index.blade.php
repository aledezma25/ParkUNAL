@extends('layouts.app')

@section('css')
    <link href="https://cdn.datatables.net/2.1.3/css/dataTables.bootstrap5.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.3.0/css/bootstrap.min.css" rel="stylesheet">
@endsection

@section('content')
    <div class="container">
        <h2>Gestión de usuarios</h2>
        <div class="container text-left">
            <a href="/administrador" class="btn btn-primary">Regresar</a>

            <a href="{{ route('create') }}" class="btn btn-success">Nuevo Usuario</a>
        </div>
        
        <br>
        <div class="container">
            <table id="usersTable" class="table table-striped table-bordered shadow-lg mt-4">
                <thead class="table-success">
                    <tr>
                        <th scope="col">id</th>
                        {{-- <th scope="col">Foto</th> --}}
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
                            {{-- <td> <img src="{{ URL::asset($user->photoURL) }}" alt="" width="50"> </td> --}}
                            <td> {{ $user->name }} </td>
                            <td> {{ $user->last_name }} </td>
                            <td> {{ $user->document_number }} </td>
                            <td> {{ $user->role_id }} </td>
                            <td> {{ $user->address }} </td>
                            <td> {{ $user->phone_number }} </td>
                            <td> {{ $user->email }} </td>
                            <td>
                                <a href="{{ route('usuarios.edit', $user->id) }}" class="btn btn-warning">Editar</a>
                                <form action="{{ route('usuarios.destroy', $user->id) }}" method="POST" style="display:inline;">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="btn btn-danger">Eliminar</button>
                                </form>
                               
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
@endsection

@section('js')
    <script src="https://code.jquery.com/jquery-3.7.1.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.3.0/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.datatables.net/2.1.3/js/dataTables.js"></script>
    <script src="https://cdn.datatables.net/2.1.3/js/dataTables.bootstrap5.js"></script>
    <script>
        $(document).ready(function() {
            $('#usersTable').DataTable({
                "lengthMenu": [[5, 10, 20, 50, -1], [5, 10, 20, 50, "All"]],
                "order": [[ 0, "asc" ]]
            });
        });
    </script>
@endsection
 