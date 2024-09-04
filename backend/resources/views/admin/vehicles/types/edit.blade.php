@extends('layouts.app')

@section('content')
<div class="container mt-5" style="max-width: 800px;">
    <a href="{{ route('types.index') }}" class="btn btn-secondary mb-4" style="padding: 10px 20px; font-weight: bold; border-radius: 50px; background-color: #6c757d;">Regresar</a>
    
    <div class="text-center mb-4">
        <h1 style="font-weight: bold; color: #343a40;">Editar Tipo de Vehículo</h1>
    </div>
    
    <div class="card shadow-sm" style="border-radius: 10px; background-color: #f8f9fa;">
        <div class="card-body p-4">
            <form action="{{ route('types.update', $type->id) }}" method="POST" enctype="multipart/form-data">
                @csrf
                @method('PUT')
                
                <div class="mb-3 row">
                    <label for="name" class="col-md-4 col-form-label text-md-end" style="font-weight: bold; color: #495057;">Nombre</label>
                    <div class="col-md-6">
                        <input type="text" name="name" id="name" class="form-control" placeholder="Nombre: " value="{{ $type->name }}" style="border-radius: 8px; border-color: #ced4da;">
                    </div>
                </div>
                
                <div class="mb-3 row">
                    <label for="image" class="col-md-4 col-form-label text-md-end" style="font-weight: bold; color: #495057;">Imagen</label>
                    <div class="col-md-6">
                        <input type="file" name="image" id="image" class="form-control" style="border-radius: 8px; border-color: #ced4da;" placeholder="Adjuntar imagen del tipo de vehículo">
                    </div>
                </div>
                
                <div class="mb-3 row">
                    <label for="description" class="col-md-4 col-form-label text-md-end" style="font-weight: bold; color: #495057;">Descripción</label>
                    <div class="col-md-6">
                        <input type="text" name="description" id="description" class="form-control" placeholder="Descripción: " value="{{ $type->description }}" style="border-radius: 8px; border-color: #ced4da;">
                    </div>
                </div>

                <div class="mb-3 row">
                    <label for="spaces" class="col-md-4 col-form-label text-md-end" style="font-weight: bold; color: #495057;">Espacios</label>
                    <div class="col-md-6">
                        <input type="number" name="spaces" id="spaces" class="form-control" placeholder="Espacios: " value="{{ $type->spaces }}" style="border-radius: 8px; border-color: #ced4da;">
                    </div>
                </div>
                
                <div class="text-center mt-4">
                    <button type="submit" class="btn btn-success" style="padding: 10px 30px; font-size: 16px; border-radius: 50px;">Editar</button>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection
