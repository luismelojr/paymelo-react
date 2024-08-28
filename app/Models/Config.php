<?php

namespace App\Models;

use App\Enums\VisualizationConfigEnum;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Config extends Model
{
    use HasUuids;

    protected $fillable = [
        'visualization',
        'hide_values',
        'hide_summaries'
    ];

    protected $casts = [
        'visualization'  => VisualizationConfigEnum::class,
        'hide_values'    => 'boolean',
        'hide_summaries' => 'boolean'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
