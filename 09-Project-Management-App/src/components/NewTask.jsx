import { useState } from "react"

export default function NewTask({onAdd}){

 const [enteredTask,setEnteredTask]=useState('');

 function handleClick(){
    if(enteredTask.trim()===''){
        return;
    }
    onAdd(enteredTask)
    setEnteredTask('');

 }
 function handleChange(event){
    setEnteredTask(event.target.value)
 }


    return(

        <div className="flex items-center gap-4">
            <input type="text" className="w-64 py-1 px-2 rounded-sm bg-stone-200" onChange={handleChange} value={enteredTask}/>
            <button onClick={handleClick} className="text-stone-700 hover:text-stone-950">Add Task</button>
        </div>
    )
}