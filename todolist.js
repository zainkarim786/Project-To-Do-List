var readline = require('readline');
var ToDoList = /** @class */ (function () {
    function ToDoList() {
        this.tasks = [];
        this.nextId = 1;
    }
    ToDoList.prototype.addTask = function (description) {
        var task = { id: this.nextId++, description: description, completed: false };
        this.tasks.push(task);
        console.log("Added task: \"".concat(description, "\""));
    };
    ToDoList.prototype.completeTask = function (id) {
        var task = this.tasks.find(function (task) { return task.id === id; });
        if (task) {
            task.completed = true;
            console.log("Completed task: \"".concat(task.description, "\""));
        }
        else {
            console.log("Task with id ".concat(id, " not found."));
        }
    };
    ToDoList.prototype.listTasks = function () {
        console.log("To-Do List:");
        this.tasks.forEach(function (task) {
            var status = task.completed ? "✓" : "✗";
            console.log("".concat(task.id, ". [").concat(status, "] ").concat(task.description));
        });
    };
    return ToDoList;
}());
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var toDoList = new ToDoList();
var showMenu = function () {
    console.log("\nMenu:");
    console.log("1. Add task");
    console.log("2. Complete task");
    console.log("3. List tasks");
    console.log("4. Exit");
    rl.question('Choose an option: ', function (option) {
        handleOption(option);
    });
};
var handleOption = function (option) {
    switch (option) {
        case '1':
            rl.question('Enter task description: ', function (description) {
                toDoList.addTask(description);
                showMenu();
            });
            break;
        case '2':
            rl.question('Enter task id to complete: ', function (idStr) {
                var id = parseInt(idStr, 10);
                if (isNaN(id)) {
                    console.log('Please enter a valid task id.');
                }
                else {
                    toDoList.completeTask(id);
                }
                showMenu();
            });
            break;
        case '3':
            toDoList.listTasks();
            showMenu();
            break;
        case '4':
            rl.close();
            break;
        default:
            console.log('Invalid option, please try again.');
            showMenu();
            break;
    }
};
showMenu();
