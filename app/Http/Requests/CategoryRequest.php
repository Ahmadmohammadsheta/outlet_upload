<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CategoryRequest extends FormRequest
{
    /**
     * store validations
     */
    private function storeRequest()
    {
        return [
            'name'       => 'required',
            'parent_id'  => 'nullable|integer',
        ];
    }

    /**
     * update validations
     */
    private function updateRequest()
    {
        return [
            'name' => 'nullable',
            'parent_id'  => 'nullable|integer',
        ];
    }

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return request()->method() == 'PUT' ? $this->updateRequest() : $this->storeRequest();
    }

    /**
     * Get the error messages for the defined validation rules.
     */
    public function messages()
    {
        return [
            'name.required'     => 'يجب ادخال اسم',
            'parent_id.integer' => 'رقم فقط',
        ];
    }
}