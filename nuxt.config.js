// require('events').EventEmitter.defaultMaxListeners = 50;
export default {
	// nuxt: {
	//   host: '0.0.0.0'
	// },
	components: true,
	ssr: true,
	// ga

	// client Directory
	srcDir: 'client/',
	server: {
		host: '0.0.0.0',
		port: '8080',
	},
	// robots settings
	robots: [
		{
			UserAgent: '*',
			Allow: '/',
			Disallow: () => ['/admin*', '/my*', '/signup*'],
		},
		{
			UserAgent: 'Googlebot-Image',
			Disallow: '/',
		},
		{
			UserAgent: 'Googlebot',
			Disallow: () => ['/*.gif$', '/*.png$', '/*.jpg$'],
		},
		{
			UserAgent: 'Yeti',
			Disallow: () => ['/*.gif$', '/*.png$', '/*.jpg$'],
		},
		{
			UserAgent: '*',
			Disallow: () => ['/*.gif$', '/*.png$', '/*.jpg$'],
		},
		{
			Sitemap: 'https://s3.snkrs98.com/ko-kr/sitemap/sitemap.xml',
		},
	],
	// pwa
	pwa: {
		manifest: {
			gcm_sender_id: '1013642204837',
			name: 'SNKRS98',
			short_name: 'SNKRS98',
			start_url: '/',
			display: 'standalone',
			background_color: '#000',
		},
		workbox: {
			runtimeCaching: [
				{
					handler: 'CacheFirst',
					urlPattern: '/*',
					strategyOptions: {
						cacheName: `v1`,
						cacheExpiration: {
							maxAgeSeconds: 30 * 60,
						},
					},
				},
			],
		},
	},
	// ga
	googleAnalytics: {
		id: 'UA-188011709-2',
		// dev: process.env.NODE_ENV !== 'production',
	},
	publicRuntimeConfig: {
		googleAnalytics: {
			id: 'UA-188011709-2',
		},
	},
	/*
	 ** Headers of the page
	 */
	head: {
		title: 'SNKRS98 | 스니커즈98 - 한정판 신발 응모/발매정보',
		meta: [
			{
				name: 'naver-site-verification',
				content: 'bfe6f82cf8f30a058cca8e1468ffb938a98680a9',
			},
			{
				name: 'google-site-verification',
				content: 'KyOvdNZP87fGWQNdy32Uq05DoE2KaMGlW0Dqp0xTw6o',
			},
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{
				hid: 'keywords',
				name: 'keywords',
				content:
					'한정판신발,한정판운동화,한정판스니커즈,한정판신발응모,한정판스니커즈응모,국내발매정보,한정판운동화응모,조던,나이키,아디다스,뉴발란스,이지,snkrs,드로우,나이키드로우,라플,래플',
			},
			{
				hid: 'description',
				name: 'description',
				content:
					'국내/해외 한정판 신발 응모/발매정보를 SNKRS98에서 미리 받아보세요!',
			},
			{
				hid: 'twitter:card',
				name: 'twitter:card',
				content: 'SNKRS98 | 스니커즈98 - 한정판 신발 응모/발매정보 플랫폼',
			},
			{ hid: 'twitter:site', name: 'twitter:site', content: 'SNKRS98' },
			{ hid: 'twitter:creator', name: 'twitter:creator', content: 'SNKRS98' },
			{
				hid: 'twitter:title',
				name: 'twitter:title',
				content: 'SNKRS98 | 스니커즈98 - 한정판 신발 응모/발매정보 플랫폼',
			},
			{
				hid: 'twitter:description',
				name: 'twitter:description',
				content:
					'국내/해외 한정판 신발 응모/발매정보를 SNKRS98에서 미리 받아보세요!',
			},
			{
				hid: 'twitter:image',
				name: 'twitter:image',
				property: 'twitter:image',
				content: 'https://snkrs98.com/meta_image.png',
			},
			{
				hid: 'og:image',
				name: 'og:image',
				property: 'og:image',
				content: 'https://snkrs98.com/meta_image.png',
			},
			{
				hid: 'og:site_name',
				name: 'og:site_name',
				content: 'SNKRS98',
			},
			{
				hid: 'og:title',
				name: 'og:title',
				content: 'SNKRS98 | 스니커즈98 - 한정판 신발 응모/발매정보 플랫폼',
			},
			{
				hid: 'og:description',
				name: 'og:description',
				content:
					'국내/해외 한정판 신발 응모/발매정보를 SNKRS98에서 미리 받아보세요!',
			},
		],
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
	},
	// router hash func
	router: {
		mode: 'history',
		scrollBehavior(to, from, savedPosition) {
			return { x: 0, y: 0 };
		},
	},
	// transition
	/*
	 ** Customize the progress-bar color
	 */
	loading: '~/components/common/Loading.vue',
	/*
	 ** Global CSS
	 */
	css: [
		'swiper/css/swiper.css',
		'~assets/css/reset.css',
		'~assets/css/main.css',
		'~assets/css/custombootstrap.css',
	],
	/*
	 ** Plugins to load before mounting the App
	 */
	plugins: [
		{ src: '~/plugins/service-worker.js', ssr: false },
		{ src: '~/plugins/sw.js', ssr: false },
		{ src: '@/plugins/nuxt-paginate-plugin', mode: 'client' },
		{ src: '@/plugins/nuxt-swiper-plugin', mode: 'client' },
		{ src: '~/plugins/vue-infinite-loading.js', mode: 'client' },
		{ src: '@/plugins/script-loader', mode: 'client' },
		{ src: '@/plugins/vue-sliding-panel', mode: 'client' },
		'~/plugins/bootstrap-vue',
		'@/plugins/axios-interceptors',
	],
	/*
	 ** Nuxt.js dev-modules
	 */
	mq: {
		defaultBreakpoint: 'test',
		breakpoints: {
			mobiled: 450,
			tablet: 768,
			desktop: Infinity,
		},
	},
	// next-mq setting

	buildModules: [
		// Doc: https://github.com/nuxt-community/eslint-module
		'@nuxtjs/eslint-module',
	],
	/*
	 ** Nuxt.js modules
	 */
	bootstrapVue: {
		// Add the desired icon components to the `components` array
		icons: true,
		components: ['BIcon'],
	},
	modules: [
		'@nuxtjs/pwa',
		'@nuxtjs/google-analytics',
		'@nuxtjs/robots',
		'@nuxtjs/svg-sprite',
		'vue-daum-postcode/nuxt',
		'cookie-universal-nuxt',
		'nuxt-svg-loader',
		// Doc: https://bootstrap-vue.js.org
		'bootstrap-vue/nuxt',
		// Doc: https://axios.nuxtjs.org/usage
		'@nuxtjs/axios',
		// Doc: https://github.com/nuxt-community/dotenv-module
		'@nuxtjs/dotenv',
		// nuxt-mq
		'nuxt-mq',
		'nuxt-helmet',
	],
	svgSprite: {
		// manipulate module options
		input: '~/assets/sprite/svg/',
		output: '~/static/assets/svg/',
	},
	/*
	 ** Axios module configuration
	 ** See https://axios.nuxtjs.org/options
	 */
	axios: {},
	/*
	 ** Build configuration
	 */
	build: {
		html: {
			minify: {
				collapseWhitespace: true, // as @dario30186 mentioned
				removeComments: true, // 👈 add this line
			},
		},
		extractCSS: true,
		// analyze: {
		// 	analyzerMode: 'static',
		// },
		// minimize
		minimize: true,
		minimizer: [
			// terser-webpack-plugin
			// optimize-css-assets-webpack-plugin
		],
		// optimization: {
		// 	splitChunks: {
		// 		chunks: 'all',
		// 		automaticNameDelimiter: '.',
		// 		name: 'test',
		// 		maxSize: 200000,
		// 	},
		// },
		hotMiddleware: {
			// client: {
			//   // turn off client overlay when errors are present
			//   overlay: false,
			// },
		},
		/*
		 ** You can extend webpack config here
		 */
		extend(config, { isClient }) {
			if (isClient) {
				config.optimization.splitChunks.maxSize = 500000;
			}
		},
		babel: { compact: true },
	},
};
