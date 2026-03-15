// Load tasks from browser storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Run display when page loads
displayTasks();

// Add new task
function addTask(){

let input = document.getElementById("taskInput");
let text = input.value.trim();

if(text === ""){
alert("Enter a task");
return;
}

tasks.push({
text:text,
completed:false
});

saveTasks();
displayTasks();

input.value="";

}

// Show tasks on screen
function displayTasks(){

let list = document.getElementById("taskList");
list.innerHTML="";

tasks.forEach((task,index)=>{

let li = document.createElement("li");

li.innerHTML = `
<input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleTask(${index})">

<span class="${task.completed ? "done" : ""}">${task.text}</span>

<button class="edit" onclick="editTask(${index})">
<i class="fa-solid fa-pen"></i>
</button>

<button class="delete" onclick="removeTask(${index})">
<i class="fa-solid fa-trash"></i>
</button>
`;

list.appendChild(li);

});

// Update remaining tasks counter
let remaining = tasks.filter(task => !task.completed).length;

document.getElementById("taskCounter").innerText =
remaining + " tasks remaining";

// Progress bar calculation
let completed = tasks.filter(task => task.completed).length;

let percent = tasks.length === 0 ? 0 : Math.round((completed / tasks.length) * 100);

document.getElementById("progressBar").style.width = percent + "%";

document.getElementById("progressText").innerText = percent + "%";

}

// Toggle completed state
function toggleTask(index){

tasks[index].completed = !tasks[index].completed;

saveTasks();
displayTasks();

}

// Delete task
function removeTask(index){

tasks.splice(index,1);

saveTasks();
displayTasks();

}

// Edit task
function editTask(index){

let newTask = prompt("Edit your task:", tasks[index].text);

if(newTask !== null && newTask.trim() !== ""){

tasks[index].text = newTask.trim();

saveTasks();
displayTasks();

}

}

// Save tasks to browser
function saveTasks(){

localStorage.setItem("tasks", JSON.stringify(tasks));

}

// Drag and reorder tasks
let sortable = new Sortable(taskList, {

animation:200,

onEnd:function(evt){

let movedItem = tasks.splice(evt.oldIndex,1)[0];
tasks.splice(evt.newIndex,0,movedItem);

saveTasks();

}

});

// Dark mode toggle
let darkToggle = document.getElementById("darkToggle");

darkToggle.onclick = function(){

document.body.classList.toggle("dark");

};

// Press Enter to add task
document.getElementById("taskInput").addEventListener("keypress",function(e){

if(e.key === "Enter"){
addTask();
}

});