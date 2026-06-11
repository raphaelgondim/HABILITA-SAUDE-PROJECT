const cursos = JSON.parse(localStorage.getItem("cursos")) || [];

const faturamentoBruto = cursos.reduce(
  (acc, curso) => acc + curso.preco * curso.vendas,
  0,
);

const totalVendas = cursos.reduce((acc, curso) => acc + curso.vendas, 0);

const taxaPlataforma = faturamentoBruto * 0.1;

const impostos = faturamentoBruto * 0.15;

const receitaLiquida = faturamentoBruto - taxaPlataforma - impostos;

const saldoDisponivel = receitaLiquida * 0.45;

document.getElementById("faturamentoBruto").textContent =
  formatarMoeda(faturamentoBruto);

document.getElementById("receitaLiquida").textContent =
  formatarMoeda(receitaLiquida);

document.getElementById("saldoDisponivel").textContent =
  formatarMoeda(saldoDisponivel);

document.getElementById("totalVendas").textContent = totalVendas;

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

new Chart(document.getElementById("graficoGanhos"), {
  type: "line",

  data: {
    labels: cursos.map((c) => c.nome),

    datasets: [
      {
        label: "Receita",

        data: cursos.map((c) => c.preco),

        tension: 0.4,
      },
    ],
  },
});

document.getElementById("btnSaque").addEventListener("click", () => {
  alert("Solicitação enviada!");
});

const tabela = document.getElementById("tabelaRepasses");

cursos.forEach((curso) => {
  tabela.innerHTML += `
    <tr>
      <td>08/06/2026</td>
      <td>${curso.nome}</td>
      <td>${curso.preco}</td>
      <td>10%</td>
      <td>15%</td>
      <td>${(curso.preco * 0.75).toFixed(2)}</td>
    </tr>
  `;
});

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
