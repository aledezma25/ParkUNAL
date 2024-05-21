<?php

namespace App\Http\Controllers;

use App\Models\Record;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Vehicle;


class RecordController extends Controller
{
    public function index()
    {
       return json_decode(Record::all(), true);
    }

    public function store(Request $request)
    {
        $record = new Record();
        $record->entryDate = $request->entryDate;
        $record->exitDate = $request->exitDate;
        $record->entryTime = $request->entryTime;
        $record->exitTime = $request->exitTime;
        $record->idVehicle = $request->idVehicle;
        $record->idUser = $request->idUser;
        $record->nameAdmin = $request->nameAdmin;
        $record->save();
        return json_decode($record, true);


    }

    public function show($id)
    {
        return Record::find($id);
    }

    public function update(Request $request, $id)
    {
        $record = Record::find($id);
        $record->entryDate = $request->entryDate;
        $record->exitDate = $request->exitDate;
        $record->entryTime = $request->entryTime;
        $record->exitTime = $request->exitTime;
        $record->idVehicle = $request->idVehicle;
        $record->idUser = $request->idUser;
        $record->nameAdmin = $request->nameAdmin;
        $record->save();
        return json_decode($record, true);
        
    }

    public function destroy($id)
    {
        $record = Record::find($id);
        $record->delete();
        return redirect('/home');
    }

    public function lastRecord($id)
    {
        //ultimo record de un vehiculo
        $record = Record::where('idVehicle', $id)->orderBy('id', 'desc')->first();
        return json_decode($record, true);
    }
    
}