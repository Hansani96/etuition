<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    use HasFactory;
    protected $guarded = [];
    public $timestamp = true;

     public function users()
     {
         return $this->belongsTo(User::class,'user_id');
     }
}
