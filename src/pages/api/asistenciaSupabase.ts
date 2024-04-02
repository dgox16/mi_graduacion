import type { APIRoute } from "astro";
import { supabase } from "../../lib/supabase";

export const POST: APIRoute = async ({ request }) => {
	const formData = await request.formData();
	const nombre = formData.get("nombre");
	const apellidos = formData.get("apellidos");
	const quimico = formData.get("quimico");
	const llevaraNiños = formData.get("llevaraNiños");
	const edadNiño1 = formData.get("edadNiño1");
	const edadNiño2 = formData.get("edadNiño2");
	const edadNiño3 = formData.get("edadNiño3");
	const edadNiño4 = formData.get("edadNiño4");
	const edadNiño5 = formData.get("edadNiño5");

	console.info(nombre);
	console.info(apellidos);
	console.info(quimico);
	console.info(llevaraNiños);
	console.info(edadNiño1);
	console.info(edadNiño2);
	console.info(edadNiño3);
	console.info(edadNiño4);
	console.info(edadNiño5);
	const { data, error } = await supabase
		.from("invitados")
		.insert([{ nombre: nombre, apellidos: apellidos, quimico: quimico }])
		.select();

	if (error) {
		return new Response(
			JSON.stringify({
				error: error.message,
			}),
			{ status: 500 },
		);
	}

	return new Response(JSON.stringify(data));
};
