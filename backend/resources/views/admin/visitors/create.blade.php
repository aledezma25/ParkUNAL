@extends('layouts.app')
@section('content')


<div class="container my-5 p-4" style="background-color: #f9f9f9; border-radius: 10px;">
    <a href="/visitors" class="btn btn-secondary mb-4" style="padding: 10px 20px; font-weight: bold; border-radius: 50px;">Regresar</a>
    <div class="text-center mb-4">
        <h1 style="font-family: 'Helvetica', sans-serif; font-weight: bold; color: #444;">Registro de Entrada de Visitantes</h1>
    </div>
    <div class="card" style="border: none; border-radius: 12px; box-shadow: 0 3px 12px rgba(0, 0, 0, 0.1);">
        <div class="card-body p-4">
            <form action="{{ route('visitors.store') }}" method="POST">
                @csrf
            
                <div class="mb-3 row">
                    <label for="name" class="col-md-2 col-form-label" style="font-weight: bold; color: #555;">Nombre</label>
                    <div class="col-md-4">
                        <input type="text" name="name" id="name" class="form-control" placeholder="Nombre" style="border-radius: 8px; border-color: #ccc;" required>
                    </div>
                    <label for="lastName" class="col-md-2 col-form-label" style="font-weight: bold; color: #555;">Apellido</label>
                    <div class="col-md-4">
                        <input type="text" name="lastName" id="lastName" class="form-control" placeholder="Apellido" style="border-radius: 8px; border-color: #ccc;" required>
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="documentNumber" class="col-md-2 col-form-label" style="font-weight: bold; color: #555;">Cédula</label>
                    <div class="col-md-4">
                        <input type="text" name="documentNumber" id="documentNumber" class="form-control" placeholder="Cédula" style="border-radius: 8px; border-color: #ccc;" required>
                    </div>
                    <label for="phone" class="col-md-2 col-form-label" style="font-weight: bold; color: #555;">Teléfono</label>
                    <div class="col-md-4">
                        <input type="text" name="phone" id="phone" class="form-control" placeholder="Teléfono" style="border-radius: 8px; border-color: #ccc;">
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="entryDate" class="col-md-2 col-form-label" style="font-weight: bold; color: #555;">Hora de entrada</label>
                    <div class="col-md-4">
                        <input type="datetime-local" name="entryDate" id="entryDate" class="form-control" style="border-radius: 8px; border-color: #ccc;" required>
                    </div>
                    <label for="typeVehicle" class="col-md-2 col-form-label" style="font-weight: bold; color: #555;">Vehículo</label>
                    <div class="col-md-4">
                        <input type="text" name="typeVehicle" id="typeVehicle" class="form-control" placeholder="Tipo de Vehículo" style="border-radius: 8px; border-color: #ccc;" required>
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="color" class="col-md-2 col-form-label" style="font-weight: bold; color: #555;">Color</label>
                    <div class="col-md-4">
                        <input type="text" name="color" id="color" class="form-control" placeholder="Color" style="border-radius: 8px; border-color: #ccc;">
                    </div>
                    <label for="mark" class="col-md-2 col-form-label" style="font-weight: bold; color: #555;">Marca</label>
                    <div class="col-md-4">
                        <input type="text" name="mark" id="mark" class="form-control" placeholder="Marca" style="border-radius: 8px; border-color: #ccc;">
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="exitDate" class="col-md-2 col-form-label" style="font-weight: bold; color: #555;">Hora de salida</label>
                    <div class="col-md-4">
                        <input type="datetime-local" name="exitDate" id="exitDate" class="form-control" style="border-radius: 8px; border-color: #ccc;">
                    </div>
                    <label for="plate" class="col-md-2 col-form-label" style="font-weight: bold; color: #555;">Placa</label>
                    <div class="col-md-4">
                        <input type="text" name="plate" id="plate" class="form-control" placeholder="Placa" style="border-radius: 8px; border-color: #ccc;">
                    </div>
                </div>
                <div class="text-center mt-4">
                    <button type="submit" class="btn btn-primary" style="background-color: #28a745; border-color: #28a745; padding: 10px 30px; border-radius: 50px; font-size: 16px;">Registrar</button>
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
