<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use Illuminate\Http\Request;
use App\Models\Type;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\ProductosExport;
use Barryvdh\DomPDF\Facade\Pdf as PDF;

class VehicleController extends Controller
{ 
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $vehicles = Vehicle::all();
        $types = Type::all();
        return view('admin.vehicles.index', ["vehicles" => $vehicles, "types" => $types]);
    }
    public function indexreact()
    {
        $vehicles = Vehicle::all();
        return response()->json($vehicles);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $types = Type::all();
        return view('admin.vehicles.create', ["types" => $types]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $vehicle = new Vehicle();

        //dd($request->hasFile('image'));
        $vehicle->mark = $request->mark;
        $vehicle->idTypes = $request->idTypes;
        $vehicle->idUser = $request->idUser;
        $vehicle->color = $request->color;
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $destinationPath = 'imagenes/vehicle/';
            $fileName = $file->getClientOriginalName(); // se crea variable para obtener el nombre, la funcion time sirve para que los nombres no se repitan
            $uploadSuccess = $request->file('image')->move($destinationPath, $fileName);
            $vehicle->image = $destinationPath . $fileName;
        }
        $vehicle->plate = $request->plate;

        $vehicle->save();
        //retornar mensaje de exito json
        return json_encode(["success" => true, "message" => "Vehiculo creado exitosamente!"]);
    
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Vehile  $vehicle
     * @return \Illuminate\Http\Response
     */
   // vehiculo por id
    public function show($id)
    {
        $vehicle = Vehicle::find($id);
        return response()->json($vehicle);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Vehicle  $vehicle
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $vehicle = Vehicle::find($id);
        $types = Type::all();
        return view('admin.vehicles.edit', ["vehicle" => $vehicle, "types" => $types]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Vehicle  $vehicle
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $vehicle = Vehicle::find($id);
        $vehicle->mark = $request->mark;
        $vehicle->idTypes = $request->idTypes;
        $vehicle->idUser = $request->idUser;
        $vehicle->color = $request->color;
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $destinationPath = 'imagenes/vehicles/';
            $fileName = $file->getClientOriginalName(); // se crea variable para obtener el nombre, la funcion time sirve para que los nombres no se repitan
            $uploadSuccess = $request->file('image')->move($destinationPath, $fileName);
            $vehicle->image = $destinationPath . $fileName;
        }
        $vehicle->plate = $request->plate;

        $vehicle->save();
        return json_encode(["success" => true, "message" => "Vehiculo editado exitosamente!"]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Vehicle  $vehicle
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $vehicle = Vehicle::find($id);
        $vehicle->delete();
        return json_encode(["success" => true, "message" => "Vehiculo eliminado exitosamente!"]);
    }

 
}
