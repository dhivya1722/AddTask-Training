const taskInput: HTMLInputElement = document.getElementById("taskInput") as HTMLInputElement;
const addTaskBtn: HTMLButtonElement = document.getElementById("addTaskBtn") as HTMLButtonElement;
const taskList: HTMLUListElement = document.getElementById("taskList") as HTMLUListElement;

let tasks: string[] = [];

addTaskBtn.addEventListener("click", addTask);

function addTask() {
  const taskText: string = taskInput.value.trim();
  if (taskText !== "") {
    if (!tasks.includes(taskText)) {
      const li: HTMLLIElement = document.createElement("li");
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
      console.log(tasks);
      bindTaskEvents(li);
    } else {
      alert("Task already exists!");
    }
  } else {
    alert("Kindly Enter Task Name!!!!");
  }
}

function bindTaskEvents(taskItem: HTMLLIElement) {
  const checkbox: HTMLInputElement = taskItem.querySelector(".task-checkbox") as HTMLInputElement;
  const taskText: HTMLSpanElement = taskItem.querySelector(".task-text") as HTMLSpanElement;
  const statusDropdown: HTMLSelectElement = taskItem.querySelector(".status-dropdown") as HTMLSelectElement;
  const deleteBtn: HTMLButtonElement = taskItem.querySelector(".delete-btn") as HTMLButtonElement;

  checkbox.addEventListener("change", () => {
    taskText.classList.toggle("done", checkbox.checked);
    statusDropdown.value = checkbox.checked ? "done" : "todo";
  });

  statusDropdown.addEventListener("change", () => {
    taskText.classList.toggle("done", statusDropdown.value === "done");
    checkbox.checked = statusDropdown.value === "done";
  });

  deleteBtn.addEventListener("click", () => {
    const taskIndex: number = tasks.indexOf(taskText.innerText);
    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1);
    }
    taskItem.remove();
  });
}

const searchInput: HTMLInputElement = document.getElementById("searchInput") as HTMLInputElement;

searchInput.addEventListener("input", searchTasks);

function searchTasks() {
  const searchText: string = searchInput.value.trim().toLowerCase();

  // Loop through the tasks and show/hide based on the search text
  tasks.forEach((taskText, index) => {
    const taskItem: HTMLLIElement = taskList.children[index] as HTMLLIElement;
    const taskTextSpan: HTMLSpanElement = taskItem.querySelector(".task-text") as HTMLSpanElement;
    if (taskText.toLowerCase().includes(searchText)) {
      taskItem.style.display = "block";
    } else {
      taskItem.style.display = "none";
    }
  });
}
