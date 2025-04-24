@extends('layouts.app')

@section('content')
<div class="container mt-5" style="max-width: 800px;">
    <a href="{{ route('home') }}" class="btn btn-secondary mb-4" style="padding: 10px 20px; font-weight: bold; border-radius: 50px; background-color: #6c757d;">Regresar</a>
    
    <div class="text-center mb-4">
        <h1 style="font-weight: bold; color: #343a40;">Editar Registro</h1>
    </div>
    
    <div class="card shadow-sm" style="border-radius: 10px; background-color: #f8f9fa;">
        <div class="card-body p-4">
            <form action="{{ route('records.update', $record->id) }}" method="POST">
                @csrf
                @method('PUT')

                {{-- Usuario --}}
                <div class="mb-3 row">
                    <label for="user_id" class="col-md-4 col-form-label text-md-end" style="font-weight: bold; color: #495057;">Usuario</label>
                    <div class="col-md-6">
                        <select name="user_id" id="user_id" class="form-select" style="border-radius: 8px;">
                            @foreach($users as $user)
                                <option value="{{ $user->id }}" {{ $record->idUser == $user->id ? 'selected' : '' }}>
                                    {{ $user->name }} {{ $user->last_name }} - {{ $user->document_number }}
                                </option>
                            @endforeach
                        </select>
                    </div>
                </div>

                {{-- Vehículo --}}
                <div class="mb-3 row">
                    <label for="vehicle_id" class="col-md-4 col-form-label text-md-end" style="font-weight: bold; color: #495057;">Vehículo</label>
                    <div class="col-md-6">
                        <select name="vehicle_id" id="vehicle_id" class="form-select" style="border-radius: 8px;">
                            @foreach($vehicles as $vehicle)
                                <option value="{{ $vehicle->id }}" {{ $record->idVehicle == $vehicle->id ? 'selected' : '' }}>
                                    {{ $vehicle->type->name }} - {{ $vehicle->plate }} ({{ $vehicle->color }} / {{ $vehicle->mark }})
                                </option>
                            @endforeach
                        </select>
                    </div>
                </div>

                {{-- Hora de Entrada --}}
                <div class="mb-3 row">
                    <label for="entryTime" class="col-md-4 col-form-label text-md-end" style="font-weight: bold; color: #495057;">Hora de Entrada</label>
                    <div class="col-md-6">
                        <input type="time" name="entryTime" class="form-control" value="{{ $record->entryTime }}" style="border-radius: 8px;" required>
                    </div>
                </div>

                {{-- Fecha de Entrada --}}
                <div class="mb-3 row">
                    <label for="entryDate" class="col-md-4 col-form-label text-md-end" style="font-weight: bold; color: #495057;">Fecha de Entrada</label>
                    <div class="col-md-6">
                        <input type="date" name="entryDate" class="form-control" value="{{ $record->entryDate }}" style="border-radius: 8px;" required>
                    </div>
                </div>

                {{-- Hora de Salida --}}
                <div class="mb-3 row">
                    <label for="exitTime" class="col-md-4 col-form-label text-md-end" style="font-weight: bold; color: #495057;">Hora de Salida</label>
                    <div class="col-md-6">
                        <input type="time" name="exitTime" class="form-control" value="{{ $record->exitTime }}" style="border-radius: 8px;">
                    </div>
                </div>

                {{-- Vigilante --}}
                <div class="mb-3 row">
                    <label for="nameAdmin" class="col-md-4 col-form-label text-md-end" style="font-weight: bold; color: #495057;">Nombre del Vigilante</label>
                    <div class="col-md-6">
                        <input type="text" name="nameAdmin" class="form-control" value="{{ $record->nameAdmin }}" style="border-radius: 8px;" required>
                    </div>
                </div>

                <div class="text-center">
                    <button type="submit" class="btn btn-success" style="padding: 10px 30px; font-size: 16px; border-radius: 50px;">Guardar Cambios</button>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection

@section('js')
    <script src="https://code.jquery.com/jquery-3.7.1.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.3.0/js/bootstrap.bundle.min.js"></script>
@endsection
