<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;

class ForgotPasswordController extends Controller
{
    // * User Account - Forgot Password Function
    function ForgotPassword (Request $request) {
        try {
            $request->validate([
                'email' => 'required|email',
            ]);

            $user = User::where('email', $request->email)->first();

            if(!$user){
                $response['status'] = 0;

                return response()->json($response);
            }

            $email = $request->email;

            Password::sendResetLink(
                $request->only('email')
            );

            $response['status'] = 1;

            return response()->json($response);

        } catch (\Exception $e) {
            return response()->json($e);
        }
    }

    // User Account - Password Reset Function
    function ForgotPasswordReset (Request $request) {

        $request->validate([
            'token' => 'required',
            'password' => 'required',
        ]);


        $status = Password::reset(
            $request->only('email', 'password', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(Str::random(60));

                $user->save();

                event(new PasswordReset($user));
            }
        );

        $response['status'] = 1;
        $response['message'] = 'Password Reset successfully';

        return response()->json($response);
    }
}
