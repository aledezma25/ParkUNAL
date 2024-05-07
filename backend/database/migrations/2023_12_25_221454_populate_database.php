<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // var_dump(__DIR__ . '/database/migrations/defaultRegisters.sql');
        DB::unprepared(file_get_contents($_SERVER['DOCUMENT_ROOT'] . 'defaultRegisters.sql'));
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};