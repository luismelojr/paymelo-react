<?php

namespace App\Http\Controllers\Dash;

use App\Http\Controllers\Controller;
use App\Http\Resources\Dash\ConfigResource;
use App\Models\Config;
use Illuminate\Http\Request;

class ConfigController extends Controller
{
    public function show()
    {
        $config = auth()->user()->config;
        return inertia('Dash/Config/Index', [
            'config' => new ConfigResource($config)
        ]);
    }

    public function updateValues(Config $config, Request $request)
    {
        $data = $request->validate([
            'hide_values' => 'required|boolean',
        ]);

        $config->update([
            'hide_values' => $data['hide_values']
        ]);

        return redirect()->route('config.show')->toast('Configurações atualizadas com sucesso!');
    }
}
