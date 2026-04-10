let i = 0;

let addbtn = document.querySelector("#addbtn");
let taskContainer = document.getElementById("taskcontainer");

// Adding event listener for 'Enter' key on input to add task
document.querySelector('#taskinput').addEventListener('keydown', function (e) {
  if (e.code === 'Enter') {
    addTask();
  }
});

addbtn.addEventListener("click", addTask); // In case you want to add via button as well

function addTask() {
  let taskInp = document.querySelector('#taskinput').value.trim();
  if (taskInp === "") return; // Avoid empty tasks

  i++;
  localStorage.setItem('taskid', i);

  // Input creation
  let inp = document.createElement("input");
  inp.setAttribute("type", "checkbox");
  inp.setAttribute("class", "checkinput");

  // Task Name creation
  let taskName = document.createElement("p");
  taskName.setAttribute("class", "taskname");
  taskName.contentEditable = false; // Correct usage
  taskName.textContent = taskInp;

  // Remove button creation
  let rembtn = document.createElement("button");
  rembtn.setAttribute("class", "rembtn");

  // Image Button creation inside remove button
  let remimg = document.createElement("img");
  remimg.setAttribute("class", "bin");
  remimg.setAttribute("src", "bin.png");
  remimg.setAttribute("alt", "remove");
  rembtn.appendChild(remimg);

  // Edit button creation
  let editbtn = document.createElement("button");
  editbtn.setAttribute("class", "editbtn");

  // Image Button creation inside edit button
  let editimg = document.createElement("img");
  editimg.setAttribute("class", "edit");
  editimg.setAttribute("src", "edit.png");
  editimg.setAttribute("alt", "edit");
  editbtn.appendChild(editimg);

  // Task container div
  let task = document.createElement("div");
  task.setAttribute("id", i);
  task.setAttribute("class", "task");

  task.appendChild(inp);
  task.appendChild(taskName);
  task.appendChild(editbtn);
  task.appendChild(rembtn);

  taskContainer.appendChild(task);

  // Clear input box after adding
  document.querySelector('#taskinput').value = "";

  // Remove button event
  rembtn.addEventListener("click", function () {
    taskContainer.removeChild(task);
  });

  // Edit button event
  editbtn.addEventListener("click", function (e) {
    // Toggle edit mode only for this taskName
    if (!taskName.isContentEditable) {
      taskName.contentEditable = true;
      taskName.style.borderColor = "black";
      taskName.focus();
    } else {
      taskName.contentEditable = false;
      taskName.style.borderColor = "#77dd77";
    }
    e.stopPropagation(); // Prevent triggering document click
  });

  rembtn.className = "action-btn";
  editbtn.className = "action-btn";

  // Disable edit when clicking outside the editbtn/taskName
  document.addEventListener("mousedown", function listener(e) {
    if (taskName.isContentEditable && !editbtn.contains(e.target) && e.target !== editbtn && e.target !== taskName) {
      taskName.contentEditable = false;
      taskName.style.borderColor = "#77dd77";
    }
  });

  inp.addEventListener('change', function() {
  if (inp.checked) {
    taskName.innerHTML = `<strike>${taskInp}</strike>`;
  } else {
    taskName.innerHTML = taskInp;
  }
});

}

