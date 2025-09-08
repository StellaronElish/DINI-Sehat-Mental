<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::table('results', function (Blueprint $table) {
        $table->integer('wfc_index')->nullable();
        $table->integer('stress_index')->nullable();
        $table->json('score_category')->nullable();
        $table->json('score_details')->nullable();
    });
}

public function down()
{
    Schema::table('results', function (Blueprint $table) {
        $table->dropColumn(['wfc_index', 'stress_index', 'score_category', 'score_details']);
    });
}
};
