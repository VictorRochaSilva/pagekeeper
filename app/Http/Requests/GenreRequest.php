<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GenreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255|unique:genres',
        ];
    }

    public function messages(): array
    {
        return [
            'name.unique' => 'Ja existe um gênero cadastrado com esse nome.',
        ];
    }
}
