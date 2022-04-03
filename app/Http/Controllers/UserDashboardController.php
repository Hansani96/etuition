<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Clz;
use App\Models\User;
use App\Models\News;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\File;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Auth\Events\Registered;

use Illuminate\Support\Facades\Notification;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
class UserDashboardController extends Controller
{
    public function create_clz_by_teacher(Request $request){

        $clz = new Clz();
        $file = $request->banner;
        $extension = $file->getClientOriginalExtension();
        if($extension == 'jpg' || $extension == 'JPG' || $extension == 'jpeg' || $extension == 'JPEG'){
            $current_user = auth()->user();
            $clz->user_id = $current_user->id;
            $clz->clz_name = $request->clz_name;
            $clz->year = $request->year;
            $clz->grade = $request->grade;
            $clz->subject = $request->subject;
            $clz->fee = $request->fee;
            $clz->address = $request->address;
            $clz->des = $request->des;
            $upload_files = $file->store('public/clz/');
            $clz->banner	 = $file->hashName();
            $clz->status = 0;
            $clz->save();
            $response['status'] = 1;
            $response['message'] = 'Class add Successfully';
            return response()->json($response);
        }
        else{
            $response['status'] = 0;
            $response['message'] = $extension.' Extension Type Does not Support..! ';
            return response()->json($response);
        }
    }


    public function get_single_clz_user($id){
        try{
            $clazs = Clz::where('user_id', $id)->get();
            $response['data'] = $clazs;
            return response()->json($response);

        }
        catch (\Exception $e) {

            $response['status'] = 0;
            $response['error'] = $e;
            $response['message'] = 'Error Getting Class Info!';
            return response()->json($response);
        }
    }

     public function get_single_clz($id){
        try{
            // return($id);
             $data = Clz::find($id);
           //  return($data);
             if(is_null($data))
             {
                 $response['status'] = 0;
                 $response['message'] = 'Class Dose not Exits';
                 return response()->json($response);
             }
             $response['data'] = $data;
             return response()->json($response);

         }
         catch(\Exception $e){
             $response['status'] = 0;
            // $response['error'] = $e;
             $response['message'] = 'Class not found';
             return response()->json($response);
         }
       }

       public function update(Request $request){
        $update_clz = Clz::find($request->id);
        if(is_null($update_clz )){

            $response['status'] = 0;
            $response['message'] = 'News Dose not Exits';
            return response()->json($response);
        }
        else{

            if ($request->hasFile('banner')) {
                $file = $request->banner;
                $extension = $file->getClientOriginalExtension();
                if($extension == 'jpg' || $extension == 'JPG' || $extension == 'jpeg' || $extension == 'JPEG'){
                    $filename= $update_clz->banner;
                    $file_del = Storage::delete('public/clz/'.$filename);
                    $file =$request->banner;
                    $upload_files = $file->store('public/clz/');

                    $update_clz->clz_name=$request->clz_name;
                    $update_clz->year = $request->year;
                    $update_clz->grade = $request->grade;

                    $update_clz->subject = $request->subject;
                    $update_clz->fee = $request->fee;
                    $update_clz->address = $request->address;
                    $update_clz->des = $request->des;
                    $upload_files = $file->store('public/clz/');
                    $update_clz->banner	 = $file->hashName();
                    $update_clz->save();
                    $response['status'] = 1;
                    $response['message'] = 'Class Update Successfully';
                    return response()->json($response);
                }
                else{
                    $response['status'] = 0;
                    $response['message'] = $extension.' Extension Type Does not Support..! ';
                    return response()->json($response);
                }
            }
            else{
                $update_clz->clz_name=$request->clz_name;
                $update_clz->year = $request->year;
                $update_clz->grade = $request->grade;
                $update_clz->subject = $request->subject;
                $update_clz->fee = $request->fee;
                $update_clz->address = $request->address;
                $update_clz->des = $request->des;
                $update_clz->save();
                $response['status'] = 1;
                $response['message'] = 'Class Update Successfully';
                return response()->json($response);
            }

        }
   }

   public function show_teacher_profiles($id) {

    $user = User::where('id', $id)->get(); // Retrieve all the data which user_id = $id

    $response['data'] = $user;

    return response()->json($response);
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

public function get_total_number_of_student(){

    $student_count =  DB::table('users')->where('type',  0)->count();
    return $student_count;
}

public function get_recent_news(){
    $news = News::latest()->take(5)->get();
    $response['data'] = $news;

    return response()->json($response);
   }

   public function get_recent_clzs(){
    $news = Clz::take(5)->get();
    $response['data'] = $news;

    return response()->json($response);
}

}
