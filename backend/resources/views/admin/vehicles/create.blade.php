@extends('layouts.app')

@section('content')
<div class="container mt-5" style="max-width: 800px;">
    <a href="/administrador" class="btn btn-secondary mb-4" style="padding: 10px 20px; font-weight: bold; border-radius: 50px; background-color: #6c757d;">Regresar</a>
    <div class="text-center mb-4">
        <h1 style="font-family: 'Arial', sans-serif; font-weight: bold; color: #343a40;">Registrar nuevo Vehículos</h1>
    </div>

    <div class="card shadow-sm" style="border-radius: 10px; background-color: #f8f9fa;">
        <div class="card-body p-4">
            <form action="{{ route('vehicles.storeWeb') }}" method="POST">
                @csrf

                <div class="mb-3 row">
                    <label for="mark" class="col-md-4 col-form-label text-md-end" style="font-weight: bold; color: #495057;">Marca</label>
                    <div class="col-md-6">
                        <input type="text" name="mark" id="mark" placeholder="Marca" class="form-control" style="border-radius: 8px; border-color: #ced4da;" required>
                    </div>
                </div>

                <div class="mb-3 row">
                    <label for="color" class="col-md-4 col-form-label text-md-end" style="font-weight: bold; color: #495057;">Color</label>
                    <div class="col-md-6">
                        <input type="text" name="color" id="color" placeholder="Color" class="form-control" style="border-radius: 8px; border-color: #ced4da;" required>
                    </div>
                </div>

                <div class="mb-3 row">
                    <label for="plate" class="col-md-4 col-form-label text-md-end" style="font-weight: bold; color: #495057;">Placa</label>
                    <div class="col-md-6">
                        <input type="text" name="plate" id="plate" placeholder="Placa" class="form-control" style="border-radius: 8px; border-color: #ced4da;" required>
                    </div>
                </div>

                <div class="mb-3 row">
                    <label for="idTypes" class="col-md-4 col-form-label text-md-end" style="font-weight: bold; color: #495057;">Tipo de Vehículo</label>
                    <div class="col-md-6">
                        <select name="idTypes" id="idTypes" class="form-control" style="border-radius: 8px; border-color: #ced4da;">
                            <option value="">Seleccione un tipo</option>
                            @foreach ($types as $type)
                            <option value="{{ $type->id }}">{{ $type->name }}</option>
                            @endforeach
                        </select>
                    </div>
                </div>

                <div class="mb-3 row">
                    <div class="col-md-6 offset-md-4">
                        <button type="submit" class="btn btn-success" style="padding: 10px 30px; font-size: 16px; border-radius: 50px;">Registrar</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection
