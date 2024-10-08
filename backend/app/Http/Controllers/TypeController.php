<?php

namespace App\Http\Controllers;

use App\Exports\CategoriasExport;
use App\Models\Type;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use Barryvdh\DomPDF\Facade\Pdf as PDF;

class TypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $types = Type::all();
        return view('admin.vehicles.types.index', ["types" => $types]);
    }
    public function indexreact()
    {
        $types = Type::all();
        return response()->json($types);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view("admin.vehicles.types.create");
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $type = new Type();

        $type->name = $request->name;
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $destinationPath = 'imagenes/type/';
            $fileName = $file->getClientOriginalName(); // se crea variable para obtener el nombre, la funcion time sirve para que los nombres no se repitan
            $uploadSuccess = $request->file('image')->move($destinationPath, $fileName);
            $type->image = $destinationPath . $fileName;
        }
        $type->description = $request->description;
        $type->spaces = $request->spaces;
        $type->save();
        return redirect()->route('types.index')->with('success', 'type creado exitosamente!');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Type  $type
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $type = Type::find($id);
       return response()->json($type);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Type  $type
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $type = Type::find($id);
        return view("admin.vehicles.types.edit", ["type" => $type]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Type  $type
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $type = Type::find($id);
        $type->name = $request->name;
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $destinationPath = 'imagenes/type/';
            $fileName = $file->getClientOriginalName(); // se crea variable para obtener el nombre, la funcion time sirve para que los nombres no se repitan
            $uploadSuccess = $request->file('image')->move($destinationPath, $fileName);
            $type->image = $destinationPath . $fileName;
        }
        $type->description = $request->description;
        $type->spaces = $request->spaces;

        $type->save();
        return redirect()->route('types.index')->with('success', 'type editado exitosamente!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Type  $type
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $type = Type::find($id);
        $type -> delete();
        return redirect()->route('types.index')->with('success', 'type eliminado exitosamente!');
    }

    //Funcion para actualizar el espacio de un tipo de vehiculo
    public function updateSpaces(Request $request, $id)
    {
        $type = Type::find($id);
        $type->spaces = $request->spaces;
        $type->save();
        return response()->json($type);
    }
    
}
