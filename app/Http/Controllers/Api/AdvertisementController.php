<?php

namespace App\Http\Controllers\Api;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\Advertisement;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;
use App\Http\Resources\AdvertisementResource;
use App\Http\Traits\ImageProccessingTrait as TraitImageProccessingTrait;

class AdvertisementController extends Controller
{
    use TraitImageProccessingTrait;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $advertisements = Advertisement::all();
        foreach ($advertisements as $advertisement) {
            $contruct_expire = Carbon::parse($advertisement->advertisement_expire)->diffForHumans();
            $diff_day = Carbon::now()->diffInDays($advertisement->advertisement_expire, false);
            if ($advertisement->advertisement_expire == date('Y-m-d') && $advertisement->renew > 0) {
                $advertisement->renew = $advertisement->renew - 1;
                $advertisement->update();
            } elseif ($contruct_expire == "1 week ago") {
                $advertisement->delete();
            }
        }
        $advertisements = Advertisement::with(['trader'])->get();
        $advertisements = Advertisement::where('advertisement_expire' , '>', date('Y-m-d'))->with(['trader'])->get();
        return response()->json([
            "data" => AdvertisementResource::collection($advertisements)
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
        $advertisement = new Advertisement();
        $advertisement->fill($request->input());

        // Expire of advertisement
        $contruct_date = Carbon::now();
        $expiry_days = $request->input('renew') > 0 ? $request->input('renew') * 30 : 30;
        $advertisement->advertisement_expire = Carbon::parse($contruct_date)->addDays(($expiry_days));
        $diff_day = Carbon::now()->diffInDays($advertisement->advertisement_expire, false);
        if ($request->has('img')) {
            $img = $request->file('img');
            $filename = $this->setImage($img, 'advertisements', 900, 600);
            $advertisement->img = $filename;
            if ($request->input('id')) {
                $advertisement = Advertisement::where(['id'=>$request->input('id')])->first();
                if ($advertisement->img != $filename) {
                    $this->deleteImage(Advertisement::IMAGE_PATH, $advertisement->img);
                }
                $advertisement->img = $filename;
                if ($advertisement->update()) {
                    return response()->json([
                        "success" => true,
                        "message" => "???? ?????????? ??????????????",
                        "data" => new AdvertisementResource($advertisement)
                    ], 200);
                }
            }
            $advertisement->img = $filename;
        }

        if ($advertisement->save()) {
            return response()->json([
                "success" => true,
                "message" => "???? ?????????? ???????????? ???????????? ??????????",
                "data" => new AdvertisementResource($advertisement),
                "daysRemainig" => $diff_day,
            ], 200);
        } else {
            return response()->json([
                "success" => false,
                "message" => "?????? ?????????? ???????????? ???????????? ??????????",
            ], 422);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Advertisement  $advertisement
     * @return \Illuminate\Http\Response
     */
    public function show(Advertisement $advertisement)
    {
        if ($advertisement->advertisement_expire == date('Y-m-d') && $advertisement->renew > 0) {
            $advertisement->renew = $advertisement->renew - 1;
            $advertisement->update();
        }
        return response()->json([
            "data" => new AdvertisementResource($advertisement)
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Advertisement  $advertisement
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Advertisement $advertisement)
    {
        // $current_expire = strtotime($advertisement->advertisement_expire);
        // Expire of advertisement
    return DB::transaction(function() use($advertisement, $request){

        $oldExpiryDate   = $advertisement->advertisement_expire;
        $oldExpiryDate   = $oldExpiryDate[5].$oldExpiryDate[6];
        $oldRenew        = $advertisement->renew;
        $newRenew        = $request->input('renew');
        $advertisement->fill($request->input());
        // Expire of advertisement
        if ($request->input('renew') > 0 ) {
            $month     = $oldExpiryDate;
            for ($i=0; $i < $newRenew; $i++) {
                $month = $month+1;
                if ($month < 10) {
                    $month = '0'.$month;
                }
                if ($month > 12) {
                    $month = $month - 12;
                }
                $monthDays = Carbon::now()->month($month)->daysInMonth;
                $advertisement->advertisement_expire = Carbon::parse($advertisement->advertisement_expire)->addDays(($monthDays));
                $diff_day = Carbon::now()->diffInDays($advertisement->advertisement_expire, false);
                $advertisement->update();
            }
        }
        if ($request->hasFile('img')) {
            $this->deleteImage(Advertisement::IMAGE_PATH, $advertisement->img);
            $img = $request->file('img');
            $advertisement->img = $this->setImage($img, 'advertisements', 450, 450);
        }
        $advertisement->renew = $newRenew + $oldRenew;
        if ($advertisement->update()) {
            return response()->json([
                "success" => true,
                "message" => "???? ?????????? ??????????????",
                "data" => new AdvertisementResource($advertisement)
            ], 200);
        } else {
            return response()->json([
                "success" => false,
                "message" => "?????? ?????????? ??????????????",
            ], 422);
        }
    });
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Advertisement  $advertisement
     * @return \Illuminate\Http\Response
     */
    public function destroy(Advertisement $advertisement)
    {
        if ($advertisement->delete()) {
            return response()->json([
                "success" => true,
                "message" => "???? ?????? ??????????????",
            ], 200);
        } else {
            return response()->json([
                "success" => false,
                "message" => "?????? ?????? ??????????????",
            ], 422);
        }
    }
}
