<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVisitorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('visitors', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('lastName')->nullable();
            $table->string('documentNumber')->nullable();
            $table->string('phone')->nullable();
            $table->string('mark')->nullable();
            $table->string('color')->nullable();
            $table->string('typeVehicle')->nullable();
            $table->string('plate')->nullable();
            $table->dateTime('entryDate')->nullable();
            $table->dateTime('exitDate')->nullable();
            $table->timestamps(); // created_at, updated_at
        });
    }


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('visitors');
    }
}
