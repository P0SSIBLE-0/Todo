let addbtn = document.querySelector('#addtask');
showtask()
addbtn.addEventListener("click", () =>{
    let newtask = document.getElementById("newtext").value;
    let tasks = localStorage.getItem("tasks");
    if(tasks === null){
        taskObj = [];
    }
    else if(newtask.length == 0){
        alert("Please! add some task")
    }
    else{
        taskObj = JSON.parse(tasks);
        console.log(taskObj)
        taskObj.push(newtask);
        localStorage.setItem("tasks",JSON.stringify(taskObj));
        showtask()
        newtask = "";
    }
})

function showtask(){
    let tasks = localStorage.getItem("tasks");
    if(tasks === null){
        taskObj = [];
    }
    else{
        taskObj = JSON.parse(tasks);
    }
    let html = "";
    taskObj.forEach((e,i) => {
        
        html += `<div class="task">
                   <span>${e}</span>
                   <button class="delete" id ="${i}" onclick="deltask(${i})"> X </button>
       </div>`
    });
    let txtfield = document.getElementById('task-box')
    if(taskObj.length ==  0){
        txtfield.innerHTML = `<div class="task">
        <span>Nothing to show add some task!</span>
</div>`
    }
    else{
        txtfield.innerHTML = html;
    }
    localStorage.setItem("tasks",JSON.stringify(taskObj));
}
// function for delete the task
const deltask = (i) =>{
    let tasks = localStorage.getItem("tasks");
    if(tasks === null){
        taskObj = [];
    }
    else{
        taskObj = JSON.parse(tasks);
    }
    taskObj.splice(i , 1);
    localStorage.setItem("tasks",JSON.stringify(taskObj));
    showtask()

}
// function for clear the tasks
const delAll=()=>{
    localStorage.clear();
    showtask()
}