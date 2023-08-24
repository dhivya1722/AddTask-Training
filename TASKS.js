

        
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

var tasks = [];

addTaskBtn.addEventListener("click", addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    if (!tasks.includes(taskText)) {
    const li = document.createElement("li");
    li.innerHTML = `
    <div class="taskList">
      <input type="checkbox" class="task-checkbox">
      <span class="task-text">${taskText}</span>
      <select class="status-dropdown">
        <option value="todo">To Do</option>
        <option value="inprogress">In progress</option>
        <option value="done">Completed</option>
      </select>
      <button class="delete-btn">Delete</button>
    </div>
    `;
    taskList.appendChild(li);
    tasks.push(taskText);
    taskInput.value = "";
    console.log(tasks)
    bindTaskEvents(li);
    
  }else {
    alert("Task already exists!");
  }
}else{
      document.querySelector('#addTaskBtn').onclick = function(){
        if(document.querySelector('.task-container input').value.length == 0){
            alert("Kindly Enter Task Name!!!!")
  }
}
}

}

function bindTaskEvents(taskItem) {
  const checkbox = taskItem.querySelector(".task-checkbox");
  const taskText = taskItem.querySelector(".task-text");
  const statusDropdown = taskItem.querySelector(".status-dropdown");
  const deleteBtn = taskItem.querySelector(".delete-btn");

  checkbox.addEventListener("change", () => {
    taskText.classList.toggle("done", checkbox.checked);
    statusDropdown.value = checkbox.checked ? "done" : "todo";
  });

  statusDropdown.addEventListener("change", () => {
    taskText.classList.toggle("done", statusDropdown.value === "done");
    checkbox.checked = statusDropdown.value === "done";
  });

  deleteBtn.addEventListener("click", () => {
    const taskIndex = tasks.indexOf(taskText.innerText);
    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1);
    }
    taskItem.remove();
  });
}





const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", searchTasks);

function searchTasks() {
  const searchText = searchInput.value.trim().toLowerCase();

  // Loop through the tasks and show/hide based on the search text
  tasks.forEach((taskText, index) => {
    const taskItem = taskList.children[index];
    const taskTextSpan = taskItem.querySelector(".task-text");
    if (taskText.toLowerCase().includes(searchText)) {
      taskItem.style.display = "block";
    } else {
      taskItem.style.display = "none";
    }
  });
}
