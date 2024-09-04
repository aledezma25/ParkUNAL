@extends('layouts.app')

@section('css')
    <link href="https://cdn.datatables.net/2.1.3/css/dataTables.bootstrap5.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.3.0/css/bootstrap.min.css" rel="stylesheet">
@endsection

@section('content')

    <div class="container">
        <div class="row justify-content-center">
            <div class="">
                <div class="card">
                            {{-- <a href="/home" class="btn btn-success">Actualizar</a> --}}
                    {{-- Actualizar la pagina automaticamente --}}
                    <meta http-equiv="refresh" content="60">
                    
                    
                    <div class="card-body">
                        {{-- <a href="{{ route('records.registervisited') }}" class="btn btn-primary">Ver visitantes</a> --}}
                        <table id="myTable" class="table table-striped table-bordered shadow-lg mt-4">
                            <thead class="table-success">
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Apellido</th>
                                    <th scope="col">Cédula</th>
                                    <th scope="col">Telefono</th>
                                    <th scope="col">Hora de entrada</th>
                                    <th scope="col">Fecha de entrada</th>
                                    <th scope="col">Vehiculo</th>
                                    <th scope="col">Color</th>
                                    <th scope="col">Marca</th>
                                    <th scope="col">Hora de Salida</th>
                                    <th scope="col">Placa</th>
                                    <th scope="col">Vigilante</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach($records as $record)
                                <tr>
                                    <td>{{ $record->id }}</td>
                                    <td>{{ $record->user->name }}</td>    
                                    {{-- <td>{{ $record->vehicle->idUser}}</td> --}}

                                    <td>{{ $record->user->last_name }}</td>
                                    <td>{{ $record->user->document_number }}</td>
                                    <td>{{ $record->user->phone_number }}</td>
                                    <td>{{ $record->entryTime }}</td>
                                    <td>{{ $record->entryDate }}</td>
                                    {{-- tipo de vehiculo --}}
                                    <td>{{ $record->vehicle->type->name }}</td>
                                    <td>{{ $record->vehicle->color }}</td>
                                    <td>{{ $record->vehicle->mark }}</td>
                                    <td>{{ $record->exitTime }}</td>
                                    <td>{{ $record->vehicle->plate }}</td>
                                    <td>{{ $record->nameAdmin }}</td>

                                    <td>
                                        <form action="{{ route('records.destroy', $record->id) }}" method="POST">
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
                <br>
                @if (Auth::check())
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif
                    <p>{{ __('Tu rol es: ') }} {{ Auth::user()->role->name }}</p>
                    @switch(Auth::user()->role->name)
                    {{-- importante, si cambia o edita los roles, cambiar en esta sección --}}
                        @case('administrador')
                            {{-- <a href="{{ route('administrador') }}">Ver Registros</a> --}}
                        @break
                        @case('usuarios')
                            <a href="{{ route('usuarios.index') }}">User</a>
                        @break
                        @case('asesor')
                            <a href="{{ route('asesor') }}">Asesor</a>
                        @break
                        @default
                    @endswitch
                @endif
            </div>
        </div>
    </div>

    @section('js')
    <script src="https://code.jquery.com/jquery-3.7.1.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.3.0/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.datatables.net/2.1.3/js/dataTables.js"></script>
    <script src="https://cdn.datatables.net/2.1.3/js/dataTables.bootstrap5.js"></script>
    <script>
        $(document).ready(function() {
            //Paginacion de 5 elementos
            $('#myTable').DataTable({
                "lengthMenu": [[5, 10, 20, 50, -1], [5, 10, 20, 50, "All"]],
                //por defecto ordenado por la columna 0
                "order": [[ 0, "desc" ]]

            });

        });
    </script>
@endsection
@endsection

