<?php

namespace App\Http\Controllers\Api\Auth;

use App\Models\User;
use App\Models\Client;
use App\Models\Trader;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use App\Http\Traits\ImageProccessingTrait as TraitImageProccessingTrait;
use App\Http\Traits\ResponseTrait as TraitResponseTrait;

class RegisterClientController extends Controller
{
    use TraitResponseTrait;
    use TraitImageProccessingTrait;
    /**
     * Register api
     *
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'phone'            => 'unique:clients,phone|regex:/^(01)[0-9]{9}$/',
            'email'            => 'unique:clients,email',
        ], [
            'phone.unique'     => 'الهاتف مسجل من قبل',
            'email.unique'     => 'البريد الالكتروني مسجل من قبل',
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }

        if ($request->input('password') !== $request->input('confirm_password')) {
            return response()->json([
                'message' => 'الرقم السري غير مطابق',
            ], 422);
        }

        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = Client::create($input);
        $success['token'] =  $user->createToken('client')->plainTextToken;
        $success['tokenName'] =  DB::table('personal_access_tokens')->orderBy('id', 'DESC')->select('name', 'tokenable_id')->where(['tokenable_id'=>$user->id])->first();
        $success['name']  =  $user;
        return $this->sendResponse($success, 'تم التسجيل بنجاح.');
    }

}
