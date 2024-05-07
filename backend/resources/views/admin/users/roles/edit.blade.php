@extends('layouts.app')

@section('content')
    <div class="container">
        <a href="{{ route('roles.index') }}" class="btn btn-primary">Regresar</a>
        <div class="container text-center">
            <h2>Editar categoria </h2>
            <div class="card-body">
                <form action="{{ route('roles.update', $role->id) }}" method="POST" enctype="multipart/form-data">
                    @csrf
                    @method('PUT')
                    <div class="row mb-3">
                        <label for="name" class="col-md-4 col-form-label text-md-end">{{ __('Nombre') }}</label>

                        <div class="col-md-6">
                            <input type="text" name="name" id="name" placeholder="Nombre: "
                                class="form-control" value="{{ $role->name }}">
                        </div>
                    </div>
            </div>
            <br>
            <button type="submit" class="btn btn-primary">Editar</button>
            <br><br>
            </form>
        </div>
    </div>


@endsection
