const cursos = JSON.parse(localStorage.getItem("cursos")) || [];

const filtroCurso = document.getElementById("filtroCurso");

// ========================
// MÉTRICAS
// ========================

function atualizarMetricas() {
  const totalInscricoes = cursos.reduce(
    (total, curso) => total + (curso.alunos || 0),
    0,
  );

  const totalConcluidos = cursos.reduce(
    (total, curso) => total + (curso.concluidos || 0),
    0,
  );

  const atividadesPendentes = cursos.reduce(
    (total, curso) => total + (curso.atividadesPendentes || 0),
    0,
  );

  const mediaAvaliacao =
    cursos.length > 0
      ? (
          cursos.reduce((total, curso) => total + (curso.avaliacao || 0), 0) /
          cursos.length
        ).toFixed(1)
      : 0;

  document.getElementById("totalInscricoes").textContent = totalInscricoes;

  document.getElementById("totalConcluidos").textContent = totalConcluidos;

  document.getElementById("atividadesPendentes").textContent =
    atividadesPendentes;

  document.getElementById("mediaAvaliacao").textContent = mediaAvaliacao;
}

// ========================
// FILTRO CURSOS
// ========================

function carregarCursosFiltro() {
  cursos.forEach((curso) => {
    filtroCurso.innerHTML += `
      <option value="${curso.id}">
        ${curso.nome}
      </option>
    `;
  });
}

// ========================
// GRÁFICO CURSOS
// ========================

function criarGraficoCursos() {
  new Chart(document.getElementById("graficoCursos"), {
    type: "bar",

    data: {
      labels: cursos.map((c) => c.nome),

      datasets: [
        {
          label: "Alunos",

          data: cursos.map((c) => c.alunos || 0),
        },
      ],
    },

    options: {
      responsive: true,

      maintainAspectRatio: false,
    },
  });
}

// ========================
// GRÁFICO STATUS
// ========================

function criarGraficoStatus() {
  const publicados = cursos.filter((c) => c.status === "Publicado").length;

  const privados = cursos.filter((c) => c.status === "Privado").length;

  new Chart(document.getElementById("graficoStatus"), {
    type: "doughnut",

    data: {
      labels: ["Publicado", "Privado"],

      datasets: [
        {
          data: [publicados, privados],
        },
      ],
    },
  });
}

// ========================
// RANKING
// ========================

function renderRanking() {
  const ranking = [...cursos].sort((a, b) => b.alunos - a.alunos).slice(0, 5);

  const container = document.getElementById("rankingCursos");

  container.innerHTML = "";

  const maior = ranking[0]?.alunos || 1;

  ranking.forEach((curso) => {
    const porcentagem = (curso.alunos * 100) / maior;

    container.innerHTML += `
      <div class="ranking-item">

        <div class="ranking-item-header">

          <span>
            ${curso.nome}
          </span>

          <strong>
            ${curso.alunos}
          </strong>

        </div>

        <div class="barra">
          <div
            style="
              width:${porcentagem}%;
            "
          ></div>
        </div>

      </div>
    `;
  });
}

// ========================

atualizarMetricas();

carregarCursosFiltro();

criarGraficoCursos();

criarGraficoStatus();

renderRanking();
