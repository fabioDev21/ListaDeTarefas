const tarefas = localStorage.length >= 1 ? JSON.parse(localStorage.getItem("tarefas")) : []
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
    itemTarefa.innerHTML = `${tarefaAfazer}
    <svg class="excluiTarefa" id="${idTarefa}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>`
    ul.append(itemTarefa)
    concluiTarefa(idTarefa)
    excluirTarefa(idTarefa)
}
function excluirTarefa(idTarefa){

    const btnTarefa = Array.from(document.querySelectorAll(".excluiTarefa"))
    btnTarefa.forEach(el => {
        el.addEventListener("click", () => {
            btnTarefa.id == idTarefa ? console.log("sim", idTarefa): console.log("não", idTarefa)
        })
    })
}



function concluiTarefa(idTarefa){
    const newIdTarefa = "#" + idTarefa

    const leitorTarefa = document.querySelector(newIdTarefa)
    leitorTarefa.addEventListener("click", (e) => {
        leitorTarefa.classList.add("concluida")
    })   
}