// Inicializa as tarefas a partir do localStorage
let tarefas =
  localStorage.length >= 1 ? JSON.parse(localStorage.getItem("tarefas")) : [];
tarefas.forEach((el) => {
  mostraTarefas(el);
});

const subForm = document.querySelector("#subForm");
subForm.addEventListener("click", (e) => {
  e.preventDefault();
  validaTarefas();
});

function validaTarefas() {
  let tarefaAfazer = document.querySelector("#tarefaAfazer").value;
  if (tarefaAfazer.trim() === "") {
    tarefaAfazer = "Nova tarefa";
  }

  const idTarefa = "abc" + Math.floor(Math.random() * 10000);

  const novaTarefa = {
    tarefaAfazer,
    idTarefa,
  };

  tarefas.push(novaTarefa);
  mostraTarefas(novaTarefa);
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function mostraTarefas({ tarefaAfazer, idTarefa }) {
  const ul = document.querySelector("#afazeresTarefas");
  const itemTarefa = document.createElement("li");
  itemTarefa.setAttribute("id", idTarefa);
  itemTarefa.setAttribute("class", "tarefaAfazer");

  itemTarefa.innerHTML = `${tarefaAfazer} <i class="fa-solid fa-gear" id="configsBtn"></i>`;

  ul.append(itemTarefa);
  concluiTarefa(idTarefa);
}

document.addEventListener("click", (e) => {
  const alvoEl = e.target;

  if (alvoEl.id === "configsBtn") {

    var parenteEl = alvoEl.closest("li");
    document.querySelectorAll(".modal")[0].classList.remove("hidden");
    document.querySelectorAll(".itensTarefa")[0].classList.remove("hidden");
    editTarefa(parenteEl);
  }
});

function editTarefa(parenteEl) {
  // Define nomes e descrição da tarefa oriundos do objeto da lista
  const inputNomeTarefa = document.querySelector("#alteraNomeTarefa");
  inputNomeTarefa.value = parenteEl.textContent;

  const selectStatusTarefa = document.querySelector("#alteraStatusTarefa")
  console.log(selectStatusTarefa)

  selectStatusTarefa.addEventListener("change", (e) => {
    if(selectStatusTarefa.value === "afazer"){
      if(parenteEl.classList.contains("desenvolvendoTarefa")){
        parenteEl.classList.remove("desenvolvendoTarefa")
      }

      if(parenteEl.classList.contains("concluida")){
        parenteEl.classList.remove("concluida")
      }

      parenteEl.classList.add("tarefaAfazer")
    }
    
    if(selectStatusTarefa.value === "fazendo"){
      if(parenteEl.classList.contains("concluida")){
        parenteEl.classList.remove("concluida")
      }
      parenteEl.classList.add("desenvolvendoTarefa")
    }

    if(selectStatusTarefa.value === "concluida"){
      if(parenteEl.classList.contains("desenvolvendoTarefa")){
        parenteEl.classList.remove("desenvolvendoTarefa")
      }
      parenteEl.classList.add("concluida")
    }
  })

  document.addEventListener("click", (e) => {
    const alvoEl = e.target;

    if (alvoEl.id === "excluirTarefa") {
      excluirTarefa(parenteEl);
      document.querySelectorAll(".modal")[0].classList.add("hidden");
      document.querySelectorAll(".itensTarefa")[0].classList.add("hidden");
    }

    if (alvoEl.id === "confirmarAlterarTarefa") {
      // Necessário adicionar o icon através do innerHTML tbm
      parenteEl.innerHTML = `${inputNomeTarefa.value} <i class="fa-solid fa-gear" id="configsBtn"></i>`;
      document.querySelectorAll(".modal")[0].classList.add("hidden");
      document.querySelectorAll(".itensTarefa")[0].classList.add("hidden");

      // Chamada do array para substituição dos atributos da tarefa
      const tarefas = JSON.parse(localStorage.getItem("tarefas"));
      tarefas.find((el) => {
        if (el.idTarefa === parenteEl.id) {
          el.tarefaAfazer = inputNomeTarefa.value;
        }
      });
      localStorage.setItem("tarefas", JSON.stringify(tarefas));
    }
  });
}

function concluiTarefa(idTarefa) {
  const leitorTarefa = document.getElementById(idTarefa);
  leitorTarefa.addEventListener("dblclick", (e) => {
    leitorTarefa.classList.toggle("concluida");
  });
}

function excluirTarefa(parenteEl) {
  const idTarefa = parenteEl.id;
  tarefas = tarefas.filter((tarefa) => tarefa.idTarefa !== idTarefa);
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
  parenteEl.remove();
}
