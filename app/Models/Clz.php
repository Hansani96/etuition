<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Clz extends Model
{
    use HasFactory;
    protected $guarded = [];
    public $timestamp = true;
    
    //user as teacher relation
    public function teacher()
    {
        return $this->belongsTo(User::class,'user_id');
    }
}
