<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\AdministradorController;
use App\Http\Controllers\TypeController;
use App\Http\Controllers\VehicleController;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\RecordController;
use Barryvdh\DomPDF\Facade\Pdf as PDF;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});



Route::middleware(['auth', 'role:administrador'])->group(function () {
    //gestion de reportes
    Route::get('/administrador', [AdministradorController::class, 'index'])->name('administrador');

    //gestion de reportes excel
    // Route::get('products-download-excel', [ProductController::class, 'generarExcel'])->name('products-download-excel');
    // Route::get('categories-download-excel', [CategoryController::class, 'generarExcel'])->name('categories-download-excel');
    // Route::get('users-download-excel', [UsersController::class, 'generarExcel'])->name('users-download-excel');

    //Grafica
    // Route::get('products-grafica', [ProductController::class, 'grafica'])->name('products-grafica');
    // Route::get('categories-grafica', [CategoryController::class, 'grafica'])->name('categories-grafica');

    //gestion de reportes PDF
    // Route::get('productos-pdf', [ProductController::class, 'generarPDF'])->name('productos-pdf');
    // Route::get('categorias-pdf', [CategoryController::class, 'generarPDF'])->name('categorias-pdf');
    // Route::get('usuarios-pdf', [UsersController::class, 'generarPDF'])->name('usuarios-pdf');
    
    //gestion de usuarios
    Route::get('/usuarios', [UsersController::class, 'index'])->name('usuarios.index');
    Route::post("usuarios", [UsersController::class, 'store'])->name('usuarios.store');
    Route::get("usuarios/{id}", [UsersController::class, 'edit'])->name('usuarios.edit');
    Route::delete("usuarios/{id}", [UsersController::class, 'destroy'])->name('usuarios.destroy');
    Route::put("usuarios/{id}", [UsersController::class, 'update'])->name('usuarios.update');
    Route::get("create", [UsersController::class, 'create'])->name('create');
   
    

    //gestion de roles
    Route::get('/roles', [RoleController::class, 'index'])->name('roles.index');
    Route::post("roles", [RoleController::class, 'store'])->name('roles.store');
    Route::get("roles/{id}", [RoleController::class, 'edit'])->name('roles.edit');
    Route::delete("roles/{id}", [RoleController::class, 'destroy'])->name('roles.destroy');
    Route::put("roles/{id}", [RoleController::class, 'update'])->name('roles.update');

    //gestion de types
    Route::get('/types', [TypeController::class, 'index'])->name('types.index');
    Route::post("types", [TypeController::class, 'store'])->name('types.store');
    Route::get("types/{id}", [TypeController::class, 'edit'])->name('types.edit');
    Route::delete("types/{id}", [TypeController::class, 'destroy'])->name('types.destroy');
    Route::put("types/{id}", [TypeController::class, 'update'])->name('types.update');

    //gestion de vehicles 
    Route::get('/vehicles', [VehicleController::class, 'index'])->name('vehicles.index');
    Route::post("vehicles", [VehicleController::class, 'store'])->name('vehicles.store');
    Route::get("vehicles/{id}", [VehicleController::class, 'edit'])->name('vehicles.edit');
    Route::delete("vehicles/{id}", [VehicleController::class, 'destroy'])->name('vehicles.destroy');
    Route::put("vehicles/{id}", [VehicleController::class, 'update'])->name('vehicles.update');
    Route::get("createVehi", [VehicleController::class, 'create'])->name('createVehi');

    //gestion de records
    Route::get('/records', [RecordController::class, 'index'])->name('records.index');
    Route::post("records", [RecordController::class, 'store'])->name('records.store');
    Route::get("records/{id}", [RecordController::class, 'edit'])->name('records.edit');
    Route::delete("records/{id}", [RecordController::class, 'destroy'])->name('records.destroy');
    
    
});

Route::middleware(['auth', 'role:usuario'])->group(function () {
    Route::get('/usuario', [UsersController::class, 'index'])->name('usuario');
});



Auth::routes();
Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

