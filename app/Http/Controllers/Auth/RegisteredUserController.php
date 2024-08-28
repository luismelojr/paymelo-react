<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\UserRequest;
use App\Services\UserService;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RegisteredUserController extends Controller
{
    public function __construct(
        private UserService $userService
    ) {
    }

    public function create()
    {
        return Inertia::render('Auth/Register');
    }

    public function store(UserRequest $request)
    {
        try {
            $data = $request->validated();
            $data['password'] = bcrypt($data['password']);
            $data['phone'] = preg_replace('/[^0-9]/', '', $data['phone']);
            $user = $this->userService->create($data);
            Auth::login($user);
            return redirect()->route('dashboard')->toast("Bem vindo ao paymelo");
        } catch (\Exception $exception) {
            return redirect()->back()->toast('Erro ao criar usuário, tente novamente mais tarde.');
        }
    }
}
