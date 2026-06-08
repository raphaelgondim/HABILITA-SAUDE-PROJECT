function renderizarCursosDashboard() {
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
  const lista = document.getElementById("listaCursosDashboard");

  lista.innerHTML = "";

  cursos
    .filter((c) => c.status === "Publicado")
    .slice(0, 5)
    .forEach((curso) => {
      lista.innerHTML += `
        <div class="curso">

          <img src="${curso.imagem}">

          <div>
            <h4>${curso.nome}</h4>
            <p>${curso.alunos} alunos</p>
          </div>

          <strong>${curso.vendas}</strong>

          <div class="status"></div>

        </div>
      `;
    });
}
function renderizarMaisVendidos() {
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
  const tabela = document.getElementById("rankingVendas");

  tabela.innerHTML = "";

  const ranking = [...cursos].sort((a, b) => b.vendas - a.vendas).slice(0, 3);

  ranking.forEach((curso, index) => {
    tabela.innerHTML += `
        <tr>
          <td>${index + 1}</td>
          <td>${curso.nome}</td>
          <td>${curso.vendas}</td>
        </tr>
      `;
  });
}

function renderizarAvaliacoes() {
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
  const tabela = document.getElementById("rankingAvaliacoes");

  tabela.innerHTML = "";

  const ranking = [...cursos]
    .sort((a, b) => (b.avaliacao || 0) - (a.avaliacao || 0))
    .slice(0, 3);

  ranking.forEach((curso, index) => {
    tabela.innerHTML += `
        <tr>
          <td>${index + 1}</td>
          <td>${curso.nome}</td>
<td>⭐ ${curso.avaliacao || 0}
</td>        </tr>
      `;
  });
}

atualizarMetricas();

renderizarCursosDashboard();

renderizarMaisVendidos();

renderizarAvaliacoes();
