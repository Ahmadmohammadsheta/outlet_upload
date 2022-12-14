<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->unsignedBigInteger('category_id');
            $table->decimal('sale_price', 16, 2);
            $table->decimal('buy_price', 16, 2)->nullable();
            $table->decimal('buy_discount', 4, 2)->nullable();
            $table->unsignedBigInteger('item_unit_id')->nullable();
            $table->integer('unit_parts_count')->nullable();
            $table->unsignedBigInteger('unit_id')->nullable();
            $table->boolean('available')->nullable();
            $table->boolean('approved')->default(0);
            $table->string('item_code')->unique();
            $table->decimal('discount', 4, 2)->default(0);
            $table->text('description');
            $table->unsignedBigInteger('manufactory_id') ->nullable();
            $table->unsignedBigInteger('agent_id')       ->nullable();
            $table->unsignedBigInteger('company_id')     ->nullable();
            $table->unsignedBigInteger('importer_id')    ->nullable();
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
        Schema::dropIfExists('items');
    }
};
