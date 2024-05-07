<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Qrcode;
use App\Models\Record;
use App\Models\Vehicle;
use App\Models\Type;
use Illuminate\Support\Facades\DB;

class QrcodeController extends Controller
{
    public function index()
    {
        $qrcodes = Qrcode::all();
        return view('qrcodes.index', compact('qrcodes'));
    }

    public function create()
    {
        return view('qrcodes.create');
    }

    public function store(Request $request)
    {
        $qrcode = new Qrcode();
        $qrcode->image = $request->image;
        $qrcode->idVehicle = $request->idVehicle;
        $qrcode->save();
        return redirect()->route('qrcodes.index');
    }

    public function show($id)
    {
        $qrcode = Qrcode::find($id);
        return view('qrcodes.show', compact('qrcode'));
    }

    public function edit($id)
    {
        $qrcode = Qrcode::find($id);
        return view('qrcodes.edit', compact('qrcode'));
    }

    public function update(Request $request, $id)
    {
        $qrcode = Qrcode::find($id);
        $qrcode->image = $request->image;
        $qrcode->idVehicle = $request->idVehicle;
        $qrcode->save();
        return redirect()->route('qrcodes.index');
    }

    public function destroy($id)
    {
        $qrcode = Qrcode::find($id);
        $qrcode->delete();
        return redirect()->route('qrcodes.index');
    }

    public function scan($id)
    {
        $qrcode = Qrcode::find($id);
        return view('qrcodes.scan', compact('qrcode'));
    }

    public function scanResult(Request $request)
    {
        $qrcode = Qrcode::where('name', $request->name)->first();
        if ($qrcode) {
            $vehicle = Vehicle::where('idQrcodes', $qrcode->id)->first();
            if ($vehicle) {
                $type = Type::find($vehicle->idTypes);
                $record = new Record();
                $record->idVehicles = $vehicle->id;
                $record->entry = date('Y-m-d H:i:s');
                $record->save();
                return view('qrcodes.scanResult', compact('qrcode', 'vehicle', 'type', 'record'));
            } else {
                return redirect()->route('qrcodes.scan', $qrcode->id);
            }
        } else {
            return redirect()->route('qrcodes.scan', $qrcode->id);
        }
    }

    public function exit($id)
    {
        $record = Record::find($id);
        $record->exit = date('Y-m-d H:i:s');
        $record->save();
        return redirect()->route('qrcodes.index');
    }
}


 