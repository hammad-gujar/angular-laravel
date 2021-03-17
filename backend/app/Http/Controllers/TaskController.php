<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\Task;
use Validator;

class TaskController extends Controller
{
    public $successStatus = 200;
	/*
	* createTask
	* Create New task.
	*/
    public function createTask(Request $request){
    	$validator = Validator::make($request->all(), [
    		'title' => 'required',
    		'description' => 'required',
    	]);

    	if ($validator->fails()){
    		return response()->json(['error' => $validator->errors()], 401);
    	}

    	$newTask = new Task();
    	$newTask->title = $request->title;
    	$newTask->username = $request->username;
    	$newTask->status = $request->status;
    	$newTask->description = $request->description;
    	$newTask->save();


        return response()->json($this->fetchTask(), $this->successStatus);
    }

    public function fetchTask(){
    	//$tasks = array();
    	foreach (Task::all() as $task) {
    		// $t['title'] = $task->title;
    		// $ta['status'] = $task->status;
    		$tasks[$task->status][] = array(
                'id' => $task->id,
    			'title' => $task->title,
    			'description' => $task->description,
    			'status' => $task->status,
    			'username' => $task->username
    		);
    	}

    	return response()->json([$tasks], $this->successStatus);
    }

    public function updateTask(Request $request){
        $updateTask = Task::find($request->id);
        $updateTask->title = $request->title;
        $updateTask->description = $request->description;
        $updateTask->status = $request->status;
        $updateTask->save();

        return response()->json($this->fetchTask(), $this->successStatus);
    }

    public function deleteTask(Request $request){
        $updateTask = Task::find($request->id);
        $updateTask->delete();

        return response()->json($this->fetchTask(), $this->successStatus);
    }
}
