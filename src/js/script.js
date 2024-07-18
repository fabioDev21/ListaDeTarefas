// Inicializa as tarefas a partir do localStorage
let tarefas = localStorage.length >= 1 ? JSON.parse(localStorage.getItem("tarefas")) : []
tarefas.forEach(el => {
    mostraTarefas(el)
});

const subForm = document.querySelector("#subForm")
subForm.addEventListener("click", (e) => {
    e.preventDefault()
    validaTarefas()
})

function validaTarefas(){
    let tarefaAfazer = document.querySelector("#tarefaAfazer").value
    
    if(tarefaAfazer.trim() === ""){
        tarefaAfazer = "Nova tarefa"
    }

    const idTarefa = "abc" + (Math.floor(Math.random() * 10000))

    const novaTarefa = {
        tarefaAfazer,
        idTarefa
    }
    
    tarefas.push(novaTarefa)
    mostraTarefas(novaTarefa)
    localStorage.setItem("tarefas", JSON.stringify(tarefas))
}

function mostraTarefas({tarefaAfazer, idTarefa}) {
    const ul = document.querySelector("#afazeresTarefas")
    const itemTarefa = document.createElement("li")
    itemTarefa.setAttribute("id", idTarefa)
    itemTarefa.setAttribute("class", "tarefaAfazer")

    itemTarefa.innerHTML = `${tarefaAfazer} <i class="fa-solid fa-gear" id="trashBtn"></i>`
    
    ul.append(itemTarefa)
    concluiTarefa(idTarefa)
}

document.addEventListener("click", (e) => {
    const alvoEl = e.target
    if(alvoEl.id === "trashBtn"){
        const parenteEl = alvoEl.closest("li")
        excluirTarefa(parenteEl)
    }
})

function concluiTarefa(idTarefa){
    const leitorTarefa = document.getElementById(idTarefa)
    leitorTarefa.addEventListener("click", (e) => {
        leitorTarefa.classList.toggle("concluida")
    })   
}

function excluirTarefa(parenteEl){
    const idTarefa = parenteEl.id
    tarefas = tarefas.filter(tarefa => tarefa.idTarefa !== idTarefa)
    localStorage.setItem("tarefas", JSON.stringify(tarefas))
    parenteEl.remove()
}