@extends('layouts.app')

@section('content')
<div class="container mt-5" style="max-width: 800px;">
    <a href="{{ route('usuarios.index') }}" class="btn btn-secondary mb-4" style="padding: 10px 20px; font-weight: bold; border-radius: 50px; background-color: #6c757d;">Regresar</a>
    
    <div class="text-center mb-4">
        <h1 style="font-weight: bold; color: #343a40;">Editar usuario</h1>
    </div>
    
    <div class="card shadow-sm" style="border-radius: 10px; background-color: #f8f9fa;">
        <div class="card-body p-4">
            <form action="{{ route('usuarios.updateWeb', $user->id) }}" method="POST">
                @csrf
                @method('PUT')

                <div class="mb-3 row">
                    <label for="name" class="col-md-4 col-form-label text-md-end" style="font-weight: bold; color: #495057;">Nombre</label>
                    <div class="col-md-6">
                        <input type="text" name="name" id="name" class="form-control" placeholder="Nombre" value="{{ $user->name }}" style="border-radius: 8px; border-color: #ced4da;">
                    </div>
                </div>

                <div class="mb-3 row">
                    <label for="last_name" class="col-md-4 col-form-label text-md-end" style="font-weight: bold; color: #495057;">Apellido</label>
                    <div class="col-md-6">
                        <input type="text" name="last_name" id="last_name" class="form-control" placeholder="Apellido" value="{{ $user->last_name }}" style="border-radius: 8px; border-color: #ced4da;">
                    </div>
                </div>

                <div class="mb-3 row">
                    <label for="document_number" class="col-md-4 col-form-label text-md-end" style="font-weight: bold; color: #495057;">Cédula</label>
                    <div class="col-md-6">
                        <input type="text" name="document_number" id="document_number" class="form-control" placeholder="Cédula" value="{{ $user->document_number }}" style="border-radius: 8px; border-color: #ced4da;">
                    </div>
                </div>

                <div class="mb-3 row">
                    <label for="address" class="col-md-4 col-form-label text-md-end" style="font-weight: bold; color: #495057;">Dirección</label>
                    <div class="col-md-6">
                        <input type="text" name="address" id="address" class="form-control" placeholder="Dirección" value="{{ $user->address }}" style="border-radius: 8px; border-color: #ced4da;">
                    </div>
                </div>

                <div class="mb-3 row">
                    <label for="phone_number" class="col-md-4 col-form-label text-md-end" style="font-weight: bold; color: #495057;">Teléfono</label>
                    <div class="col-md-6">
                        <input type="text" name="phone_number" id="phone_number" class="form-control" placeholder="Teléfono" value="{{ $user->phone_number }}" style="border-radius: 8px; border-color: #ced4da;">
                    </div>
                </div>

                <div class="mb-3 row">
                    <label for="email" class="col-md-4 col-form-label text-md-end" style="font-weight: bold; color: #495057;">Correo</label>
                    <div class="col-md-6">
                        <input type="email" name="email" id="email" class="form-control" placeholder="Correo" value="{{ $user->email }}" style="border-radius: 8px; border-color: #ced4da;">
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
