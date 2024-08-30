<?php

namespace App\Models;

use App\Enums\TypeAccountEnum;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Bank extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'type_account',
        'brand',
        'name',
        'amount_initial',
        'number_account',
        'number_agency'
    ];

    protected $casts = [
        'type_account' => TypeAccountEnum::class,
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
