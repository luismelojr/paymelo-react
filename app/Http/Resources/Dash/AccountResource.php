<?php

namespace App\Http\Resources\Dash;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AccountResource extends JsonResource
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
            'type_account' => $this->type_account,
            'brand' => $this->brand,
            'name' => $this->name,
            'amount_initial' => $this->amount_initial,
            'number_account' => $this->number_account,
            'number_agency' => $this->number_agency,
        ];
    }
}
