<?php

namespace App\Http\Controllers\Api;

use App\Models\Level;
use App\Models\LevelImage;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\LevelResource;
use App\Http\Traits\AuthGuardTrait as TraitsAuthGuardTrait;
use App\Http\Traits\ImageProccessingTrait as TraitImageProccessingTrait;

class LevelController extends Controller
{
    use TraitsAuthGuardTrait;
    use TraitImageProccessingTrait;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $levels = Level::with(['units', 'traders'])->paginate();
        if (count($levels)) {
            foreach ($levels as $level) {
                if ($level->project->main_project_id == 1) {
                    $data[] = new LevelResource($level);
                }
            }
            return response()->json([
                "data" => $data
            ]);
        }
        return response()->json([
            "data" => LevelResource::collection($levels),
        ]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function latest()
    {
        $levels = Level::latest()->take(10)->get();
        return response()->json([
            "data" => LevelResource::collection($levels),
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
        if ($level = Level::create([
            'name' => $request->name,
            'project_id' => $request->project_id,
            'zone_id' => $request->zone_id
            ])) {
            if ($request->has('img')) {
                foreach ($request->file('img') as $img) {
                    $image = new LevelImage();
                    $image->level_id = $level->id;
                    $image->img = $this->setImage($img, 'levels', 450, 450);
                    $image->save();
                }
            }
            return response()->json([
                "success" => true,
                "message" => "???? ?????????? ?????????? ??????????",
                "data" => new LevelResource($level)
            ], 200);
        } else {
            return response()->json([
                "success" => false,
                "message" => "?????? ?????????? ????????????",
            ], 422);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Level  $level
     * @return \Illuminate\Http\Response
     */
    public function show(Level $level)
    {
        $level = $level->load(['units', 'project']);
        return response()->json([
            "data"=> new LevelResource($level),
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Level  $level
     * @return \Illuminate\Http\Response
     */
    public function client(Level $level)
    {
        $level = Level::where('id', $level->id)->with(['traders', 'activities'])->get();
        return response()->json([
            "data"=> LevelResource::collection($level),
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Level  $level
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Level $level)
    {
        $request->validate([
            'name'        => 'required',
            'project_id' => [
                'required'
            ]
        ]);
        if ($level->update($request->all())) {
        return response()->json([
            "success" => true,
            "message" => "???? ?????????? ????????????",
            "data" => $level
        ], 200);
        } else {
            return response()->json([
                "success" => false,
                "message" => "?????? ?????????? ????????????",
            ], 422);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Level  $level
     * @return \Illuminate\Http\Response
     */
    public function destroy(Level $level)
    {
        if ($level->units->count() == 0) {
            if ($level->delete()) {
                return response()->json([
                    "success" => true,
                    "message" => "???? ?????? ????????????",
                    "data" => $level
                ], 200);
            } else {
                return response()->json([
                    "success" => false,
                    "message" => "?????? ?????? ???????????? ",
                ], 422);
            }
        } else {
            return response()->json([
                "success" => false,
                "message" => "???????????? ???? ?????????? ?????? ???????? ?????? ????????????",
            ], 422);
        }
    }
}
