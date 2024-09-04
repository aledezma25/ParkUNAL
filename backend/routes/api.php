<?php

use App\Http\Controllers\TypeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\SecurityAuthController;
use App\Http\Controllers\VehicleController;
use App\Http\Controllers\RecordController;
use App\Http\Controllers\CommentsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
//obtener usuario por id
Route::get('/users/{id}', [UsersController::class, 'show']);

// ruta para subir la imagen del usuario
Route::post('/upload', [UsersController::class, 'upload']);

Route::apiResource('/users', UsersController::class);
//RUta para checkear si el email existe
Route::get('/users/email/{email}', [UsersController::class, 'checkEmail']);
Route::post('/users/{id}/updateprofile', [UsersController::class, 'updateProfile']);

//ruta para subir url a photoURL del usuario
Route::post('/users/{id}/uploadphoto', [UsersController::class, 'uploadphoto']);


//ruta para obtener las types
Route::get('/types', [TypeController::class, 'indexreact']);

//ruta para cambiar la direccion
Route::post('/users/{id}/changeDireccion', [UsersController::class, 'changeDireccion']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//ruta para obtener todo los vehicles
Route::get('/vehicles', [VehicleController::class, 'indexreact']);
// ruta para agregar un vehicle
Route::post('/vehicles', [VehicleController::class, 'store']);
Route::put('/vehicles/{id}', [VehicleController::class, 'update']);
Route::delete('/vehicles/{id}', [VehicleController::class, 'destroy']);
Route::get('/vehicles/{id}', [VehicleController::class, 'show']);



Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [SecurityAuthController::class, 'logout']);
    Route::put('/users/update', [UsersController::class, 'updateProfile']);


});


Route::post('login', [SecurityAuthController::class, 'login'])->name('login');

//ruta para llenar un record
Route::post('/records', [RecordController::class, 'store']);
//ruta para obtener todos los records
Route::get('/records', [RecordController::class, 'index']);
//ruta para obtener un record por id
Route::get('/records/{id}', [RecordController::class, 'show']);

//ruta para actualizar un record
Route::put('/records/{id}', [RecordController::class, 'update']);


//ruta para para obtener la última entrada del vehículo 
Route::get('/records/last/{id}', [RecordController::class, 'lastRecord']);

//ruta para actualizar el espacio de un tipo de vehículo
Route::put('/types/spaces/{id}', [TypeController::class, 'updateSpaces']);

// ruta para obtener el tipo de vehículo por id
Route::get('/types/{id}', [TypeController::class, 'show']);

//ruta para los comentarios
Route::get('/comments', [CommentsController::class, 'index']);
Route::post('/comments', [CommentsController::class, 'store']);
Route::get('/comments/{id}', [CommentsController::class, 'show']);
Route::put('/comments/{id}', [CommentsController::class, 'update']);
Route::delete('/comments/{id}', [CommentsController::class, 'destroy']);
//ruta para subir imagen
Route::post('/comments/upload', [CommentsController::class, 'uploadImage']);

