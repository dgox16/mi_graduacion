const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		screens: {
			xs: "380px",
			...defaultTheme.screens,
		},
		extend: {
			width: {
				recommend: "115ch",
			},
		},
		// fontFamily: {
		//     display: ["Onest Variable"],
		//     body: ["Onest Variable"],
		// },
	},

	plugins: [],
};
