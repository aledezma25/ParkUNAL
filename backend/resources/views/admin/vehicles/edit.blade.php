@extends('layouts.app')

@section('content')
<div class="container">
    <a href="/administrador" class="btn btn-primary">Regresar</a>
    <br><br>
    <h2>Editar Vehículo</h2>
    <form action="{{ route('vehicles.update', $vehicle->id) }}" method="POST">
        @csrf
        @method('PUT')

        <div class="mb-3 row">
            <label for="mark" class="col-md-4 col-form-label text-md-end">{{ __('Marca') }}</label>
            <div class="col-md-6">
                <input type="text" name="mark" id="mark" placeholder="Marca" class="form-control" value="{{ $vehicle->mark }}" required>
            </div>
        </div>

        <div class="mb-3 row">
            <label for="color" class="col-md-4 col-form-label text-md-end">{{ __('Color') }}</label>
            <div class="col-md-6">
                <input type="text" name="color" id="color" placeholder="Color" class="form-control" value="{{ $vehicle->color }}" required>
            </div>
        </div>

        <div class="mb-3 row">
            <label for="plate" class="col-md-4 col-form-label text-md-end">{{ __('Placa') }}</label>
            <div class="col-md-6">
                <input type="text" name="plate" id="plate" placeholder="Placa" class="form-control" value="{{ $vehicle->plate }}" required>
            </div>
        </div>

        <div class="mb-3 row">
            <label for="idTypes" class="col-md-4 col-form-label text-md-end">{{ __('Tipo de Vehículo') }}</label>
            <div class="col-md-6">
                <select name="idTypes" id="idTypes" class="form-control">
                    <option value="">Seleccione un tipo</option>
                    @foreach ($types as $type)
                    <option value="{{ $type->id }}" {{ $type->id == $vehicle->idTypes ? 'selected' : '' }}>{{ $type->name }}</option>
                    @endforeach
                </select>
            </div>
        </div>

        <div class="mb-3 row">
            <div class="col-md-6 offset-md-4">
                <button type="submit" class="btn btn-primary">{{ __('Actualizar') }}</button>
            </div>
        </div>
    </form>
</div>
@endsection
