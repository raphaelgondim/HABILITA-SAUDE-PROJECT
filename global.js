function atualizarSino() {

  const notificacoes =
    JSON.parse(localStorage.getItem("notificacoes")) || [];

  const naoLidas =
    notificacoes.filter(n => !n.lida).length;

  const sino =
    document.querySelector(".fa-bell");

  if (!sino) return;

}

atualizarSino();

function criarNotificacao(titulo, descricao, tipo) {
  const notificacoes =
    JSON.parse(localStorage.getItem("notificacoes")) || [];

  notificacoes.unshift({
    id: Date.now(),
    titulo,
    descricao,
    tipo,
    lida: false,
    data: new Date().toLocaleString("pt-BR"),
  });

  localStorage.setItem(
    "notificacoes",
    JSON.stringify(notificacoes)
  );
}