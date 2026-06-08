let cursos = JSON.parse(localStorage.getItem("cursos")) || [];

function atualizarMetricas() {
  const totalCursos = cursos.length;

  const totalAlunos = cursos.reduce((total, curso) => total + curso.alunos, 0);

  const receitaTotal = cursos.reduce((total, curso) => total + curso.preco, 0);

  const publicados = cursos.filter(
    (curso) => curso.status === "Publicado",
  ).length;

  document.getElementById("totalCursos").textContent = totalCursos;

  document.getElementById("totalAlunos").textContent = totalAlunos;

  document.getElementById("receitaTotal").textContent =
    receitaTotal.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  document.getElementById("cursosPublicados").textContent = publicados;
}

atualizarMetricas();
const ctx = document.getElementById("graficoVendas");

if (ctx && cursos.length > 0) {
  new Chart(ctx, {
    type: "bar",

    data: {
      labels: cursos.map((curso) => curso.nome),

      datasets: [
        {
          label: "Vendas",

          data: cursos.map((curso) => curso.vendas),

          borderWidth: 1,
        },
      ],
    },

    options: {
      responsive: true,

      plugins: {
        legend: {
          display: true,
        },
      },
    },
  });
}
