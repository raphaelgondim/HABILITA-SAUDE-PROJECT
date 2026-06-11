let notificacoes = JSON.parse(localStorage.getItem("notificacoes")) || [];

function criarNotificacao(titulo, descricao, tipo) {
  const notificacoes = JSON.parse(localStorage.getItem("notificacoes")) || [];

  notificacoes.unshift({
    id: Date.now(),
    titulo,
    descricao,
    tipo,
    lida: false,
    data: new Date().toLocaleString("pt-BR"),
  });

  localStorage.setItem("notificacoes", JSON.stringify(notificacoes));
}

function renderizarNotificacoes(lista) {
  const container =
    document.getElementById("listaNotificacoes");

  container.innerHTML = "";

  lista.forEach((n) => {
    container.innerHTML += `
      <div class="notificacao-card">

        <div class="icone ${n.tipo}">
          <i class="fa-solid fa-bell"></i>
        </div>

        <div class="conteudo">
          <h3>${n.titulo}</h3>
          <p>${n.descricao}</p>
          <small>${n.data}</small>

          ${
            !n.lida
              ? `<button onclick="marcarComoLida(${n.id})">
                    Marcar como lida
                 </button>`
              : ""
          }
        </div>

      </div>
    `;
  });
}

function marcarComoLida(id) {
  const notificacoes =
    JSON.parse(localStorage.getItem("notificacoes")) || [];

  const notificacao =
    notificacoes.find((n) => n.id === id);

  if (notificacao) {
    notificacao.lida = true;
  }

  localStorage.setItem(
    "notificacoes",
    JSON.stringify(notificacoes),
  );

  renderizarNotificacoes(notificacoes);
}

document
  .getElementById("btnTodos")
  .addEventListener("click", () => {
    renderizarNotificacoes(notificacoes);
  });

document
  .getElementById("btnNaoLidas")
  .addEventListener("click", () => {
    renderizarNotificacoes(
      notificacoes.filter((n) => !n.lida)
    );
  });

document
  .getElementById("btnLidas")
  .addEventListener("click", () => {
    renderizarNotificacoes(
      notificacoes.filter((n) => n.lida)
    );
  });

  const total = notificacoes.length;

const naoLidas =
  notificacoes.filter((n) => !n.lida).length;

const lidas =
  notificacoes.filter((n) => n.lida).length;

const hoje =
  notificacoes.filter((n) =>
    n.data.includes(
      new Date().toLocaleDateString("pt-BR")
    )
  ).length;

document.getElementById("totalNotificacoes").textContent = total;
document.getElementById("naoLidas").textContent = naoLidas;
document.getElementById("lidas").textContent = lidas;
document.getElementById("hoje").textContent = hoje;

renderizarNotificacoes(notificacoes);