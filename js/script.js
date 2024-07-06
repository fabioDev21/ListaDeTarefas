const tarefas = []
localStorage.setItem("tarefas", JSON.stringify(tarefas))

const subForm = document.querySelector("#subForm")
subForm.addEventListener("click", (e) => {
    e.preventDefault()
    coletaTarefas()
})

function coletaTarefas(){
    const tarefaAfazer = document.querySelector("#tarefaAfazer").value
    const categoriaDaTarefa = document.querySelector("#categoriaDaTarefa").value
    const idTarefa = "abc" + (Math.floor(Math.random() * 20))
    
    const novaTarefa = {
        tarefaAfazer,
        categoriaDaTarefa,
        idTarefa
    }

    tarefas.push(novaTarefa)
    localStorage.setItem("tarefas", JSON.stringify(tarefas))
    mostraTarefas()
}

function mostraTarefas(){
    const totalTarefas = JSON.parse(localStorage.getItem("tarefas"))

    totalTarefas.forEach(tarefa => {

        const span = document.createElement("span")
        span.id = tarefa.idTarefa
        span.setAttribute("class", "afazer")
        span.innerHTML = `<p>${tarefa.tarefaAfazer}</p>`

        let idTarefa = "#" + (span.id).toString()

        const validaTarefa = Array.from(document.querySelectorAll(".afazer"))

        validaTarefa.forEach(existente => {
            if(tarefa.idTarefa === existente.id){ span.style.display = "none"}
        })
        
        
        document.querySelector("#afazeres").append(span)
        concluirTarefa(span,idTarefa)
    });
}

function concluirTarefa(span, idTarefa){
    if(span.getAttribute("class") == "afazer"){
        document.querySelector(idTarefa).addEventListener("click", () => {
            span.setAttribute("class", "concluida")

        })
    }
}