<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use App\Models\OrderDetail;
use Illuminate\Http\Resources\Json\JsonResource;

class TraderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $units         = $this->whenLoaded('units');
        $levels        = $this->whenLoaded('levels');
        // $orderDetails  = $this->whenLoaded('orderDetails');
        return [
            'id'           => $this->id,
            'f_name'       => $this->f_name,
            'l_name'       => $this->l_name,
            'img'          => $this->img ? $this->path : false,
            'age'          => Carbon::parse($this->age)->age,
            'phone'        => $this->phone,
            'email'        => $this->email,
            'code'         => $this->code,
            'levels'       => LevelResource::collection($levels),
            'units'        => UnitResource::collection($units),
            // 'orderDetails' => OrderDetailResource::collection($orderDetails),
            // 'activities'   => $this->trader_activities,
        ];
    }
}
