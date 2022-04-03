<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\VerifyUserEmail;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\UserAccount;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\ClzController;
use App\Http\Controllers\UserDashboardController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('/user/register', [UserAccount::class, 'store']);
Route::get('/email/verify', [VerifyUserEmail::class, 'EmailVerifyNotice'])->name('verification.notice');
Route::get('/email/verify/{id}/{hash}', [VerifyUserEmail::class, 'EmailVerify'])->name('verification.verify');
Route::post('/user/login', [UserAccount::class, 'login']);
Route::post('/user/logout', [UserAccount::class, 'logout'])->middleware('auth:sanctum');
Route::post('/forgot-password', [ForgotPasswordController::class, 'ForgotPassword'])->middleware('guest')->name('password.forgot');
Route::post('/reset-password', [ForgotPasswordController::class, 'ForgotPasswordReset'])->middleware('guest')->name('password.reset');
route::get('get-news-for-landing',[NewsController::class,'get_new_for_landing']);
route::get('get-all-clz',[ClzController::class,'get_all_publish_clzs']);
route::get('get-landing-adds',[ClzController::class,'get_landing_adds']);

// get_landing_adds
//get_all_publish_clzs
// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group(['middleware' => ['auth:sanctum','admin','verified']], function() {

    Route::get('get-teachers',[UserAccount::class,'get_all_teachers']);
    Route::put('/user/update/activate/{id}', [UserAccount::class, 'ActivateUser']);
    Route::put('/user/update/{id}', [UserAccount::class, 'update']);
    route::get('show-my-profile/{id}',[UserAccount::class,'show_admin_profile']);
    route::get('get_teacher_count',[UserAccount::class,'get_total_number_of_student']);
    Route::post('/create-news', [NewsController::class, 'create']);
    route::get('get-news',[NewsController::class,'get_news']);
    route::post('publish-un-publish',[NewsController::class,'publish_news_un_publish_news']);
    route::get('get-single-news/{id}',[NewsController::class,'get_single_news']);
    route::post('update-news',[NewsController::class,'update']);
    Route::get('get-recent-news',[NewsController::class,'get_recent_news']);
    route::post('update-password',[UserAccount::class,'update_password']);
    route::get('show-my-profile/{id}',[UserAccount::class,'show_admin_profiles']);
    route::post('update-profile-form',[UserAccount::class,'update_my_profile']);
    route::post('create-clz',[ClzController::class,'create_clz']);
    route::get('get-teacher-for-clz',[ClzController::class,'get_teachers']);
    route::get('get-all-clzs',[ClzController::class,'get_all_clzs']);
    route::post('change-status',[ClzController::class,'change_status']);
    route::get('get-all-unpublish-clzs',[ClzController::class,'get_all_unpublish_clzs']);
    route::get('get-single-clz/{id}',[ClzController::class,'get_single_clz']);
    route::post('update-clz',[ClzController::class,'update']);
    route::get('get-recent-clz',[ClzController::class,'get_recent_clzs']);
    //change_status

});


Route::group(['middleware' => ['auth:sanctum','user','verified']], function() {
    route::post('create-clz-teacher',[UserDashboardController::class,'create_clz_by_teacher']);
    route::get('get-single-clz-by-user/{id}',[UserDashboardController::class,'get_single_clz_user']);
    route::get('get-user-single-clz/{id}',[UserDashboardController::class,'get_single_clz']);
    route::post('update-user-clz',[UserDashboardController::class,'update']);
    route::get('show-teacher-profile/{id}',[UserDashboardController::class,'show_teacher_profiles']);
    route::post('update-teacher-profile-form',[UserDashboardController::class,'update_my_profile']);
    route::post('update-teacher-password',[UserDashboardController::class,'update_password']);
    route::get('get_teacher_db_count',[UserDashboardController::class,'get_total_number_of_student']);
    Route::get('get-recent-new-t',[UserDashboardController::class,'get_recent_news']);
    route::get('get-recent-clz_t',[UserDashboardController::class,'get_recent_clzs']);
    //show_teacher_profiles
});
