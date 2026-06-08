let cursos =
JSON.parse(
  localStorage.getItem("cursos")
) || [
  {
    id: 1,
    nome: "Enfermagem Básica",
    categoria: "Enfermagem",
    nivel: "Platinum",
    status: "Publicado",
    preco: 5800,
    alunos: 238,
    vendas: 87,
    imagem: "img/enfermeiro.jpg",
    descricao: "Domine os fundamentos da enfermagem.",
  },

  {
    id: 2,
    nome: "Primeiros Socorros",
    categoria: "Urgência",
    nivel: "Silver",
    status: "Publicado",
    preco: 900,
    alunos: 424,
    vendas: 70,
    imagem: "img/socorros.jpg",
    descricao: "Aprenda técnicas de emergência.",
  },
];

const grid = document.getElementById("cursosGrid");

function renderCursos(lista) {
  grid.innerHTML = "";

  lista.forEach((curso) => {
    grid.innerHTML += `
<div class="curso-card" data-id="${curso.id}">

  <div class="curso-top">
    <img src="${curso.imagem}" alt="${curso.nome}">

    <div class="tags">
      <span class="tag ${curso.nivel.toLowerCase()}">
        ${curso.nivel}
      </span>

      <span class="status">
        ${curso.status}
      </span>
    </div>
  </div>

  <div class="curso-content">
    <h3>${curso.nome}</h3>

    <p>${curso.descricao}</p>
  </div>

  <div class="curso-info">

    <div>
      <strong>R$ ${curso.preco.toLocaleString("pt-BR")}</strong>
      <span>Receita</span>
    </div>

    <div>
      <strong>${curso.alunos}</strong>
      <span>Alunos</span>
    </div>

    <div>
      <strong>${curso.vendas}</strong>
      <span>Vendas</span>
    </div>

  </div>

  <div class="acoes">
    <button>Ver Ganhos</button>
    <button>Editar</button>
    <button>Feedback</button>
  </div>

</div>
`;
  });
}

renderCursos(cursos);

document.addEventListener("click", (e) => {
  const card = e.target.closest(".curso-card");

  if (!card) return;

  const id = Number(card.dataset.id);

  const curso = cursos.find((c) => c.id === id);

  abrirDetalhes(curso);
});

function abrirDetalhes(curso) {
  detalhesCurso.innerHTML = `
    <h2>${curso.nome}</h2>

    <img
      src="${curso.imagem}"
      alt="${curso.nome}"
      style="
        width:100%;
        border-radius:12px;
        margin:15px 0;
      "
    >

    <p>${curso.descricao}</p>

    <hr style="margin:20px 0">

    <p><strong>Categoria:</strong> ${curso.categoria}</p>

    <p><strong>Alunos:</strong> ${curso.alunos}</p>

    <p><strong>Vendas:</strong> ${curso.vendas}</p>

    <p>
      <strong>Receita:</strong>
      R$ ${curso.preco.toLocaleString("pt-BR")}
    </p>

    <p><strong>Status:</strong> ${curso.status}</p>
  `;

  modalCurso.classList.add("show");
}

const modalCurso = document.getElementById("modalCurso");

const detalhesCurso = document.getElementById("detalhesCurso");

const fechar = document.getElementById("fechar");

const busca = document.getElementById("buscaCurso");

busca.addEventListener("input", () => {
  const termo = busca.value.toLowerCase();

  const resultado = cursos.filter((c) => c.nome.toLowerCase().includes(termo));

  renderCursos(resultado);
});

fechar.addEventListener("click", () => {
  modalCurso.classList.remove("show");
});

const categoria = document.getElementById("categoria");

categoria.addEventListener("change", () => {
  const valor = categoria.value;

  if (valor === "Todas") {
    renderCursos(cursos);
    return;
  }

  const filtrados = cursos.filter((c) => c.categoria === valor);

  renderCursos(filtrados);
});

localStorage;

function salvarCursos() {

  localStorage.setItem(
    "cursos",
    JSON.stringify(cursos)
  );

}
salvarCursos();
