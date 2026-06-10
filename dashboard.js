const cursos = JSON.parse(localStorage.getItem("cursos")) || [];

function atualizarMetricas() {
  const totalCursos = cursos.length;

  const totalAlunos = cursos.reduce(
    (total, curso) => total + (curso.alunos || 0),
    0,
  );

  const receitaTotal = cursos.reduce(
    (total, curso) => total + (curso.preco || 0),
    0,
  );

  const publicados = cursos.filter(
    (curso) => curso.status === "Publicado",
  ).length;

  document.getElementById("totalCursos").textContent = totalCursos;

  document.getElementById("totalAlunos").textContent = totalAlunos;

  document.getElementById("receitaTotal").textContent =
    "R$ " + receitaTotal.toLocaleString("pt-BR");

  document.getElementById("cursosPublicados").textContent = publicados;
}

function renderizarCursosDashboard() {
  const lista = document.getElementById("listaCursosDashboard");

  lista.innerHTML = "";

  if (cursos.length === 0) {
    lista.innerHTML = `
      <p>
        Nenhum curso criado.
      </p>
    `;

    return;
  }

  cursos.slice(0, 5).forEach((curso) => {
    lista.innerHTML += `
        <div class="curso">

          <img
            src="${curso.imagem}"
            alt="${curso.nome}"
          >

          <div>
            <h4>${curso.nome}</h4>

            <p>
              ${curso.status}
            </p>
          </div>

          <strong>
            ${curso.alunos || 0}
          </strong>

        </div>
      `;
  });
}

function renderizarMaisVendidos() {
  const tabela = document.getElementById("rankingVendas");

  tabela.innerHTML = "";

  if (cursos.length === 0) {
    tabela.innerHTML = `
      <tr>
        <td colspan="3">
          Nenhum curso encontrado
        </td>
      </tr>
    `;

    return;
  }

  const ranking = [...cursos]
    .sort((a, b) => (b.vendas || 0) - (a.vendas || 0))
    .slice(0, 3);

  ranking.forEach((curso, index) => {
    tabela.innerHTML += `
        <tr>
          <td>${index + 1}</td>
          <td>${curso.nome}</td>
          <td>${curso.vendas || 0}</td>
        </tr>
      `;
  });
}

function renderizarAvaliacoes() {
  const tabela = document.getElementById("rankingAvaliacoes");

  tabela.innerHTML = "";

  if (cursos.length === 0) {
    tabela.innerHTML = `
      <tr>
        <td colspan="3">
          Nenhum curso encontrado
        </td>
      </tr>
    `;

    return;
  }

  const ranking = [...cursos]
    .sort((a, b) => (b.avaliacao || 0) - (a.avaliacao || 0))
    .slice(0, 3);

  ranking.forEach((curso, index) => {
    tabela.innerHTML += `
        <tr>
          <td>${index + 1}</td>
          <td>${curso.nome}</td>
          <td>
            ⭐ ${curso.avaliacao || 0}
          </td>
        </tr>
      `;
  });
}

atualizarMetricas();

renderizarCursosDashboard();

renderizarMaisVendidos();

renderizarAvaliacoes();
