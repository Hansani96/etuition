<?php

namespace App\Http\Controllers;
use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\File;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\DB;
class NewsController extends Controller
{
   public function create(Request $request){

        $news = new News();
        $file = $request->news_banner;
        $extension = $file->getClientOriginalExtension();
        if($extension == 'jpg' || $extension == 'JPG' || $extension == 'jpeg' || $extension == 'JPEG'){
            $news->news_cat = $request->news_cat;
            $news->head_line = $request->head_line;
            $upload_files = $file->store('public/news/');
            $news->news_banner	 = $file->hashName();
            $news->is_publish	 = 1;
            $current_user = auth()->user();
            $news->des	 =$request->des;
            $news->user_id	 =$current_user->id;
            $news->save();
            $response['status'] = 1;
            $response['message'] = 'News add Successfully';
            return response()->json($response);


        }else{
            $response['status'] = 0;
            $response['message'] = $extension.' Extension Type Does not Support..! ';
            return response()->json($response);
        }
   }

   public function get_news(){
    try{
        $data=News::all();
        $response['status'] = 1;
        $response['data'] = $data;
        return response()->json($response);
     }
     catch(\Exception $e){
        $response['status'] = 0;
        $response['message'] = 'Error!!';
        return response()->json($response);

     }
   }

   public function publish_news_un_publish_news( Request $request){

    $news = News::find($request->id);

     try {
        if ($request->is_publish =="0") {
            $news->forceFill([
                'is_publish' => '1'
            ]);


        } else if ($request->is_publish == "1") {
            $news->forceFill([
                'is_publish' => '0',
            ]);



        }
        $news->save();
        $response['status'] = 1;
        return response()->json($response);

    } catch (\Exception $e) {
        $response['status'] = 0;
        return response()->json($response);
    }


   }

   public function get_single_news($id){
    try{
        // return($id);
         $data = News::find($id);
       //  return($data);
         if(is_null($data))
         {
             $response['status'] = 0;
             $response['message'] = 'News Dose not Exits';
             return response()->json($response);
         }
         $response['data'] = $data;
         return response()->json($response);

     }
     catch(\Exception $e){
         $response['status'] = 0;
        // $response['error'] = $e;
         $response['message'] = 'News not found';
         return response()->json($response);
     }
   }

   public function update(Request $request){
    $update_news = News::find($request->id);
    if(is_null($update_news)){

        $response['status'] = 0;
        $response['message'] = 'News Dose not Exits';
        return response()->json($response);
    }
    else{

        if ($request->hasFile('news_banner')) {
            $file = $request->news_banner;
            $extension = $file->getClientOriginalExtension();
            if($extension == 'jpg' || $extension == 'JPG' || $extension == 'jpeg' || $extension == 'JPEG'){
                $filename= $update_news->news_banner;
                $file_del = Storage::delete('public/news/'.$filename);
                $file =$request->news_banner;
                $upload_files = $file->store('public/news/');

                $update_news->news_cat=$request->news_cat;
                $update_news->head_line=$request->head_line;
                $update_news->news_banner = $file->hashName();
                $update_news->des = $request->des;
                $update_news->save();
                $response['status'] = 1;
                $response['message'] = 'News Update Successfully';
                return response()->json($response);
            }
            else{
                $response['status'] = 0;
                $response['message'] = $extension.' Extension Type Does not Support..! ';
                return response()->json($response);
            }
        }
        else{
            $update_news->news_cat=$request->news_cat;
            $update_news->head_line=$request->head_line;
            $update_news->des = $request->des;
            $update_news->save();
            $response['status'] = 1;
            $response['message'] = 'News Update Successfully';
            return response()->json($response);
        }
    }
   }

   public function get_new_for_landing(){
       $data = DB::table('news')->where('is_publish',  1)->orderBy('id', 'DESC')->get();
       $response['data'] = $data;
       $response['status'] = 1;
       $response['message'] = 'News Update Successfully';
       return response()->json($response);
   }

   public function get_recent_news(){
    $news = News::latest()->take(5)->get();
    $response['data'] = $news;

    return response()->json($response);
   }

  

}
