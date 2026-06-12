const usuario = JSON.parse(localStorage.getItem("usuario"));

if (usuario) {
  const nomeSidebar = document.getElementById("nomeUsuarioSidebar");
  const nomeTop = document.getElementById("nomeUsuarioTop");
  const fotoSidebar = document.getElementById("fotoUsuarioSidebar");
  const fotoTop = document.getElementById("fotoUsuarioTop");

  if (nomeSidebar) nomeSidebar.textContent = usuario.nome;
  if (nomeTop) nomeTop.textContent = usuario.nome;

  if (fotoSidebar) fotoSidebar.src = usuario.foto;
  if (fotoTop) fotoTop.src = usuario.foto;
}
