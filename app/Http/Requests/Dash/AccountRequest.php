<?php

namespace App\Http\Requests\Dash;

use App\Enums\TypeAccountEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AccountRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'type_account' => ['required', 'string', Rule::enum(TypeAccountEnum::class)],
            'brand' => ['nullable'],
            'name' => ['required', 'string'],
            'amount_initial' => ['required', 'numeric'],
            'number_account' => ['nullable', 'string'],
            'number_agency' => ['nullable', 'string'],
        ];
    }
}
