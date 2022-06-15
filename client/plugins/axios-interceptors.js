export default function({ $axios, store }) {
	$axios.defaults.baseURL = 'https://api.snkrs98.com/v1/';
	$axios.interceptors.request.use(
		function(config) {
			// Do something before request is sent
			const isLogin = store.state.isLogin;
			if (isLogin) {
				config.headers.Authorization = 'Bearer ' + store.state.authToken;
			}

			return config;
		},
		function(error) {
			// Do something with request error
			return Promise.reject(error);
		},
	);

	// Add a response interceptor
	$axios.interceptors.response.use(
		function(response) {
			// Any status code that lie within the range of 2xx cause this function to trigger
			// Do something with response data
			return response;
		},
		async function(error) {
			// Any status codes that falls outside the range of 2xx cause this function to trigger
			// Do something with response error
			console.log(error);
			if (
				error.response.status === 401 &&
				error.response.data.body.includes('Unauthorized')
			) {
				// 토큰 만료
				const isUpdated = await store.dispatch('REFRESH_TOKEN');
				if (isUpdated === false) {
					// 재로그인
					console.log('재로그인');
				} else {
					return $axios.request(error.config);
				}
			}
			return Promise.reject(error);
		},
	);
}
