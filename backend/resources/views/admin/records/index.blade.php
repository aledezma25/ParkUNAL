@extends('layouts.app')

@section('content')
<div class="container">
    <a href="/administrador" class="btn btn-primary">Regresar</a>
    <div class="text-center">
        <h1>Registro de entrada a Visitantes</h1>
    </div>
    <div class="card">
        <div class="card-body">
            <form action="{{ route('records.store') }}" method="POST">
                @csrf
                <div class="mb-3 row">
                    <label for="name" class="col-md-2 col-form-label">Nombre</label>
                    <div class="col-md-4">
                        <input type="text" name="name" id="name" class="form-control" required>
                    </div>
                    <label for="last_name" class="col-md-2 col-form-label">Apellido</label>
                    <div class="col-md-4">
                        <input type="text" name="last_name" id="last_name" class="form-control" required>
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="document_number" class="col-md-2 col-form-label">Cédula</label>
                    <div class="col-md-4">
                        <input type="text" name="document_number" id="document_number" class="form-control" required>
                    </div>
                    <label for="phone_number" class="col-md-2 col-form-label">Teléfono</label>
                    <div class="col-md-4">
                        <input type="text" name="phone_number" id="phone_number" class="form-control">
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="entry_time" class="col-md-2 col-form-label">Hora de entrada</label>
                    <div class="col-md-4">
                        <input type="datetime-local" name="entry_time" id="entry_time" class="form-control" required>
                    </div>
                    <label for="vehicle" class="col-md-2 col-form-label">Vehículo</label>
                    <div class="col-md-4">
                        <input type="text" name="vehicle" id="vehicle" class="form-control" required>
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="color" class="col-md-2 col-form-label">Color</label>
                    <div class="col-md-4">
                        <input type="text" name="color" id="color" class="form-control">
                    </div>
                    <label for="brand" class="col-md-2 col-form-label">Marca</label>
                    <div class="col-md-4">
                        <input type="text" name="brand" id="brand" class="form-control">
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="exit_time" class="col-md-2 col-form-label">Hora de salida</label>
                    <div class="col-md-4">
                        <input type="datetime-local" name="exit_time" id="exit_time" class="form-control">
                    </div>
                    <label for="plate" class="col-md-2 col-form-label">Placa</label>
                    <div class="col-md-4">
                        <input type="text" name="plate" id="plate" class="form-control">
                    </div>
                </div>
                <div class="text-center">
                    <button type="submit" class="btn btn-primary">Registrar</button>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection
