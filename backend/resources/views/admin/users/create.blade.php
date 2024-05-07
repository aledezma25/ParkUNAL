
```

@extends('layouts.app')

@section('content')

<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Registro de usuarios') }}</div>

                <div class="card-body">
                    <form action="{{ route('usuarios.store') }}" method="POST">
                        @csrf

                        <div class="mb-3 row">
                            <label for="name" class="col-md-4 col-form-label text-md-end">{{ __('Nombre') }}</label>
                            <div class="col-md-6">
                                <input type="text" name="name" id="name" placeholder="Nombre" class="form-control" required>
                            </div>
                        </div>

                        <div class="mb-3 row">
                            <label for="last_name" class="col-md-4 col-form-label text-md-end">{{ __('Apellido') }}</label>
                            <div class="col-md-6">
                                <input type="text" name="last_name" id="last_name" placeholder="Apellido" class="form-control" required>
                            </div>
                        </div>

                        <div class="mb-3 row">
                            <label for="document_number" class="col-md-4 col-form-label text-md-end">{{ __('Cédula') }}</label>
                            <div class="col-md-6">
                                <input type="text" name="document_number" id="document_number" placeholder="Cédula" class="form-control" required>
                            </div>
                        </div>

                        <div class="mb-3 row">
                            <label for="role_id" class="col-md-4 col-form-label text-md-end">{{ __('Rol') }}</label>
                            <div class="col-md-6">
                                <select name="role_id" id="role_id" class="form-control">
                                    <option value="">Seleccione un rol</option>
                                    @foreach ($roles as $role)
                                    <option value="{{ $role->id }}">{{ $role->name }}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="row mb-3">
                            <label for="address" class="col-md-4 col-form-label text-md-end">{{ __('Dirección') }}</label>
    
                            <div class="col-md-6">
                                <input type="text" name="address" id="address" placeholder="Dirección: "
                                    class="form-control">
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="phone_number"
                                class="col-md-4 col-form-label text-md-end">{{ __('Telefono') }}</label>
    
                            <div class="col-md-6">
                                <input type="text" name="phone_number" id="phone_number" placeholder="Telefono: "
                                    class="form-control">
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="email" class="col-md-4 col-form-label text-md-end">{{ __('Correo') }}</label>
    
                            <div class="col-md-6">
                                <input type="email" name="email" id="email" placeholder="Email: "
                                    class="form-control">
                            </div>
                        </div>
    
                        <div class="row mb-3">
                            <label for="password"
                                class="col-md-4 col-form-label text-md-end">{{ __('Contraseña') }}</label>
    
                            <div class="col-md-6">
                                <input type="password" name="password" id="password" placeholder="Contraseña: "
                                    class="form-control">
                            </div>
                        </div>
    
                        <div class="row mb-3">
                            <label for="password-confirm"
                                class="col-md-4 col-form-label text-md-end">{{ __('Confirmar Contraseña') }}</label>
    
                            <div class="col-md-6">
                                <input type="password" name="password_confirmation" id="password_confirmation"
                                    placeholder="Confirme su contraseña: " class="form-control">
                            </div>
                        </div>
                       
                </div>
                        <div class="mb-3 row">
                            <div class="col-md-6 offset-md-4">
                                <button type="submit" class="btn btn-primary">{{ __('Enviar') }}</button>
                                
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection
