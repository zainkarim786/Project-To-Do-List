const readline = require('readline');

interface Task {
    id: number;
    description: string;
    completed: boolean;
}

class ToDoList {
    private tasks: Task[] = [];
    private nextId: number = 1;

    addTask(description: string): void {
        const task: Task = { id: this.nextId++, description, completed: false };
        this.tasks.push(task);
        console.log(`Added task: "${description}"`);
    }

    completeTask(id: number): void {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.completed = true;
            console.log(`Completed task: "${task.description}"`);
        } else {
            console.log(`Task with id ${id} not found.`);
        }
    }

    listTasks(): void {
        console.log("To-Do List:");
        this.tasks.forEach(task => {
            const status = task.completed ? "✓" : "✗";
            console.log(`${task.id}. [${status}] ${task.description}`);
        });
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const toDoList = new ToDoList();

const showMenu = () => {
    console.log("\nMenu:");
    console.log("1. Add task");
    console.log("2. Complete task");
    console.log("3. List tasks");
    console.log("4. Exit");
    rl.question('Choose an option: ', (option: string) => {
        handleOption(option);
    });
};

const handleOption = (option: string) => {
    switch (option) {
        case '1':
            rl.question('Enter task description: ', (description: string) => {
                toDoList.addTask(description);
                showMenu();
            });
            break;
        case '2':
            rl.question('Enter task id to complete: ', (idStr: string) => {
                const id = parseInt(idStr, 10);
                if (isNaN(id)) {
                    console.log('Please enter a valid task id.');
                } else {
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
