const addButton = document.getElementById("add-button")
const todoContainer = document.getElementById("todo-container")
const todoInput = document.getElementById("todo-input")

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
        todoContainer.appendChild(todo), nueva();
    }

    todoInput.value = "";
})

todoContainer.addEventListener("click", (e) => {
    let target = e.target;
    if(target.classList.contains("todo-delete")){
        let item = target.parentElement;
        item.remove(), eliminar();
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
/* function incompleta(){
    let voz = new SpeechSynthesisUtterance();
    voz.text = "Tarea Incompleta";
    voz.lang = "es";
    speechSynthesis.speak(voz)
} */


// modo dia y noche
