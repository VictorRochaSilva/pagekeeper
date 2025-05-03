<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    protected $fillable = [
        'name',
        'author',
        'registration_number',
        'genre_id',
        'available'
    ];

    public function genrer()
    {
        return $this->belongsToMany(Genre::class);
    }
}
