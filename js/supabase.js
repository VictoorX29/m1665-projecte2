// Requires CDN @supabase/supabase-js loaded before this script
let sb;

function initSupabase() {
	if (
		typeof SUPABASE_URL === 'undefined' ||
		typeof SUPABASE_ANON_KEY === 'undefined'
	) {
		throw new Error(
			'Missing SUPABASE_URL or SUPABASE_ANON_KEY. Copy js/config.example.js → js/config.js and fill values.',
		);
	}
	if (typeof supabase === 'undefined') {
		throw new Error(
			'CDN @supabase/supabase-js no cargado. Revisa Network/CSP o usa un CDN alternativo.',
		);
	}
	sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
	window.sb = sb;
}

function mapRow(row) {
	return {
		id: row.id,
		grup: row.grup,
		puntuacio: row.puntuacio,
		comentari: row.comentari ?? '',
		data: row.data,
	};
}

async function carregarRespostes() {
	if (!sb) throw new Error('Supabase no inicialitzat');
	try {
		const { data, error } = await sb
			.from('respostes')
			.select('*')
			.order('data', { ascending: false });
		if (error) throw error;
		window.App.respostes = (data || []).map(mapRow);
		return window.App.respostes;
	} catch (e) {
		const msg = e?.message || JSON.stringify(e);
		throw new Error("No s'han pogut carregar les respostes: " + msg);
	}
}

async function insertResposta({ grup, puntuacio, comentari, data }) {
	if (!sb) throw new Error('Supabase no inicialitzat');
	try {
		const payload = { grup, puntuacio, comentari, data };
		const { data: inserted, error } = await sb
			.from('respostes')
			.insert(payload)
			.select()
			.single();
		if (error) throw error;
		return mapRow(inserted);
	} catch (e) {
		const msg = e?.message || JSON.stringify(e);
		throw new Error("No s'ha pogut guardar la resposta: " + msg);
	}
}
