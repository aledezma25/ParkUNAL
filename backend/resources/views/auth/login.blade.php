@extends('layouts.app')

@section('content')
<div class="container d-flex flex-column justify-content-center align-items-center" style="min-height: 100vh;">
    <div class="row justify-content-center w-100">
        <div class="col-md-6">
            <div class="card shadow-lg border-0 rounded-3">
                <div class="card-header text-center" style="background-color: #2d3748; color: #fff; font-size: 1.5rem; font-weight: bold;">
                    {{ __('Inicio de Sesión') }}
                </div>

                <div class="card-body">
                    <form method="POST" action="{{ route('login') }}">
                        @csrf

                        <!-- Campo Email -->
                        <div class="mb-3">
                            <label for="email" class="form-label">{{ __('Correo') }}</label>
                            <input id="email" type="email" 
                                   class="form-control @error('email') is-invalid @enderror" 
                                   name="email" value="{{ old('email') }}" 
                                   required autocomplete="email" autofocus>
                            @error('email')
                                <div class="invalid-feedback">
                                    <strong>{{ $message }}</strong>
                                </div>
                            @enderror
                        </div>

                        <!-- Campo Contraseña -->
                        <div class="mb-3">
                            <label for="password" class="form-label">{{ __('Contraseña') }}</label>
                            <input id="password" type="password" 
                                   class="form-control @error('password') is-invalid @enderror" 
                                   name="password" required autocomplete="current-password">
                            @error('password')
                                <div class="invalid-feedback">
                                    <strong>{{ $message }}</strong>
                                </div>
                            @enderror
                        </div>

                        <!-- Checkbox Recordar -->
                        <div class="mb-3 form-check">
                            <input class="form-check-input" type="checkbox" 
                                   name="remember" id="remember" 
                                   {{ old('remember') ? 'checked' : '' }}>
                            <label class="form-check-label" for="remember">
                                {{ __('Recordar la contraseña') }}
                            </label>
                        </div>

                        <!-- Botones -->
                        <div class="d-flex justify-content-between align-items-center">
                            <button type="submit" class="btn btn-primary w-100">
                                {{ __('Ingresar') }}
                            </button>
                        </div>
                        
                        {{-- @if (Route::has('password.request'))
                            <div class="mt-2 text-center">
                                <a class="btn btn-link" href="{{ route('password.request') }}">
                                    {{ __('¿Olvidaste tu contraseña?') }}
                                </a>
                            </div>
                        @endif --}}
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    /* Estilo General */
    body {
        background-color: #f5f5f5; /* Fondo claro */
        font-family: 'Nunito', sans-serif;
    }

    /* Estilos para el contenedor del formulario */
    .card {
        border-radius: 15px; /* Bordes redondeados */
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); /* Sombra */
    }

    /* Titulo de la card */
    .card-header {
        background-color: #2d3748; /* Fondo oscuro */
        color: #fff; /* Texto blanco */
        font-size: 1.5rem;
        font-weight: bold;
    }

    .form-label {
        color: #2d3748;
        font-weight: 500;
    }

    .form-control {
        border-radius: 5px;
        border: 1px solid #ced4da;
        padding: 0.8rem;
    }

    .form-control:focus {
        border-color: #94b43b;
        box-shadow: 0 0 5px rgba(122, 162, 50, 0.5); /* Sombra verde */
    }

    .btn-primary {
        background-color: #94b43b;
        border-color: #7aa232;
        border-radius: 5px;
        padding: 0.75rem;
        font-size: 1.1rem;
        transition: background-color 0.3s ease-in-out, transform 0.2s;
    }

    .btn-primary:hover {
        background-color: #7aa232;
        transform: scale(1.05);
    }

    .btn-link {
        color: #94b43b;
        font-size: 0.9rem;
        text-decoration: none;
    }

    .btn-link:hover {
        color: #7aa232;
    }

    /* Ajustes para dispositivos móviles */
    @media (max-width: 576px) {
        .card {
            width: 90%;
        }
    }
</style>
@endsection
