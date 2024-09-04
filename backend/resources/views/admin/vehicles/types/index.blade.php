@extends('layouts.app')

@section('css')
    <link href="https://cdn.datatables.net/2.1.3/css/dataTables.bootstrap5.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.3.0/css/bootstrap.min.css" rel="stylesheet">
@endsection

@section('content')
<div class="container">
    <h2>Gestión de tipos de vehículos</h2>
    <div class="container text-left">
        <a href="/administrador" class="btn btn-primary">Regresar</a>

        <a href="{{ route('createType') }}" class="btn btn-success">Nuevo Tipo de Vehículo</a>
    </div>
    <br>
    <div class="container">
        <table id="typesTable" class="table table-striped table-bordered shadow-lg mt-4">
            <thead class="table-success">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Imagen</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Espacios</th>
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
                    <td>{{ $type->spaces }}</td>
                    <td>
                        <a href="{{ route('types.edit', $type->id) }}" class="btn btn-warning">Editar</a>
                        <form action="{{ route('types.destroy', $type->id) }}" method="POST" style="display:inline;">
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
            $('#typesTable').DataTable({
                "lengthMenu": [[5, 10, 20, 50, -1], [5, 10, 20, 50, "All"]],
                "order": [[ 0, "asc" ]]
            });
        });
    </script>
@endsection
