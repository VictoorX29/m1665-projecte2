const GRUPS = ['DAW1A', 'DAW1B', 'ASIX1'];
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

document.addEventListener('DOMContentLoaded', async () => {
	try {
		initFormulari();
		initPanell();
		// Init Supabase then load saved responses
		try {
			initSupabase();
			await carregarRespostes();
		} catch (e) {
			// If Supabase not configured, continue with empty local data and log
			console.warn('Supabase init/load warning:', e.message || e);
		}
		actualitzarPanell();
	} catch (err) {
		console.error(err);
	}
});
