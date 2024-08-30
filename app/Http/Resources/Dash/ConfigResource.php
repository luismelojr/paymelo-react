<?php

namespace App\Http\Resources\Dash;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ConfigResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'hide_values' => (bool)$this->hide_values,
            'hide_summaries' => (bool)$this->hide_summaries,
        ];
    }
}
