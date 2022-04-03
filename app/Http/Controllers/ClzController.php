<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Clz;
use App\Models\User;

use Illuminate\Support\Facades\Storage;
use Illuminate\Http\File;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\DB;
class ClzController extends Controller
{
    //
    public function create_clz(Request $request){
        $clz = new Clz();
        $file = $request->banner;
        $extension = $file->getClientOriginalExtension();
        if($extension == 'jpg' || $extension == 'JPG' || $extension == 'jpeg' || $extension == 'JPEG'){
            $clz->user_id = $request->user_id;
            $clz->clz_name = $request->clz_name;
            $clz->year = $request->year;
            $clz->grade = $request->grade;
            $clz->subject = $request->subject;
            $clz->fee = $request->fee;
            $clz->address = $request->address;
            $clz->des = $request->des;
            $upload_files = $file->store('public/clz/');
            $clz->banner	 = $file->hashName();
            $clz->status = 1;
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

    public function get_teachers(){
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

    public function get_all_clzs(){
        try{
            $clazs = Clz::with('teacher')->get();
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

    public function change_status(Request $request){
        $clz = Clz::find($request->id);

        try {
           if ($request->is_publish =="0") {
               $clz->forceFill([
                   'status' => '1'
               ]);


           } else if ($request->is_publish == "1") {
               $clz->forceFill([
                   'status' => '0',
               ]);



           }
           $clz->save();
           $response['status'] = 1;
           return response()->json($response);

       } catch (\Exception $e) {
           $response['status'] = 0;
           return response()->json($response);
       }

    }

    public function get_all_unpublish_clzs(){
        try{
            $clazs = Clz::where('status', 0)->with('teacher')->get();
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
                        $update_clz->user_id=$request->user_id;
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
                    $update_clz->user_id=$request->user_id;
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

       public function get_all_publish_clzs(){
        try{
            $clazs = Clz::where('status', 1)->with('teacher')->orderBy('id','DESC')->get();
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

    public function get_landing_adds(){

        try{
            $clazs = Clz::where('status', 1)->with('teacher')->orderBy('id','DESC')->take(5)->get();
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

    public function get_recent_clzs(){
        $news = Clz::take(5)->get();
        $response['data'] = $news;

        return response()->json($response);
    }


}
