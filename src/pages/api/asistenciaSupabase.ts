import type { APIRoute } from "astro";
import { supabase } from "../../lib/supabase";

export const POST: APIRoute = async ({ request, redirect }) => {
	const formData = await request.formData();
	const { nombre, apellidos, quimico, llevaraNiños } =
		Object.fromEntries(formData);

	const { data: invitado, error: errorInvitado } = await supabase
		.from("invitados")
		.insert([
			{ nombre, apellidos, quimico, llevaraNiños: llevaraNiños === "on" },
		])
		.select();

	if (errorInvitado) {
		return new Response(
			JSON.stringify({
				error: errorInvitado.message,
			}),
			{ status: 500 },
		);
	}

	if (llevaraNiños) {
		const cantidadNiños = Number(formData.get("cantidadNiños"));

		for (let i = 1; i <= cantidadNiños; i++) {
			const edadNiño = Number(formData.get(`edadNiño${i}`));

			const { error: errorNiño } = await supabase
				.from("niños")
				.insert([{ edad: edadNiño, invitado: invitado[0].id }]);

			if (errorNiño) {
				return new Response(
					JSON.stringify({
						error: errorNiño.message,
					}),
					{ status: 500 },
				);
			}
		}
	}

	return redirect("/");
};
