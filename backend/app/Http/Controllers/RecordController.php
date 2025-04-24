<?php

namespace App\Http\Controllers;

use App\Models\Record;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Support\Facades\Auth;

class RecordController extends Controller
{
    public function index()
    {
        return json_decode(Record::all(), true);
    }

    public function store(Request $request)
    {
        // Obtén la información del usuario y del vehículo
        $user = User::find($request->user_id);
        $vehicle = Vehicle::find($request->vehicle_id);

        // Crear el nuevo registro
        $record = new Record();
        $record->entryDate = now()->toDateString(); // Puedes usar la fecha actual
        $record->entryTime = now()->toTimeString(); // La hora actual
        $record->idUser = $user->id; // Aquí usas la columna idUser
        $record->idVehicle = $vehicle->id; // Relación con el vehículo
        $record->nameAdmin = Auth::user()->name; // Puedes obtener el nombre del administrador

        // Guarda el registro
        $record->save();

        return redirect()->route('home')->with('success', 'Registro creado con éxito.');
    }



    public function edit($id)
    {
        $record = Record::findOrFail($id);
        $users = User::all();
        $vehicles = Vehicle::all();
        return view('admin.records.edit', compact('record', 'users', 'vehicles'));
    }

    public function update(Request $request, $id)
    {
        $record = Record::findOrFail($id);
        $record->update([
            'idUser' => $request->user_id,
            'idVehicle' => $request->vehicle_id,
            'entryTime' => $request->entryTime,
            'entryDate' => $request->entryDate,
            'exitTime' => $request->exitTime,
            'nameAdmin' => $request->nameAdmin,
        ]);
    
        return redirect()->route('home')->with('success', 'Registro actualizado correctamente.');
    }
    


    public function show($id)
    {
        return Record::find($id);
    }

    // public function update(Request $request, $id)
    // {
    //     $record = Record::find($id);
    //     $record->entryDate = $request->entryDate;
    //     $record->exitDate = $request->exitDate;
    //     $record->entryTime = $request->entryTime;
    //     $record->exitTime = $request->exitTime;
    //     $record->idVehicle = $request->idVehicle;
    //     $record->idUser = $request->idUser;
    //     $record->nameAdmin = $request->nameAdmin;
    //     $record->save();
    //     return json_decode($record, true);
    // }

    public function destroy($id)
    {
        $record = Record::find($id);
        $record->delete();
        return redirect('/home')->with('success', 'Registro eliminado correctamente.');
    }

    public function lastRecord($id)
    {
        //ultimo record de un vehiculo
        $record = Record::where('idVehicle', $id)->orderBy('id', 'desc')->first();
        return json_decode($record, true);
    }

    public function create(Request $request)
    {
        $vehicles = null;
        $user = null;

        if ($request->has('document_number')) {
            $user = User::where('document_number', $request->input('document_number'))->first();

            if ($user) {
                $vehicles = Vehicle::where('idUser', $user->id)->get();
            }
        }

        return view('admin.records.create', compact('user', 'vehicles')); // Asegúrate de que sea create
    }



    public function getUserVehicles($document)
    {
        // Buscar el usuario por el número de documento
        $user = User::where('document_number', $document)->first();

        // Verificar si el usuario existe
        if ($user) {
            // Obtener los vehículos asociados a ese usuario
            $vehicles = $user->vehicles; // Asegúrate de que la relación 'vehicles' esté definida en el modelo User
            return response()->json($vehicles);
        }

        // Si no se encuentra el usuario, retornar un error
        return response()->json(['error' => 'Usuario no encontrado'], 404);
    }
}
