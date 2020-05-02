const { app, ipcMain, BrowserWindow } = require('electron');
const electronStorage = require('./dataElectronStorage');

const todosData = new electronStorage({ name: 'Todos Main' })
function createGeneralWindow() {
    let window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })
    // window.webContents.openDevTools()
    // window.send('todos', todosData.todos)
    window.loadFile('./renderer/index.html');
    // window.send('todos', todosData.todos)
    // window.once('show', () => {
    //     const savedTodos = todosData.getTodos();
    //     window.send('todos', todosData.todos)
    //     console.log(savedTodos.todos);
    // })

    let addTodoWindow;
    ipcMain.on('add-todo-window', () => {
        // if addTodoWin does not already exist
        if (!addTodoWindow) {
            // create a new add todo window
            addTodoWindow = new BrowserWindow({
                width: 300,
                height: 200,
                parent: window,
                webPreferences: {
                    nodeIntegration: true
                }
            })
            addTodoWindow.loadFile('./renderer/addTodo.html');

            // cleanup
            addTodoWindow.on('closed', () => {
                addTodoWindow = null
            })
        }
    })

    // add-todo from add todo window
    ipcMain.on('add-todo', (event, todo) => {
        const updatedTodos = todosData.addTodo(todo).todos
        window.send('todos', updatedTodos)
    })

    // delete-todo from todo list window
    ipcMain.on('delete-todo', (event, todo) => {
        const updatedTodos = todosData.deleteTodo(todo).todos

        window.send('todos', updatedTodos)
    })
}
app.on('ready', createGeneralWindow)