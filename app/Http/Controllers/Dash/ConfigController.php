<?php

namespace App\Http\Controllers\Dash;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ConfigController extends Controller
{
    public function show()
    {
        $config = auth()->user()->config;
        return inertia('Dash/Config/Index', [
            'config' => $config
        ]);
    }
}
