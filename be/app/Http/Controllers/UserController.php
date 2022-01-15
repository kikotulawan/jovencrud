<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Task;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{ 
   public function __construct()
   {
       $this->middleware('auth:api', ['except' => ['login', 'storeUser']]);
   }

   public function login(Request $request)
   {
    if (! $token = auth('api')->attempt(['email' => $request->email, 'password' => $request->password])) {
        return response()->json(['error' => 'Unauthorized'], 401);
    }

       return $this->respondWithToken($token);
   }

   public function me()
   {
    $account = User::where('id',  \JWTAuth::user()->id)->first();
    return response()->json($account);
   }

   public function storeUser(Request $request)
   {
    $data = [
        'fname' => $request->fname,
        'lname' => $request->lname,
        'email' =>  $request->email,
        'password' => Hash::make($request->password),
    ];

    User::create($data);
    
    return response()->json(['msg' => 'User Added']);
   }

   public function storeTask(Request $request)
   {
    $data = [
        'title' => $request->title,
        'description' => $request->description,
        'status' => 'pending',
        'user_id' => auth('api')->user()->id,
    ];

    Task::create($data);
    
    return response()->json(['msg' => 'Task Added']);
   }

   public function updateTask(Request $request, $id)
   {
    $task = Task::find($id);
    $data = [
        'title' => $request->title,
        'description' => $request->description,
    ];

    $task->update($data);
    
    return response()->json(['msg' => 'Task Updated']);
   }
   
   public function completeTask($id)
   {
    $task = Task::find($id);
    $data = [
        'status' => 'completed',
    ];

    $task->update($data);
    
    return response()->json(['msg' => 'Task Updated']);
   }

   public function redoTask($id)
   {
    $task = Task::find($id);
    $data = [
        'status' => 'pending',
    ];

    $task->update($data);
    
    return response()->json(['msg' => 'Task Updated']);
   }

   public function deleteTask($id)
   {
    Task::destroy($id);
    return response()->json(['msg' => 'Task Deleted']);
   }

   public function getTask()
   {
    $account = Task::where('user_id', auth('api')->user()->id)->get();
    
    // if(!empty($account)){
    //     $tasks = Task::whereHas('owner', function($query){
    //         $query->where('id', $account->id);
    //     })->get();
    //     return response()->json($tasks);
    // }

    return response()->json($account);
   }

   public function logout()
   {
       auth()->logout();

       return response()->json(['message' => 'Successfully logged out']);
   }

   public function refresh()
   {
       return $this->respondWithToken(auth()->refresh());
   }

   protected function respondWithToken($token)
   {
       return response()->json([
           'access_token' => $token,
           'token_type' => 'bearer',
           'expires_in' => auth()->factory()->getTTL() * 60,
           'user' => auth('api')->user(),
       ]);
   }
   }