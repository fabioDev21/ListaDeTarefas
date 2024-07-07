const tarefas = localStorage.length >= 1 ? JSON.parse(localStorage.getItem("tarefas")) : []

tarefas.forEach(el => {
    mostraTarefas(el)
});

const subForm = document.querySelector("#subForm")
subForm.addEventListener("click", (e) => {
    e.preventDefault()
    coletaTarefas()
})


function coletaTarefas(){
    let tarefaAfazer = document.querySelector("#tarefaAfazer").value
    
    if(tarefaAfazer == " " || tarefaAfazer == ""){
        tarefaAfazer = "Nova tarefa"
    }
    const categoriaDaTarefa = document.querySelector("#categoriaDaTarefa").value
    const idTarefa = "abc" + (Math.floor(Math.random() * 20))
    
    const novaTarefa = {
        tarefaAfazer,
        categoriaDaTarefa,
        idTarefa
    }
    
    tarefas.push(novaTarefa)
    mostraTarefas(novaTarefa)
    localStorage.setItem("tarefas", JSON.stringify(tarefas))

}

function mostraTarefas({tarefaAfazer, categoriaDaTarefa, idTarefa}){

    const ul = document.querySelector("#afazeres")
    const itemTarefa = document.createElement("li")
    itemTarefa.setAttribute("id", idTarefa)
    itemTarefa.setAttribute("class", categoriaDaTarefa)
    itemTarefa.innerHTML = `${tarefaAfazer}`
    ul.append(itemTarefa)

    concluiTarefa(idTarefa)
}

function concluiTarefa(idTarefa){
    const newIdTarefa = "#" + idTarefa

    const leitorTarefa = document.querySelector(newIdTarefa)
    leitorTarefa.addEventListener("click", (e) => {
        leitorTarefa.classList.add("concluida")
    })   
}