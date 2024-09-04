<?php

namespace App\Http\Controllers;
 
use App\Models\Vehicle;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Http;


class VisitorController extends Controller
{
    // funcion para ir a la vista de registrar visitantes
    public function registervisited()
    
    {
        $users = User::all();
        $vehicles = Vehicle::all();
        return view('admin.records.index', compact('users', 'vehicles'));
    }

    //funcion para ir a la vista de registrar visitantes
    public function storevisited()
    {
        $users = User::all();
        $vehicles = Vehicle::all();
        return view('admin.records.create', compact('users', 'vehicles'));
    }
    // Mostrar el formulario para editar un visitante
    public function edit($id)
    {
        // URL del microservicio para obtener el visitante
        $url = "http://localhost:3000/obtenerVisitor/{$id}";

        // Hacer una solicitud GET al microservicio
        $response = Http::get($url);

        if ($response->successful()) {
            $visitor = $response->json();
            $users = User::all();
            $vehicles = Vehicle::all();
            
            return view('admin.records.edit', compact('visitor', 'users', 'vehicles'));
        } else {
            return redirect()->route('records.index')->withErrors('No se pudo encontrar el visitante.');
        }
    }

    // Actualizar el registro de un visitante
    public function update(Request $request, $id)
    {
        // URL del microservicio para actualizar
        $url = "http://localhost:3000/actualizarVisitor/{$id}";

        // Hacer una solicitud PUT al microservicio
        $response = Http::put($url, $request->all());

        if ($response->successful()) {
            return redirect()->route('records.index')->with('status', 'Visitante actualizado correctamente.');
        } else {
            return redirect()->route('records.index')->withErrors('Error al actualizar el visitante.');
        }
    }

}

