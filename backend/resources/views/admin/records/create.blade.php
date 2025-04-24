@extends('layouts.app')

@section('content')
<div class="container mt-5" style="max-width: 800px;">
    <a href="/home" class="btn btn-secondary mb-4" style="padding: 10px 20px; font-weight: bold; border-radius: 50px; background-color: #6c757d;">Regresar</a>
    <div class="text-center mb-4">
        <h1 style="font-family: 'Arial', sans-serif; font-weight: bold; color: #343a40;">Registrar Nuevo Registro</h1>
    </div>

    <div class="card shadow-sm" style="border-radius: 10px; background-color: #f8f9fa;">
        <div class="card-body p-4">
            <form method="GET" action="{{ route('records.create') }}">
                @csrf
                <div class="mb-3 row">
                    <label for="document_number" class="col-md-4 col-form-label text-md-end" style="font-weight: bold; color: #495057;">Número de Documento</label>
                    <div class="col-md-6">
                        <input type="text" class="form-control" id="document_number" name="document_number"
                            value="{{ old('document_number') }}" required style="border-radius: 8px; border-color: #ced4da;">
                    </div>
                </div>
                <div class="mb-3 row">
                    <div class="col-md-6 offset-md-4">
                        <button type="submit" class="btn btn-primary" style="padding: 10px 30px; font-size: 16px; border-radius: 50px;">Buscar Usuario</button>
                    </div>
                </div>
            </form>

            @if ($user)
                <hr>
                <h3 class="text-center" style="font-weight: bold; color: #343a40;">Usuario Encontrado: {{ $user->name }} {{ $user->last_name }}</h3>

                <form method="POST" action="{{ route('records.store') }}">
                    @csrf
                    <input type="hidden" name="user_id" value="{{ $user->id }}"> <!-- Este es el user_id -->

                    <!-- Seleccionar Vehículo -->
                    <div class="mb-3 row">
                        <label for="vehicle_id" class="col-md-4 col-form-label text-md-end" style="font-weight: bold; color: #495057;">Seleccionar Vehículo</label>
                        <div class="col-md-6">
                            <select name="vehicle_id" class="form-control" required style="border-radius: 8px; border-color: #ced4da;">
                                @foreach ($vehicles as $vehicle)
                                    <option value="{{ $vehicle->id }}">
                                        {{ $vehicle->mark }} - {{ $vehicle->plate }}
                                    </option>
                                @endforeach
                            </select>
                        </div>
                    </div>

                    <!-- Campos de fecha y hora de entrada automáticamente -->
                    <div class="mb-3 row">
                        <label for="entryDate" class="col-md-4 col-form-label text-md-end" style="font-weight: bold; color: #495057;">Fecha de Entrada</label>
                        <div class="col-md-6">
                            <input type="date" class="form-control" id="entryDate" name="entryDate"
                                value="{{ \Carbon\Carbon::now()->format('Y-m-d') }}" readonly required style="border-radius: 8px; border-color: #ced4da;">
                        </div>
                    </div>

                    <div class="mb-3 row">
                        <label for="entryTime" class="col-md-4 col-form-label text-md-end" style="font-weight: bold; color: #495057;">Hora de Entrada</label>
                        <div class="col-md-6">
                            <input type="time" class="form-control" id="entryTime" name="entryTime"
                                value="{{ \Carbon\Carbon::now()->format('H:i') }}" readonly required style="border-radius: 8px; border-color: #ced4da;">
                        </div>
                    </div>

                    <!-- Nombre del Vigilante (admin que registra el vehículo) -->
                    <div class="mb-3 row">
                        <label for="nameAdmin" class="col-md-4 col-form-label text-md-end" style="font-weight: bold; color: #495057;">Nombre del Vigilante</label>
                        <div class="col-md-6">
                            <input type="text" class="form-control" id="nameAdmin" name="nameAdmin"
                                value="{{ Auth::user()->name }}" readonly style="border-radius: 8px; border-color: #ced4da;">
                        </div>
                    </div>

                    <div class="mb-3 row">
                        <div class="col-md-6 offset-md-4">
                            <button type="submit" class="btn btn-success" style="padding: 10px 30px; font-size: 16px; border-radius: 50px;">Registrar</button>
                        </div>
                    </div>
                </form>
            @endif
        </div>
    </div>
</div>
@endsection
