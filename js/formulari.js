function initFormulari() {
  const btnGuardar = document.getElementById("btn-guardar");
  btnGuardar.addEventListener("click", guardarResposta);
}

function mostrarError(missatge) {
  const errorEl = document.getElementById("error-form");
  errorEl.textContent = missatge;
  errorEl.hidden = false;
}

function amagarError() {
  const errorEl = document.getElementById("error-form");
  errorEl.hidden = true;
  errorEl.textContent = "";
}

function guardarResposta() {
  const selectGrup = document.getElementById("grup");
  const inputPuntuacio = document.getElementById("puntuacio");
  const textarea = document.getElementById("comentari");

  const grup = selectGrup.value;
  const puntuacio = Number(inputPuntuacio.value);
  const comentari = textarea.value.trim();

  if (!GRUPS.includes(grup)) {
    mostrarError("Selecciona un grup vàlid.");
    return;
  }

  if (!esPuntuacioValida(puntuacio)) {
    mostrarError("La puntuació ha de ser un nombre enter entre 1 i 5.");
    return;
  }

  amagarError();

  const nova = {
    id: Date.now(),
    grup,
    puntuacio,
    comentari,
    data: new Date().toISOString(),
  };

  respostes.push(nova);

  inputPuntuacio.value = "4";
  textarea.value = "";

  actualitzarPanell();
}
