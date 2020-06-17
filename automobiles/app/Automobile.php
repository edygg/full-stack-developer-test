<?php

namespace App;

use Jenssegers\Mongodb\Eloquent\Model;

class Automobile extends Model
{
    protected $connection = 'mongodb';

    protected $fillable = [
        'license_plate'
    ];

    public function automobile_type()
    {
        return $this->belongsTo(AutomobileType::class);
    }
}
