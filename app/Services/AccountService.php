<?php

namespace App\Services;

use App\Models\Bank;
use App\Models\User;

class AccountService
{
    public function __construct(
        private Bank $model
    ){}

    public function getAccounts(User $user)
    {
        $accounts = $user->accounts()->get();
        $accounts->map(function ($account) {
            $account->balances = [
                [
                    'month' => 'Janeiro',
                    'income' => 0,
                    'expenses' => 0,
                ],
                [
                    'month' => 'Fevereiro',
                    'income' => 0,
                    'expenses' => 0,
                ],
                [
                    'month' => 'Março',
                    'income' => 0,
                    'expenses' => 0,
                ],
                [
                    'month' => 'Abril',
                    'income' => 0,
                    'expenses' => 0,
                ],
                [
                    'month' => 'Maio',
                    'income' => 0,
                    'expenses' => 0,
                ],
                [
                    'month' => 'Junho',
                    'income' => 0,
                    'expenses' => 0,
                ],
                [
                    'month' => 'Julho',
                    'income' => 0,
                    'expenses' => 0,
                ],
                [
                    'month' => 'Agosto',
                    'income' => 0,
                    'expenses' => 0,
                ],
                [
                    'month' => 'Setembro',
                    'income' => 0,
                    'expenses' => 0,
                ],
                [
                    'month' => 'Outubro',
                    'income' => 0,
                    'expenses' => 0,
                ],
                [
                    'month' => 'Novembro',
                    'income' => 0,
                    'expenses' => 0,
                ],
                [
                    'month' => 'Dezembro',
                    'income' => 0,
                    'expenses' => 0,
                ],
            ];
            return $account;
        });
        return $accounts;
    }

    public function create(array $data): Bank
    {
        $user = auth()->user();
        return $user->accounts()->create($data);
    }

    public function delete(Bank $bank)
    {
        $bank->delete();
    }
}
