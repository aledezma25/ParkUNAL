<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRecordsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('records', function (Blueprint $table) {
            $table->id();
            $table->date('entryDate');
            $table->date('exitDate')->nullable();
            $table->time('entryTime');
            $table->time('exitTime')->nullable();
            $table->unsignedBigInteger('idVehicle');
            $table->foreign('idVehicle')->references('id')->on('vehicles');
            $table->unsignedbigInteger('idUser')->nullable();
            $table->foreign('idUser')->references('id')->on('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('records');
    }
}
