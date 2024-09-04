<?php

namespace App\Http\Controllers;
use App\Models\Comment;

use Illuminate\Http\Request;

class CommentsController extends Controller
{
    public function index()
    {
        $comments = Comment::all();
        return response()->json($comments);
    }

    public function store(Request $request)
    {
        $request->validate([
            'idUser' => 'required|integer',
            'nameUser' => 'required|string',
            'lastNameUser' => 'required|string',
            'photoURL' => 'required|string',
            'message' => 'required|string',
            'reaction' => 'required|integer',
        ]);
        $comment = new Comment();
        $comment->idUser = $request->idUser;
        $comment->nameUser = $request->nameUser;
        $comment->lastNameUser = $request->lastNameUser;
        $comment->photoURL = $request->photoURL;
        $comment->message = $request->message;   
        $comment->image = $request->image;
        $comment->reaction = $request->reaction;
        $comment->date = now();
        $comment->save();
        return response()->json([
            'success' => true,
            'message' => 'Comentario guardado con éxito',
            'comment' => $comment,
        ], 201);
        
        
    }

    public function show($id)
    {
        $comment = Comment::find($id);
        return response()->json($comment);
    }

    public function update($id, Request $request)
    {
        $comment = Comment::find($id);
        $comment->reaction = $request->reaction;
        $comment->save();
        return response()->json($comment);
    }
    
    
    public function destroy($id)
    {
        $comment = Comment::find($id);
        $comment->delete();
        return response()->json($comment);
    }

    public function getCommentsByUser($idUser)
    {
        $comments = Comment::where('idUser', $idUser)->get();
        return response()->json($comments);
    }
    
    public function uploadImage(Request $request)

    {
    
        // Validar la imagen
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:10048',
        ]);
    
        // Guardar la imagen en la carpeta "comments/images"
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $destinationPath = 'comments/images';
            $fileName = time() . '.' . $file->getClientOriginalExtension(); // Generar un nombre único
            $request->file('image')->move($destinationPath, $fileName);
            $filePath = $destinationPath . "/" . $fileName;
            
            return response()->json([
                'url' => ($filePath),
                'fileName' => $fileName // Incluir el nombre del archivo en la respuesta
            ], 200);
        }
        return response()->json(['error' => 'No se pudo cargar la imagen'], 400);
    }  
    
}
