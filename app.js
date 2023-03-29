const addButton = document.getElementById("add-button")
const todoContainer = document.getElementById("todo-container")
const todoInput = document.getElementById("todo-input")
let arregloTareas = JSON.parse(localStorage.getItem('tareas')) || [];
const darkModeButton = document.getElementById("dark-mode-button");
const body = document.body;

// Función para cargar las tareas desde localStorage al cargar la página
function cargarTareas() {
    for (let tarea of arregloTareas) {
        let todo = document.createElement("div");
        todo.classList.add("todo");
        
        let li = document.createElement("li");
        li.innerText = `${tarea}`;
        todo.appendChild(li);
        
        let checkButton = document.createElement("button");
        checkButton.innerHTML = "✔";
        checkButton.classList.add("todo-chech");
        todo.appendChild(checkButton);
        
        let deleteButton = document.createElement("button");
        deleteButton.innerHTML = "✖";
        deleteButton.classList.add("todo-delete");
        todo.appendChild(deleteButton);
        
        todoContainer.appendChild(todo);
    }
}

addButton.addEventListener("click", (e) => {
    let todo = document.createElement("div");
    todo.classList.add("todo");
    

    let li = document.createElement("li");
    li.innerText = `${todoInput.value}`;
    todo.appendChild(li);

    let checkButton = document.createElement("button");
    checkButton.innerHTML = "✔";
    checkButton.classList.add("todo-chech");
    todo.appendChild(checkButton);

    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "✖";
    deleteButton.classList.add("todo-delete");
    todo.appendChild(deleteButton);

    if(todoInput.value === ""){
        Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'Es necesario que agreges una tarea!',
            showConfirmButton: false,
            timer: 1500
        })
    }else{
        todoContainer.appendChild(todo);
        arregloTareas.push(todoInput.value); // agregar la tarea al arreglo
        localStorage.setItem('tareas', JSON.stringify(arregloTareas)); // guardar en localStorage
        nueva();
    }

    todoInput.value = "";
})

todoContainer.addEventListener("click", (e) => {
    let target = e.target;
    if(target.classList.contains("todo-delete")){
        let item = target.parentElement;
        let tarea = item.querySelector("li").innerText;
        let index = arregloTareas.indexOf(tarea);
        arregloTareas.splice(index, 1);
        localStorage.setItem('tareas', JSON.stringify(arregloTareas));
        item.remove();
        eliminar();
    }
    if(target.classList.contains("todo-chech")){
        let item = target.parentElement;
        item.classList.toggle("completed", completada());
    }
})

// modo de voz
function nueva(){
    let voz = new SpeechSynthesisUtterance();
    voz.text = "Nueva Tarea";
    voz.lang = "es";
    speechSynthesis.speak(voz)
}
function eliminar(){
    let voz = new SpeechSynthesisUtterance();
    voz.text = "Tarea Eliminada";
    voz.lang = "es";
    speechSynthesis.speak(voz)
}
function completada(){
    let voz = new SpeechSynthesisUtterance();
    voz.text = "Tarea Completa";
    voz.lang = "es";
    speechSynthesis.speak(voz)
}

// Cargar las tareas desde localStorage al cargar la página
cargarTareas();


// modo dia y noche
darkModeButton.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    
    // Guardar la preferencia del usuario en localStorage
    localStorage.setItem('modoNocturno', body.classList.contains("dark-mode"));
});

// Cargar la preferencia del usuario desde localStorage al cargar la página
if (JSON.parse(localStorage.getItem('modoNocturno'))) {
    body.classList.add("dark-mode");
}