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