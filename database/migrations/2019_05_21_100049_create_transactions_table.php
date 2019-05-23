<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransactionsTable extends Migration {
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up() {
    Schema::create('transactions', function (Blueprint $table) {
      $table->bigIncrements('id');
      $table->string('type');
      $table->date('date');
      $table->string('account');
      $table->string('description')->nullable();
      $table->string('value');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down() {
    Schema::dropIfExists('transactions');
  }
}
