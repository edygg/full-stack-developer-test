<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\AutomobileType;

class AutomobileTypeController extends Controller
{
    public function store(Request $request)
    {
        // $validated_data = $this->validate($request, [
        //     'type' => 'required|unique:automobile_types'
        // ]);
        $automobile_type = AutomobileType::create($request->all());
        return response()->json($automobile_type , 201);
    }

    public function show($type)
    {
       return AutomobileType::where('type', $type)->firstOrFail();
    }
}
