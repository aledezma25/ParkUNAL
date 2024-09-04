@extends('layouts.app')

@section('content')
<div class="container mt-5" style="max-width: 800px;">
    <a href="/usuarios" class="btn btn-secondary mb-4" style="padding: 10px 20px; font-weight: bold; border-radius: 50px; background-color: #6c757d;">Regresar</a>
    <div class="text-center mb-4">
        <h1 style="font-family: 'Arial', sans-serif; font-weight: bold; color: #343a40;">Registrar un nuevo usuarios</h1>
    </div>
    <div class="card shadow-sm" style="border-radius: 10px; background-color: #f8f9fa;">
        <div class="card-body p-4">
                    <form action="{{ route('usuarios.storeWeb') }}" method="POST">
                        @csrf

                        <div class="mb-3 row">
                            <label for="name" class="col-md-4 col-form-label text-md-end" style="font-weight: bold; color: #495057;">Nombre</label>
                            <div class="col-md-6">
                                <input type="text" name="name" id="name" placeholder="Nombre" class="form-control" style="border-radius: 8px; border-color: #ced4da;" required>
                            </div>
                        </div>

                        <div class="mb-3 row">
                            <label for="last_name" class="col-md-4 col-form-label text-md-end" style="font-weight: bold; color: #495057;">Apellido</label>
                            <div class="col-md-6">
                                <input type="text" name="last_name" id="last_name" placeholder="Apellido" class="form-control" style="border-radius: 8px; border-color: #ced4da;" required>
                            </div>
                        </div>

                        <div class="mb-3 row">
                            <label for="document_number" class="col-md-4 col-form-label text-md-end" style="font-weight: bold; color: #495057;">Cédula</label>
                            <div class="col-md-6">
                                <input type="text" name="document_number" id="document_number" placeholder="Cédula" class="form-control" style="border-radius: 8px; border-color: #ced4da;" required>
                            </div>
                        </div>

                        <div class="mb-3 row">
                            <label for="role_id" class="col-md-4 col-form-label text-md-end" style="font-weight: bold; color: #495057;">Rol</label>
                            <div class="col-md-6">
                                <select name="role_id" id="role_id" class="form-control" style="border-radius: 8px; border-color: #ced4da;">
                                    <option value="">Seleccione un rol</option>
                                    @foreach ($roles as $role)
                                    <option value="{{ $role->id }}">{{ $role->name }}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="mb-3 row">
                            <label for="address" class="col-md-4 col-form-label text-md-end" style="font-weight: bold; color: #495057;">Dirección</label>
                            <div class="col-md-6">
                                <input type="text" name="address" id="address" placeholder="Dirección" class="form-control" style="border-radius: 8px; border-color: #ced4da;">
                            </div>
                        </div>

                        <div class="mb-3 row">
                            <label for="phone_number" class="col-md-4 col-form-label text-md-end" style="font-weight: bold; color: #495057;">Teléfono</label>
                            <div class="col-md-6">
                                <input type="text" name="phone_number" id="phone_number" placeholder="Teléfono" class="form-control" style="border-radius: 8px; border-color: #ced4da;">
                            </div>
                        </div>

                        <div class="mb-3 row">
                            <label for="email" class="col-md-4 col-form-label text-md-end" style="font-weight: bold; color: #495057;">Correo</label>
                            <div class="col-md-6">
                                <input type="email" name="email" id="email" placeholder="Correo" class="form-control" style="border-radius: 8px; border-color: #ced4da;">
                            </div>
                        </div>

                        <div class="mb-3 row">
                            <label for="password" class="col-md-4 col-form-label text-md-end" style="font-weight: bold; color: #495057;">Contraseña</label>
                            <div class="col-md-6">
                                <input type="password" name="password" id="password" placeholder="Contraseña" class="form-control" style="border-radius: 8px; border-color: #ced4da;">
                            </div>
                        </div>

                        <div class="mb-3 row">
                            <label for="password_confirmation" class="col-md-4 col-form-label text-md-end" style="font-weight: bold; color: #495057;">Confirmar Contraseña</label>
                            <div class="col-md-6">
                                <input type="password" name="password_confirmation" id="password_confirmation" placeholder="Confirme su contraseña" class="form-control" style="border-radius: 8px; border-color: #ced4da;">
                            </div>
                        </div>

                        <div class="mb-3 row">
                            <div class="col-md-6 offset-md-4 text-center"> 
                                <button type="submit" class="btn btn-success" style="padding: 10px 30px; font-size: 16px; border-radius: 50px;">Registrar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
