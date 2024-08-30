<?php

namespace App\Http\Controllers\Dash;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dash\ProfileRequest;
use App\Http\Resources\Dash\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function show()
    {
        return Inertia::render('Dash/Profile/Index', [
            'user' => new UserResource(auth()->user())
        ]);
    }

    public function update(ProfileRequest $request)
    {
        $data = $request->validated();
        $user = auth()->user();
        $user->update($data);

        return redirect()->route('profile.show')->toast('Perfil atualizado com sucesso!');
    }

    public function updatePassword(Request $request)
    {
        $data = $request->validate([
            'password_actual' => 'required|current_password',
            'password' => 'required|confirmed|min:8|different:password_actual',
        ]);
        $user = auth()->user();
        $user->update($data);

        return redirect()->route('profile.show')->toast('Senha atualizada com sucesso!');
    }

    public function destroy()
    {
        $user = auth()->user();
        Auth::logout();
        $user->delete();

        return redirect()->route('login')->toast('Conta deletada com sucesso!');
    }
}
