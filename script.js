let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let mode = "all";

// Save to storage
function save() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Render
function render() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    let filtered = tasks.filter(task => {
        if (mode === "completed") return task.done;
        if (mode === "pending") return !task.done;
        return true;
    });

    let search = document.getElementById("search").value.toLowerCase();

    filtered
        .filter(t => t.text.toLowerCase().includes(search))
        .forEach((task, index) => {
            let li = document.createElement("li");
            li.className = `${task.priority.toLowerCase()} ${task.done ? "completed" : ""}`;

            li.innerHTML = `
                <span onclick="toggle(${index})">${task.text}</span>
                <div>
                    <button onclick="edit(${index})">✏️</button>
                    <button onclick="del(${index})">❌</button>
                </div>
            `;

            list.appendChild(li);
        });
}

// Add Task
document.getElementById("addBtn").onclick = () => {
    let text = document.getElementById("taskInput").value.trim();
    let priority = document.getElementById("priority").value;

    if (!text) return alert("Enter task!");

    tasks.push({ text, priority, done: false });
    save();
    render();
};

// Delete
function del(i) {
    tasks.splice(i, 1);
    save();
    render();
}

// Toggle complete
function toggle(i) {
    tasks[i].done = !tasks[i].done;
    save();
    render();
}

// Edit
function edit(i) {
    let newTask = prompt("Edit task:", tasks[i].text);
    if (newTask) {
        tasks[i].text = newTask;
        save();
        render();
    }
}

// Filter
function filterTasks(type) {
    mode = type;
    render();
}

// Search
document.getElementById("search").onkeyup = render;

// Dark Mode (persistent)
const darkBtn = document.getElementById("darkBtn");

if (localStorage.getItem("dark") === "true") {
    document.body.classList.add("dark");
}

darkBtn.onclick = () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("dark", document.body.classList.contains("dark"));
};

// Initial load
render();