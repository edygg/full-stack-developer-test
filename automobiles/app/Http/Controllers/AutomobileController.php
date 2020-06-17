<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Automobile;
use App\AutomobileType;

class AutomobileController extends Controller
{
    public function store(Request $request)
    {
        $automobile_type_type = $request->input('automobile_type');

        $automobile_type = AutomobileType::where('type', $automobile_type_type)->firstOrFail();

        $automobile = Automobile::create($request->all());
        $automobile_type->automobiles()->save($automobile);

        $json_response = [
            'license_plate' => $automobile->license_plate,
            'automobile_type' => $automobile_type
        ];

        return response()->json($json_response , 201);
    }

    public function show($license_plate)
    {
        $automobile = Automobile::where('license_plate', $license_plate)->firstOrFail();
        $automobile_type = AutomobileType::find($automobile->automobile_type);
        
        $json_response = [
            'license_plate' => $automobile->license_plate,
            'automobile_type' => $automobile_type
        ];

        return $json_response;
    }
}
