<?php

namespace App\Http\Controllers\Api;

use App\Models\Wishlist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Resources\WishlistResource;
use App\Http\Traits\AuthGuardTrait as TraitsAuthGuardTrait;

class WishlistController extends Controller
{
    use TraitsAuthGuardTrait;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (request()->bearerToken() != null) {
            [$id, $user_token] = explode('|', request()->bearerToken(), 2);
            $token_data = DB::table('personal_access_tokens')->where(['token' => hash('sha256', $user_token), 'name'=>'client' ])->first();
            $wishlists = Wishlist::where(['client_id'=>$token_data->tokenable_id])->with(['item'])->get();
            return response()->json([
                "data" => WishlistResource::collection($wishlists),
            ]);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if ($this->getTokenId('client')) {
            $wishlist = Wishlist::where(['client_id' => $this->getTokenId('client'), 'item_id' => $request->item_id])->first();
            if ($wishlist) {
                if ($wishlist->delete()) {
                    return response()->json([
                        "success" => true,
                    ], 200);
                } else {
                    return response()->json([
                        "success" => false,
                    ], 422);
                }
            } else {
                $wishlist = new Wishlist();
                $wishlist->item_id    = $request->item_id;
                $wishlist->client_id  = $this->getTokenId('client');
                if ($wishlist->save()) {
                    return response()->json([
                        "success" => true,
                    ], 200);
                } else {
                    return response()->json([
                        "success" => false,
                    ], 422);
                }
            }
        } else {
            return response()->json([
                "message" => "",
            ], 422);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Wishlist  $wishlist
     * @return \Illuminate\Http\Response
     */
    public function destroy()
    {
        $wishlists = Wishlist::where(['client_id'=>$this->getTokenId('client')])->get();
        if (count($wishlists) > 0) {
            foreach ($wishlists as $wishlist) {
                $wishlist->delete();
            }
            return response()->json([
                "success" => true,
                "message" => "???? ?????? ?????????? ?????????????? ",
            ], 200);
        } else {
            return response()->json([
                "success" => false,
                "message" => "???? ???????? ???????????? ???? ?????????? ??????????????",
            ], 422);
        }
    }
}
