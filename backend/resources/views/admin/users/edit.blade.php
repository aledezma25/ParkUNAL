<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
    <title>Editar Usuarios</title>
</head>

<body>
    <div class="container">
        <a href="{{ route('usuarios.index') }}" class="btn btn-primary">Regresar</a>
        <div class="text-center">
            <h2>Editar usuario </h2>
            <div class="card-body">
                <form action="{{ route('usuarios.update', $user->id) }}" method="POST">
                    @csrf
                    @method('PUT')
                    <div class="row mb-3">
                        <label for="name" class="col-md-4 col-form-label text-md-end">{{ __('Nombre') }}</label>

                        <div class="col-md-6">
                            <input type="text" name="name" id="name" placeholder="Nombre: "
                                class="form-control" value="{{ $user->name }}">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="last_name" class="col-md-4 col-form-label text-md-end">{{ __('Apellido') }}</label>

                        <div class="col-md-6">
                            <input type="text" name="last_name" id="last_name" placeholder="Apellido: "
                                class="form-control" value="{{ $user->last_name }}">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="document_number"
                            class="col-md-4 col-form-label text-md-end">{{ __('Cédula') }}</label>

                        <div class="col-md-6">
                            <input type="text" name="document_number" id="document_number" placeholder="Cédula: "
                                class="form-control" value="{{ $user->document_number }}">
                        </div>
                    </div>
            </div>
            <div class="row mb-3">
                <label for="address" class="col-md-4 col-form-label text-md-end">{{ __('Dirección') }}</label>

                <div class="col-md-6">
                    <input type="text" name="address" id="address" placeholder="Dirección: " class="form-control"
                        value="{{ $user->address }}">
                </div>
            </div>
            <div class="row mb-3">
                <label for="phone_number" class="col-md-4 col-form-label text-md-end">{{ __('Telefono') }}</label>

                <div class="col-md-6">
                    <input type="text" name="phone_number" id="phone_number" placeholder="Telefono: "
                        class="form-control" value="{{ $user->phone_number }}">
                </div>
            </div>
            <div class="row mb-3">
                <label for="email" class="col-md-4 col-form-label text-md-end">{{ __('Correo') }}</label>

                <div class="col-md-6">
                    <input type="email" name="email" id="email" placeholder="Email: " class="form-control"
                        value="{{ $user->email }}">
                </div>
            </div>
            <br>
            <button type="submit" class="btn btn-primary">Editar</button>
            </form>
        </div>
    </div>
    </div>

</body>

</html>
