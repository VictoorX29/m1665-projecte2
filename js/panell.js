const COLORES_PUNTUACIO = {
  1: "#d32f2f",
  2: "#f57c00",
  3: "#ffb300",
  4: "#66bb6a",
  5: "#388e3c",
};

function initPanell() {
  const filtre = document.getElementById("filtre-panel");
  filtre.addEventListener("change", actualitzarPanell);
}

function obtenirFiltreActiu() {
  return document.getElementById("filtre-panel").value;
}

function obtenirRespostesFiltrades() {
  const filtre = obtenirFiltreActiu();
  if (filtre === "Tots") {
    return respostes;
  }
  return respostes.filter((r) => r.grup === filtre);
}

function obtenirComptadors(filtrades) {
  const comptadors = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  filtrades.forEach((r) => {
    if (comptadors[r.puntuacio] !== undefined) {
      comptadors[r.puntuacio]++;
    }
  });
  return comptadors;
}

function construirGradientConic(segments) {
  const total = segments.reduce((acc, s) => acc + s.count, 0);
  if (total === 0) {
    return `conic-gradient(var(--pie-empty) 0deg 360deg)`;
  }

  let angle = 0;
  const stops = [];
  segments.forEach((seg) => {
    if (seg.count === 0) {
      return;
    }
    const deg = (seg.count / total) * 360;
    stops.push(`${seg.color} ${angle}deg ${angle + deg}deg`);
    angle += deg;
  });

  return `conic-gradient(${stops.join(", ")})`;
}

function calcularMitjana(arr) {
  if (arr.length === 0) {
    return null;
  }
  const suma = arr.reduce((acc, r) => acc + r.puntuacio, 0);
  return suma / arr.length;
}

function calcularPercentatgePositives(arr) {
  if (arr.length === 0) {
    return null;
  }
  const positives = arr.filter((r) => r.puntuacio >= 4).length;
  return (positives / arr.length) * 100;
}

