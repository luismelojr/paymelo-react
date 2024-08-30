<?php

namespace App\Http\Controllers\Dash;

use App\Http\Controllers\Controller;
use App\Http\Resources\Dash\AccountResource;
use App\Services\AccountService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AccountController extends Controller
{
    public function __construct(
        private AccountService $service
    ){
    }

    public function index(Request $request)
    {
        $user = $request->user();
        $accounts = $user->accounts()->get();

        return Inertia::render('Dash/Account/Index', [
            'accounts' => AccountResource::collection($accounts)
        ]);
    }
}
