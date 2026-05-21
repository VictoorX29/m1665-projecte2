const GRUPS = ["DAW1A", "DAW1B", "ASIX1"];
let respostes = [];

function esPuntuacioValida(n) {
  return Number.isInteger(n) && n >= 1 && n <= 5;
}

window.App = {
  GRUPS,
  get respostes() {
    return respostes;
  },
  set respostes(valor) {
    respostes = valor;
  },
  esPuntuacioValida,
};

document.addEventListener("DOMContentLoaded", () => {
  initFormulari();
  initPanell();
  actualitzarPanell();
});
