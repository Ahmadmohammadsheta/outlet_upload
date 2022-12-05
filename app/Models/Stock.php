<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    use HasFactory;

    protected $appends = [
        'stock_item',
        'stock_trader',
        'stock_color',
        'stock_size',
        'stock_volume',
        'stock_season',
        'stock_weight',
        ];

        protected $hidden = [
            'created_at',
            'updated_at'
        ];

        protected $visible = [
        ];


    protected $fillable  = [
        'item_id',
        'trader_id',
        'buy_price',
        'buy_discount',
        'sale_price',
        'available',
        'color_id',
        'size_id',
        'weight_id',
        'volume_id',
        'season_id',
        'manufacture_date',
        'expire_date',
        'code',
        'starting_stock',
        'min_quantity',
        'barcode',
        'spare_barcode',
        'discount',
        'discount_start_date',
        'discount_end_date',
        'stock',
        ];

    public function item()
    {
        return $this->belongsTo(Item::class);
    }

    public function color()
    {
        return $this->belongsTo(Color::class);
    }

    public function size()
    {
        return $this->belongsTo(Size::class);
    }

    public function weight()
    {
        return $this->belongsTo(Weight::class);
    }

    public function season()
    {
        return $this->belongsTo(Season::class);
    }

    public function volume()
    {
        return $this->belongsTo(Volume::class);
    }
/**
 * Getter && Setter
 */
    public function getStockItem()
    {
        return $this->item;
    }

    public function getStockTrader()
    {
        return $this->trader ? $this->trader  : false;
    }

    public function getStockColor()
    {
        return $this->color ? $this->color : false;
    }

    public function getStockSize()
    {
        return $this->size ? $this->size : false;
    }

    public function getStockWeight()
    {
        return $this->weight ? $this->weight : false;
    }

    public function getStockVolume()
    {
        return $this->volume ? $this->volume : false;
    }

    public function getStockSeason()
    {
        return $this->season ? $this->season : false;
    }

}
