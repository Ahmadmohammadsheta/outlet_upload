<?php

namespace App\Http\Controllers\Api;
use App\Models\EskanCompany;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\EskanCompanyResource;

class EskanCompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $eskanCompanys = EskanCompany::all();
        return response()->json([
            "data" => EskanCompanyResource::collection($eskanCompanys)
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $eskanCompany = EskanCompany::create($request->all());
        if ($eskanCompany) {
            return response()->json([
                "success" => true,
                "message" => "تم تسجيل مبنا جديدا",
                "data" => new EskanCompanyResource($eskanCompany)
            ], 200);
        } else {
            return response()->json([
                "success" => false,
                "message" => "فشل تسجيل المبنى",
            ], 422);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\EskanCompany  $eskanCompany
     * @return \Illuminate\Http\Response
     */
    public function show(EskanCompany $eskanCompany)
    {
        return response()->json([
        "data"=> new EskanCompanyResource($eskanCompany),
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\EskanCompany  $eskanCompany
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,EskanCompany $eskanCompany)
    {
        if ($eskanCompany->update($request->all())) {
            return response()->json([
                "success" => true,
                "message" => "تم تعديل المبنى",
                "data" => new EskanCompanyResource($eskanCompany)
            ], 200);
        } else {
            return response()->json([
                "success" => false,
                "message" => "فشل تعديل المبنى",
            ], 422);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\EskanCompany  $eskanCompany
     * @return \Illuminate\Http\Response
     */
    public function destroy(EskanCompany $eskanCompany)
    {
        if ($eskanCompany->levels->count() == 0) {
            if ($eskanCompany->delete()) {
                return response()->json([
                    "success" => true,
                    "message" => "تم حذف المبنى ",
                ], 200);
            } else {
                return response()->json([
                    "success" => false,
                    "message" => "فشل حذف المبنى",
                ], 422);
            }
        } else {
            return response()->json([
                "success" => false,
                "message" => "فشل حذف مبنا به ادوار",
            ], 422);
        }
    }
}
