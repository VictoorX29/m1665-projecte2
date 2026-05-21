const MAX_ULTIMES_RESPOSTES = 5;

function actualitzarPanell() {
  const selectGrup = document.getElementById("grup");
  const hintGrup = document.getElementById("hint-grup");
  const kpiRespostes = document.getElementById("kpi-respostes");

  const grupActiu = selectGrup.value;
  hintGrup.textContent = `Grup del formulari: ${grupActiu}`;

  const filtrades = respostes.filter((r) => r.grup === grupActiu);
  kpiRespostes.textContent = String(filtrades.length);

  renderUltimesRespostes(filtrades);
}

function renderUltimesRespostes(filtrades) {
  const llista = document.getElementById("llista-respostes");
  const template = document.getElementById("tpl-resposta");

  llista.innerHTML = "";

  if (filtrades.length === 0) {
    llista.classList.add("llista-respostes--empty");
    llista.textContent = "Encara no hi ha respostes per aquest grup.";
    return;
  }

  llista.classList.remove("llista-respostes--empty");

  const ordenades = [...filtrades].sort(
    (a, b) => new Date(b.data) - new Date(a.data)
  );
  const ultimes = ordenades.slice(0, MAX_ULTIMES_RESPOSTES);

  ultimes.forEach((resposta) => {
    const node = template.content.cloneNode(true);

    node.querySelector(".badge-grup").textContent = resposta.grup;
    node.querySelector(".resposta-puntuacio").textContent =
      `Puntuació: ${resposta.puntuacio}/5`;
    node.querySelector(".resposta-comentari").textContent =
      resposta.comentari || "Sense comentari";

    llista.appendChild(node);
  });
}
