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
  console.log(alvoEl.id);
  if (alvoEl.id === "configsBtn") {
    var parenteEl = alvoEl.closest("li");
    document.querySelectorAll(".modal")[0].classList.remove("hidden");
    document.querySelectorAll(".itensTarefa")[0].classList.remove("hidden");
    editTarefa();
  }
  if (alvoEl.id === "excluirTarefa") {
    excluirTarefa(parenteEl);
  }

  if (alvoEl.id === "confirmarAlterarTarefa") {
    document.querySelectorAll(".modal")[0].classList.add("hidden");
    document.querySelectorAll(".itensTarefa")[0].classList.add("hidden");
  }
});

function editTarefa() {
  // definir inputs e descrição p/ alterar
  // aguardar o click da exclusão ou confirmação []
  // tirar a classe hidden e incluí-la nas tarefas [x]
  // pegar o texto
  // alterar o objeto vindo do localstorage
  // confirmar a alteração do objeto no localstorage
}

function concluiTarefa(idTarefa) {
  const leitorTarefa = document.getElementById(idTarefa);
  leitorTarefa.addEventListener("click", (e) => {
    leitorTarefa.classList.toggle("concluida");
  });
}

function excluirTarefa(parenteEl) {
  const idTarefa = parenteEl.id;
  tarefas = tarefas.filter((tarefa) => tarefa.idTarefa !== idTarefa);
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
  parenteEl.remove();
}
