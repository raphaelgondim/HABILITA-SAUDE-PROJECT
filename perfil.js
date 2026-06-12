const usuario = JSON.parse(localStorage.getItem("usuarioLogado")) || {};

document.getElementById("nomeUsuario").value = usuario.nome || "";

document.getElementById("emailUsuario").value = usuario.email || "";

document.getElementById("fotoUsuario").value = usuario.foto || "";

document.getElementById("salvarPerfil").addEventListener("click", () => {
  usuario.nome = document.getElementById("nomeUsuario").value;

  usuario.email = document.getElementById("emailUsuario").value;

  usuario.foto = document.getElementById("fotoUsuario").value;

  localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

  alert("Perfil atualizado!");
});
