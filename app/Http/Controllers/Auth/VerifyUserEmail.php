<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
class VerifyUserEmail extends Controller
{
    // // User Account Email Verification Function
    public function EmailVerify ($user_id, Request $request) {

        // Check Url signature is invalid or Expired
        if (!$request->hasValidSignature()) {

            $response['status'] = 0;
            $response['message'] = ['Invalid or Expired url provided!', 401];

            return response()->json($response);
        }

        // Find the User account by ID
        $user = User::findOrFail($user_id);

        if (!$user->hasVerifiedEmail()) {
            $user->markEmailAsVerified();
        }

        return view('welcome');

    }


    public function EmailVerifyNotice () {
        return view('auth.verify-email');

    }

    // Not need Yet <CAN be Removed>
    public function ResendVerify () {
        if (auth()->user()->hasVerifiedEmail()) {
            return response()->json(["msg" => "Email already verified."], 400);
        }

        auth()->user()->sendEmailVerificationNotification();

        return response()->json(["msg" => "Email verification link sent on your email id"]);

    }
}
