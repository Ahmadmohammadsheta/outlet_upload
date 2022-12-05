<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $eskanCompany  = $this->whenLoaded('eskanCompany');
        $levels        = $this->whenLoaded('levels');
        $units         = $this->whenLoaded('units');

        return [
            'id'            => $this->id,
            'name'          => $this->name,
            'eskanCompany'  => new EskanCompanyResource($eskanCompany),
            'levels'        => LevelResource::collection($levels),
            'units'         => UnitResource::collection($units),
        ];
    }
}
