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
use Illuminate\Support\Facades\Hash;
class UserAccount extends Controller
{
    /*User Register Function*/
    public function store(Request $request){

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

     // ********************* User Account - Login Function ******************** //

     public function login(Request $request) {

        // * Validate Request * //
        $request->validate([
            'email' => 'required|string',
            'password' => 'required|string'
        ]);

        // * Check requested email address * //
        $user = User::where('email', $request->email)->first();
        if (is_null($user)) {
            $response['status'] = 0;
            $response['message'] = 'Your email address is not exists!';

        } else {

            // * Check user has confirm Verification * //
            if(!$user->hasVerifiedEmail())
            {
                $user->sendEmailVerificationNotification();

                $response['status'] = 0;
                $response['message'] = 'Check your email for confirmation!';

                return response()->json($response);
            }

            // * Check Password is matched * //
            if(!$user || !Hash::check($request->password, $user->password)){

                $response['status'] = 0;
                $response['message'] = 'Incorrect Credentials!';

                return response()->json($response);
            }

            // * Create new Login Token * //
            $token =  $user->createToken(Str::random(60))->plainTextToken;

            $response['status'] = 1;
            $response['data'] = ['id' => $user->id, 'firstname' => $user->firstname, 'lastname' => $user->lastname, 'status' => $user->status, 'type' =>  $user->type, 'token' => $token];

        }

        return response()->json($response);

    }
}
