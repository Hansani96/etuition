<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\DB;
class UserAccount extends Controller
{
    /*User Register Function*/
    public function store(){

        try{

            $user = User::create([
                'firstname' => $request->firstname,
                'lastname' => $request->lastname,

                'email' => $request->email,
                'password' => Hash::make($request->password),
                'phone' => $request->phone,
                // 'school' => $request->school,
                // 'year' => $request->year,
                'status' => 0,
                'type' => 0,
            ]);

        }catch (\Exception $e) {
            $response['status'] = 0;
            $response['error'] = $e;
            $response['message'] = 'Email has already been taken!';

            return response()->json($response);
        }

        event(new Registered($user));

        $response['status'] = 1;

        return response()->json($response);

    }
}
