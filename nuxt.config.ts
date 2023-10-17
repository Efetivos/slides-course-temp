// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig ({
	devtools: { enabled: false },
	experimental: {
		payloadExtraction: true
	},
	app: {
		head: {
			title: 'Nuxt3 ThreeJs',
			htmlAttrs: {
				lang: 'en'
			},
			meta: [
				{ charset: 'utf-8' },
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
				{ hid: 'description', name: 'description', content: "This course will help and give you some essential insights into how we can achieve better results and goals without sacrificing any vital area of our life. After finishing it, you'll be able to unleash your best version." },
				{ name: 'format-detection', content: 'telephone=no' },
				{ name: 'theme-color', content: '#000000' },
				{ name: 'og:image', content: '/cover.png' },
				{ name: 'og:image:secure_url', content: '/cover.png' },
				{ name: 'og:image:width', content: '1200' },
				{ name: 'og:image:height', content: '630' },
				{ name: 'msapplication-TileColor', content: '#000000' }
			],
			link: [
				{ rel: 'icon', type: 'image/png', href: '/favicon.png' }
			],
		},
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [
		'~/assets/fonts/fonts.css',
		'~/assets/sass/app.sass'
	],
	prismic: {
		endpoint: "https://slides-testing.cdn.prismic.io/api/v2",
		linkResolver: "~/app/prismic/link-resolver.js",
		preview: false
	},

	vite: {
	},
	modules: [
		["@nuxtjs/prismic", {
			"endpoint": "https://slides-testing.cdn.prismic.io/api/v2",
		}],
		
		['@nuxtjs/google-fonts', {
			families: {
				Inter: [300, 400, 500, 600],
			}
		}]
	]
})
