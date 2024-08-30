<?php

namespace App\Enums;

enum TypeAccountEnum: string
{
    case Current = 'current';
    case Savings = 'savings';
    case Salary = 'salary';
    case Investment = 'investment';
    case Other = 'other';

}
