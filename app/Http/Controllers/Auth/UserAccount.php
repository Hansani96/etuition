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
use Illuminate\Support\Facades\Validator;
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
                'status' => 1,
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
        if($user->status=="0"){
            $response['status'] = 0;
            $response['message'] = 'Your Account is De-Active !';
            return response()->json($response);
        }
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
            $response['data'] = ['id' => $user->id, 'firstname' => $user->firstname, 'lastname' => $user->lastname, 'status' => $user->status, 'type' =>  $user->type, 'token' => $token,'pro_url'];
            $response['user'] = $user;

        }

        return response()->json($response);

    }

     // ********************* User Account - Logout Function ******************* //

     public function logout(Request $request) {

        // $request->user()->currentAccessToken()->delete();
        $request->user()->tokens()->delete();

        $response['status'] = 1;
        $response['message'] = 'Logout Successful!';

        return response()->json($response);

    }

    public function get_all_teachers(){
        try{

            $allUser = User::where('type', 0)->get();
            $response['data'] = $allUser;
            return response()->json($response);

        }catch (\Exception $e) {
            $response['status'] = 0;
            $response['error'] = $e;
            $response['message'] = 'Error Getting User Info!';

            return response()->json($response);
        }

    }

    public function ActivateUser ($id, Request $request) {
        $user = User::find($id);

        try {
            if ($request->status === 0) {
                $user->forceFill([
                    'status' => '1'
                ]);

                $response['status'] = 1;

            } else if ($request->status === 1) {
                $user->forceFill([
                    'status' => '0',
                ]);

                $response['status'] = 1;

            }
            $user->save();
        } catch (\Exception $e) {
            $response['status'] = 0;
        }

        return response()->json($response);
    }

    public function update(Request $request, $id) {
        $user = User::find($id);
        if (is_null($user)) {
            $response['status'] = 0;
        }

        if ($request->password === null) {
            $user->forceFill([
                'firstname' => $request->firstname,
                'lastname' => $request->lastname,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'phone' => $request->phone,
            ]);
        } else {
            $user->forceFill([
                'password' => Hash::make($request->password),
            ]);
        }

        $user->save();

        $response['status'] = 1;
        return response()->json($response);
    }

    public function show_admin_profile($id) {

        $user = User::where('id', $id)->get(); // Retrieve all the data which user_id = $id

        $response['data'] = $user;

        return response()->json($response);
    }

    public function get_total_number_of_student(){

        $student_count =  DB::table('users')->where('type',  0)->count();
        return $student_count;
    }

    public function show_admin_profiles($id) {

        $user = User::where('id', $id)->get(); // Retrieve all the data which user_id = $id

        $response['data'] = $user;

        return response()->json($response);
    }

    public function update_password(Request $request){

        $rules=array(
            'oldpassword' => 'required',
            'password' => 'required|min:6|max:10',
            'password_confirmation' => 'required|same:password'


        );
        $messages=array(
            'oldpassword.required' => 'Please enter a Old Password.',
            'password.required' => 'Please enter a  Password.',
            'password.min' => 'Please enter Minimum 6 characters.',
            'password.max' => 'Please enter Maximum 10 characters.',
            'password_confirmation.required' => 'Please enter Confirm Password Filed',
            'password_confirmation.same' => 'Confirm Password and Password Does not Match',

        );
        $validator=Validator::make($request->all(),$rules,$messages);
        if($validator->fails())
        {
            $messages=$validator->messages();
            $errors=$messages->all();
            $response['error'] = $errors;
            return response()->json($response);
        }
        $current_user = auth()->user();
        if(Hash::check($request->oldpassword,$current_user->password)){
            $current_user->update([
                'password' =>Hash::make($request->password)
            ]);
            $response['success'] = 'Password Sucessfully Update';
            return response()->json($response);

        }else{
            $errors = 'Old password dose not match with system records';
            $response['psw_error'] =  $errors ;
            return response()->json($response);
        }
    }


    public function update_my_profile(Request $request){
        //return response()->json($request);

        if ($request->hasFile('profile')) {


            $validator = Validator::make($request->all(), [
                'profile' => ['max:5245.329', 'mimes:jpeg'], // ? Max : 5 MB & MIME : Only JPG
            ]);

            if ($validator->fails()) {

                $response['status'] = 0;

            } else {

                try {
                $current_user = auth()->user();

                if($current_user->profile_access_link != null){
                    $CurrentUrl = $current_user->profile_access_link;
                    Storage::delete('public/profile/'.$CurrentUrl); //
                }

                $ImageName = $request->profile->hashName();
                $request->profile->store('public/profile');

                $current_user->forceFill([
                    'firstname' => $request->firstname,
                    'lastname' => $request->lastname,
                    'bio' => $request->bio,
                    'phone' => $request->phone,

                    'profile_access_link' => $ImageName,
                ]);

                $current_user->save();

                $response['status'] = 1;

                } catch (\Exception $e) {
                    $response['status'] = 0;
                    $response['error'] = $e;
                }
            }
        }  else {
            try {
                $current_user = auth()->user();

                $current_user->forceFill([
                    'firstname' => $request->firstname,
                    'lastname' => $request->lastname,
                    'bio' => $request->bio,
                    'phone' => $request->phone,

                ]);

                $current_user->save();

                $response['status'] = 1;

                } catch (\Exception $e) {
                    $response['status'] = 0;
                    $response['error'] = $e;
                }
        }
        return response()->json($response);
    }




}
