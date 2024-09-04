<?php

namespace App\Http\Controllers;

use App\Exports\UsuariosExport;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Role;
use Maatwebsite\Excel\Facades\Excel;
use Barryvdh\DomPDF\Facade\Pdf as PDF;
use Illuminate\Support\Facades\Storage;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::where('visible', true)->get();
        $roles = Role::all();
        return view("admin.users.index", ["users" => $users, "roles" => $roles]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        
        $roles = Role::all();
        return view("admin.users.create", ["roles" => $roles]); 

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = new User();
        $user->name = $request->name;
        $user->last_name = $request->last_name;
        $user->document_number = $request->document_number;
        $user->phone_number = $request->phone_number;
        $user->email = $request->email;
        $user->address = $request->address;
        $user->role_id = 2;
        $user->password = bcrypt($request->password);
        $user->save();
        // return redirect()->route('usuarios.index')->with('success', 'Usuario creado exitosamente!');
        return json_encode(["success" => true, "message" => "Usuario creado exitosamente!"]);
    }
    public function storeWeb(Request $request)
    {
        $user = new User();
        $user->name = $request->name;
        $user->last_name = $request->last_name;
        $user->document_number = $request->document_number;
        $user->phone_number = $request->phone_number;
        $user->email = $request->email;
        $user->address = $request->address;
        $user->role_id = 2;
        $user->password = bcrypt($request->password);
        $user->save();
        return redirect()->route('usuarios.index')->with('success', 'Usuario creado exitosamente!');
        // return json_encode(["success" => true, "message" => "Usuario creado exitosamente!"]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
                // Validar los datos de entrada, asegurarte de que sean válidos.
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Usuario no encontrado'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Usuario encontrado',
            'user' => $user
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $user = User::find($id);
        $roles = Role::all();
        return view("admin.users.edit", ["user" => $user, "roles" => $roles]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $user = User::find($id);
        $user->name = $request->name;
        $user->last_name = $request->last_name;
        $user->document_number = $request->document_number;
        $user->phone_number = $request->phone_number;
        $user->email = $request->email;
        $user->address = $request->address;
        $user->password = bcrypt($request->password);
        $user->save();
        // return redirect()->route('usuarios.index')->with('success', 'Usuario editado exitosamente!');
        return response()->json(["success" => true, "message" => "Usuario editado exitosamente!"]);
    }
    public function updateWeb(Request $request, $id)
    {
        $user = User::find($id);
        $user->name = $request->name;
        $user->last_name = $request->last_name;
        $user->document_number = $request->document_number;
        $user->phone_number = $request->phone_number;
        $user->email = $request->email;
        $user->address = $request->address;
        $user->password = bcrypt($request->password);
        $user->save();
        return redirect()->route('usuarios.index')->with('success', 'Usuario editado exitosamente!');
        // return response()->json(["success" => true, "message" => "Usuario editado exitosamente!"]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::find($id);
        $user->visible = false;
        $user->save();
        return redirect()->route('usuarios.index')->with('success', 'Usuario eliminado exitosamente!');
    }

    //Path API
    public function checkEmail(Request $request)
    {
        $email = $request->email;
        $user = User::where('email', $email)->first();
        $exists = $user ? true : false;
        if ($user) {
            return response()->json(['exists' => $exists]);
        } else {
            return response()->json(['exists' => $exists]);
        }
    }

    public function updateProfile(Request $request, $id)
    {
        // Validar los datos de entrada, asegurarte de que sean válidos.

        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Usuario no encontrado'
            ], 404);
        }

        if ($request->has('name')) {
            $user->name = $request->input('name');
        }

        if ($request->has('last_name')) {
            $user->last_name = $request->input('last_name');
        }

        if ($request->has('phone_number')) {
            $user->phone_number = $request->input('phone_number');
        }
        if ($request->has('document_number')) {
            $user->document_number = $request->input('document_number');
        }

        // Guardar los cambios en la base de datos
        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'Perfil actualizado correctamente',
            'user' => $user
        ]);
    }

    public function changeDireccion(Request $request, $id)
    {
        // Validar los datos de entrada, asegurarte de que sean válidos.

        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Usuario no encontrado'
            ], 404);
        }

        if ($request->has('address')) {
            $user->address = $request->input('address');
        }

        // Guardar los cambios en la base de datos
        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'Dirección actualizada correctamente',
            'user' => $user
        ]);
    }


    //funcion para subir foto de perfil desde el front
    public function upload(Request $request)

{

    // Validar la imagen
    $request->validate([
        'photo' => 'required|image|mimes:jpeg,png,jpg,gif|max:10048',
    ]);

    // Guardar la imagen en la carpeta "users/icons"
    if ($request->hasFile('photo')) {
        $file = $request->file('photo');
        $destinationPath = 'users/icons';
        $fileName = time() . '.' . $file->getClientOriginalExtension(); // Generar un nombre único
        $request->file('photo')->move($destinationPath, $fileName);
        $filePath = $destinationPath . "/" . $fileName;
        
        return response()->json([
            'url' => ($filePath),
            'fileName' => $fileName // Incluir el nombre del archivo en la respuesta
        ], 200);
    }

    return response()->json(['error' => 'No se pudo cargar la imagen'], 400);
}


    //funcion para subir url a photoURL del usuario
    public function uploadphoto(Request $request, $id)
    {
        // Validar los datos de entrada, asegurarte de que sean válidos.

        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Usuario no encontrado'
            ], 404);
        }

        if ($request->has('photoURL')) {
            $user->photoURL = $request->input('photoURL');
        }

        // Guardar los cambios en la base de datos
        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'Foto actualizada correctamente',
            'user' => $user
        ]);
    }
    
}