function formatarData(iso) {
  return new Date(iso).toLocaleString("ca-ES", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

function formatarPercent(compt, total) {
  if (total === 0) {
    return "0.0";
  }
  return ((compt / total) * 100).toFixed(1);
}

function renderHint(filtreActiu) {
  document.getElementById("hint-filtre").textContent =
    `Mostrant dades del filtre: ${filtreActiu}`;
}

function renderKPIs(filtrades, filtreActiu) {
  document.getElementById("kpi-respostes").textContent = String(filtrades.length);
  document.getElementById("kpi-grup").textContent = filtreActiu;

  const mitjana = calcularMitjana(filtrades);
  document.getElementById("kpi-mitjana").textContent =
    mitjana === null ? "—" : mitjana.toFixed(1);

  const percentPositives = calcularPercentatgePositives(filtrades);
  document.getElementById("kpi-positives").textContent =
    percentPositives === null ? "—" : `${percentPositives.toFixed(1)}%`;
}

function renderBarres(filtrades) {
  const comptadors = obtenirComptadors(filtrades);
  const max = Math.max(1, ...Object.values(comptadors));

  for (let puntuacio = 5; puntuacio >= 1; puntuacio--) {
    const row = document.getElementById(`bar-${puntuacio}`);
    const compt = comptadors[puntuacio];
    const percent = (compt / max) * 100;
    const fill = row.querySelector(".bar-fill");

    row.querySelector(".bar-count").textContent = String(compt);
    fill.style.width = `${percent}%`;
    fill.style.background = COLORES_PUNTUACIO[puntuacio];
  }
}

function renderLlegendaPuntuacions(legendEl, comptadors, total) {
  legendEl.innerHTML = "";

  for (let puntuacio = 1; puntuacio <= 5; puntuacio++) {
    const compt = comptadors[puntuacio];
    const li = document.createElement("li");
    li.innerHTML = `<span class="legend-swatch" style="background:${COLORES_PUNTUACIO[puntuacio]}"></span> ${puntuacio}/5: ${compt} (${formatarPercent(compt, total)}%)`;
    legendEl.appendChild(li);
  }
}

function renderPies(filtrades) {
  const comptadors = obtenirComptadors(filtrades);
  const total = filtrades.length;
  const pieScores = document.getElementById("pie-scores");
  const legendScores = document.getElementById("legend-scores");
  const piePositives = document.getElementById("pie-positives");
  const legendPositives = document.getElementById("legend-positives");

  const segmentsScores = [];
  for (let puntuacio = 1; puntuacio <= 5; puntuacio++) {
    segmentsScores.push({
      count: comptadors[puntuacio],
      color: COLORES_PUNTUACIO[puntuacio],
    });
  }
  pieScores.style.background = construirGradientConic(segmentsScores);
  renderLlegendaPuntuacions(legendScores, comptadors, total);

  const positives = comptadors[4] + comptadors[5];
  const noPositives = comptadors[1] + comptadors[2] + comptadors[3];
  const segmentsPositives = [
    { count: positives, color: "#388e3c" },
    { count: noPositives, color: "#f57c00" },
  ];
  piePositives.style.background = construirGradientConic(segmentsPositives);

  legendPositives.innerHTML = "";
  const liPos = document.createElement("li");
  liPos.innerHTML = `<span class="legend-swatch" style="background:var(--positive-green)"></span> Positives (4-5): ${formatarPercent(positives, total)}%`;
  legendPositives.appendChild(liPos);

  const liNoPos = document.createElement("li");
  liNoPos.innerHTML = `<span class="legend-swatch" style="background:var(--non-positive-orange)"></span> No positives (1-3): ${formatarPercent(noPositives, total)}%`;
  legendPositives.appendChild(liNoPos);
}

function renderComparativa() {
  const compareChart = document.getElementById("compare-chart");
  const filtreActiu = obtenirFiltreActiu();
  compareChart.innerHTML = "";

  GRUPS.forEach((grup) => {
    const delGrup = respostes.filter((r) => r.grup === grup);
    const mitjana = calcularMitjana(delGrup);
    const textMitjana = mitjana === null ? "—" : `${mitjana.toFixed(2)}/5`;
    const widthPercent = mitjana === null ? 0 : (mitjana / 5) * 100;
    const isActive = filtreActiu === grup;

    const row = document.createElement("div");
    row.className = "compare-row";
    row.innerHTML = `
      <span class="compare-label">${grup}</span>
      <div class="compare-track">
        <div class="compare-fill${isActive ? " compare-fill--active" : ""}" style="width:${widthPercent}%"></div>
      </div>
      <span class="compare-value">${textMitjana}</span>
    `;
    compareChart.appendChild(row);
  });
}

function renderLlista(filtrades) {
  const llista = document.getElementById("llista-respostes");
  const template = document.getElementById("tpl-resposta");

  llista.innerHTML = "";

  if (filtrades.length === 0) {
    llista.classList.add("llista-respostes--empty");
    llista.textContent = "No hi ha respostes per aquest filtre.";
    return;
  }

  llista.classList.remove("llista-respostes--empty");

  const ordenades = [...filtrades].sort(
    (a, b) => new Date(b.data) - new Date(a.data)
  );

  ordenades.forEach((resposta) => {
    const node = template.content.cloneNode(true);
    const card = node.querySelector(".resposta-card");

    card.classList.add(`resposta-card--p${resposta.puntuacio}`);
    node.querySelector(".badge-grup").textContent = resposta.grup;
    node.querySelector(".resposta-puntuacio").textContent =
      `Puntuació: ${resposta.puntuacio}/5`;
    node.querySelector(".resposta-comentari").textContent =
      resposta.comentari || "Sense comentari";
    node.querySelector(".resposta-data").textContent =
      `Data: ${formatarData(resposta.data)}`;

    llista.appendChild(node);
  });
}

function actualitzarPanell() {
  const filtreActiu = obtenirFiltreActiu();
  const filtrades = obtenirRespostesFiltrades();

  renderHint(filtreActiu);
  renderKPIs(filtrades, filtreActiu);
  renderBarres(filtrades);
  renderPies(filtrades);
  renderComparativa();
  renderLlista(filtrades);
}
