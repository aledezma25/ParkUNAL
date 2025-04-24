<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Vehicle;
use App\Models\Visitor;
use Illuminate\Http\Request;

class VisitorController extends Controller
{
    // Vista para registrar visitantes

    public function registervisited()
    {
        $users = User::all();
        $vehicles = Vehicle::all();
        $visitors = Visitor::all(); // Trae los registros de la base de datos local
        return view('admin.visitors.index', compact('users', 'vehicles', 'visitors'));
    }


    // Vista para crear un nuevo visitante
    public function storevisited()
    {
        $users = User::all();
        $vehicles = Vehicle::all();
        return view('admin.visitors.create', compact('users', 'vehicles'));
    }

    public function edit($id)
    {
        $visitor = Visitor::findOrFail($id);
        return view('admin.visitors.edit', compact('visitor'));
    }

    public function update(Request $request, $id)
    {
        $visitor = Visitor::findOrFail($id);
        $visitor->update($request->all());

        return redirect('/visitors')->with('success', 'Visitante actualizado correctamente.');
    }

    public function destroy($id)
    {
        // Intentamos encontrar el visitante con el ID dado
        $visitor = Visitor::find($id);
    
        // Si existe, lo eliminamos
        $visitor->delete();

        // redirigimos a la vista de registros con un mensaje de éxito
        return redirect('/visitors')->with('success', 'Visitante eliminado correctamente.');
    }
    



    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'documentNumber' => 'required|string|max:20',
            'phone' => 'nullable|string|max:20',
            'entryDate' => 'required|date',
            'typeVehicle' => 'required|string|max:50',
            'color' => 'nullable|string|max:50',
            'mark' => 'nullable|string|max:50',
            'exitDate' => 'nullable|date',
            'plate' => 'nullable|string|max:20',
        ]);

        Visitor::create($request->all());

        return redirect('/visitors')->with('success', 'Visitante registrado correctamente');
    }
}
