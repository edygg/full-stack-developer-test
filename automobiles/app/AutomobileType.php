<?php

namespace App;

use Jenssegers\Mongodb\Eloquent\Model;

class AutomobileType extends Model
{
    protected $connection = 'mongodb';

    protected $fillable = [
        'type', 'display_name'
    ];

    public function automobiles() 
    {
        return $this->hasMany(Automobile::class);
    }
}
