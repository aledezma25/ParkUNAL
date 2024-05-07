<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
    <title>Editar Tipo</title>
</head>

<body>
    <div class="container">
        <a href="{{ route('types.index') }}" class="btn btn-primary">Regresar</a>
        <div class="container text-center">
            <h2>Editar Tipo de vehiculo </h2>
            <div class="card-body">
                <form action="{{ route('types.update', $type->id) }}" method="POST"
                    enctype="multipart/form-data">
                    @csrf
                    @method('PUT')
                    <div class="row mb-3">
                        <label for="name" class="col-md-4 col-form-label text-md-end">{{ __('Nombre') }}</label>

                        <div class="col-md-6">
                            <input type="text" name="name" id="name" placeholder="Nombre: "
                                class="form-control" value="{{ $type->name }}">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="image" class="col-md-4 col-form-label text-md-end">{{ __('Imagen') }}</label>

                        <div class="col-md-6">
                            <input type="file" name="image" id="image"
                                class="appearence-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline form-control"
                                placeholder="Adjuntar imagen del tipo de vehículo">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="description" class="col-md-4 col-form-label text-md-end">{{ __('Descripción') }}</label>
                        <div class="col-md-6">
                            <input type="text" name="description" id="description" placeholder="Descripción: "
                                class="form-control" value="{{ $type->description }}">
                        </div>
                    </div>
                    <br>
                    <button type="submit" class="btn btn-primary">Editar</button>
                    <br><br>
                </form>
            </div>
        </div>
    </div>
</body>

</html>
