@extends('layouts.app')

@section('content')
{{-- Registro manual --}}
<div class="container">
    <a href="/administrador" class="btn btn-primary">Regresar</a>
    <div class="text-center">
        <h1>Registro de Vehículos</h1>
    </div>

    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-body">
                    <form action="{{ route('vehicles.store') }}" method="POST">
                        @csrf

                        <div class="mb-3 row">
                            <label for="mark" class="col-md-4 col-form-label text-md-end">{{ __('Marca') }}</label>
                            <div class="col-md-6">
                                <input type="text" name="mark" id="mark" placeholder="Marca" class="form-control" required>
                            </div>
                        </div>

                        <div class="mb-3 row">
                            <label for="color" class="col-md-4 col-form-label text-md-end">{{ __('Color') }}</label>
                            <div class="col-md-6">
                                <input type="text" name="color" id="color" placeholder="Color" class="form-control" required>
                            </div>
                        </div>

                        <div class="mb-3 row">
                            <label for="plate" class="col-md-4 col-form-label text-md-end">{{ __('Placa') }}</label>
                            <div class="col-md-6">
                                <input type="text" name="plate" id="plate" placeholder="Placa" class="form-control" required>
                            </div>
                        </div>

                        <div class="mb-3 row">
                            <label for="idTypes" class="col-md-4 col-form-label text-md-end">{{ __('Tipo de Vehículo') }}</label>
                            <div class="col-md-6">
                                <select name="idTypes" id="idTypes" class="form-control">
                                    <option value="">Seleccione un tipo</option>
                                    @foreach ($types as $type)
                                    <option value="{{ $type->id }}">{{ $type->name }}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="mb-3 row">
                            <div class="col-md-6 offset-md-4">
                                <button type="submit" class="btn btn-primary">{{ __('Registrar') }}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
