<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class MainProject extends Model
{
    use HasFactory;

    protected $appends  = [];
    protected $fillable = ['name'];
    protected $hidden   = ['created_at', 'updated_at'];
    protected $visible  = [];

    public function projects()
    {
        return $this->hasMany(Project::class);
    }

    /**
     * Attributes
     */

     /**
     * Double Attribute.
     *
     * @return Attribute
     */
    protected function projectsOfProject(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $this->projects,
            set: fn ($value) => $value,
        );
    }
}
