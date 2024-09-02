<?php

namespace App\Http\Controllers\Dash;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dash\AccountRequest;
use App\Http\Resources\Dash\AccountResource;
use App\Models\Bank;
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
        $accounts = $this->service->getAccounts($user);

        return Inertia::render('Dash/Account/Index', [
            'accounts' => AccountResource::collection($accounts)
        ]);
    }

    public function store(AccountRequest $request)
    {
        $data = $request->validated();
        $data['brand'] = $data['brand']['image'];
        $this->service->create($data);

        return redirect()->route('accounts.index')->toast('Conta criada com sucesso!');
    }

    public function destroy(Bank $account)
    {
        $this->service->delete($account);

        return redirect()->route('accounts.index')->toast('Conta deletada com sucesso!');
    }
}
