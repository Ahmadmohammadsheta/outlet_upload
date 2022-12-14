<?php

namespace App\Http\Resources;

use App\Models\LevelImage;
use Illuminate\Http\Resources\Json\JsonResource;

class LevelResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $units   = $this->whenLoaded('units');
        $traders = $this->whenLoaded('traders');
        $project = $this->whenLoaded('project');
        return [
            'id'           => $this->id,
            'name'         => $this->name,
            'project'      => new ProjectResource($project),
            'project_id'   => $this->project->id,
            'project_name' => $this->project->name,
            'units'        => UnitResource::collection($units),
            'traders'      => TraderResource::collection($traders),
            'images'       => LevelImageResource::collection($this->levelImages),
        ];
    }
}
