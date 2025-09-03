<?php

// database/migrations/2025_08_26_000001_create_results_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('results', function (Blueprint $table) {
            $table->id();
            $table->foreignId('respondent_id')->constrained('respondents')->onDelete('cascade');

            // skor per kategori
            $table->integer('score_I')->nullable();
            $table->integer('score_II')->nullable();
            $table->integer('score_III')->nullable();
            $table->integer('score_IV')->nullable();
            $table->integer('score_V')->nullable();
            $table->integer('score_VI')->nullable();
            $table->integer('score_VII')->nullable();
            $table->integer('score_VIII')->nullable();
            $table->integer('score_IX')->nullable();

            $table->integer('problematic_category')->nullable();
            $table->integer('score_total')->nullable();
            $table->enum('stress_level', ['rendah', 'sedang', 'tinggi'])->nullable();
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('results');
    }
};

