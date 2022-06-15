import moment from 'moment';
import jwtdecode from 'jwt-decode';

export const strict = false;
export const actions = {
	async nuxtServerInit({ commit, state }, { app }) {
		try {
			// Token 가져옴
			const cookie = this.$cookies.getAll();
			if ('authToken' in cookie) {
				const isExpired = isJwtExpired(state, cookie.authToken);
				if (isExpired) {
					// 재갱신
					await this.dispatch('REFRESH_TOKEN');
				} else {
					commit('setAuth', cookie);
				}
				state.isAdmin = isAdmin(cookie.authToken);
			}
		} catch (e) {
			console.log(e);
		}
	},
	async REFRESH_TOKEN({ commit, state }) {
		const cookie = this.$cookies.getAll();
		if ('refreshToken' in cookie) {
			const isExpired = isJwtExpired(state, cookie.refreshToken);
			if (isExpired) {
				// 재로그인
				return false;
			} else {
				const data = { refresh_token: cookie.refreshToken };
				const response = await this.$axios.post('auth/refresh', data);
				const newToken = response.data.token;
				const userInfo = response.data.user;
				this.$cookies.set('authToken', newToken);
				state.authToken = newToken;
				state.userInfo = userInfo;
				this.$cookies.set('userInfo', userInfo);
				await commit('updateAxios');
				return true;
			}
		} else {
			return false;
		}
	},
	async kakaoLogin({ commit, state }) {
		/* eslint-disable */
		if (!Kakao.isInitialized()) {
			Kakao.init(process.env.VUE_APP_KAKAO_CLIENT_ID);
		}
		const redirectUri =
		process.env.NODE_ENV === 'production'
			? process.env.VUE_APP_WEB_URL
			: process.env.VUE_APP_WEB_DEV_URL;
		await Kakao.Auth.authorize({
			redirectUri: redirectUri + '/login/callback/kakao'
		});
		/* eslint-enable */
	},
	async Login({ commit, state }, { data }) {
		try {
			const result = await this.$axios.post('auth/login', data);
			const res = result.data;
			return await this.dispatch('LoginResponse', { res }).then(response => {
				return response;
			});
		} catch (e) {
			console.log(e);
		}
	},
	LoginResponse({ commit, state }, { res }) {
		// eslint-disable-next-line no-var
		var response = {};
		response.code = res.code;
		if (res.code === 0) {
			response.message = '로그인 성공';
			commit('LOGIN', res);
		} else if (res.code === 1) {
			response.message = '존재하지 않는 아이디 또는 이메일입니다.';
		} else if (res.code === 2) {
			response.message = '잘못된 패스워드 입니다.';
		} else {
			response.message = '알 수 없는 오류';
		}
		return response;
	},
	LOGOUT({ commit }) {
		commit('LOGOUT');
		return true;
	},
};
export const mutations = {
	setData(state, text) {
		state.mainData = text;
	},
	setAuth(state, cookie) {
		state.authToken = cookie.authToken;
		state.userInfo = decodeURI(cookie.userInfo);
	},
	LOGIN(state, result) {
		state.authToken = result.token;
		state.isLogin = true;
		state.userInfo = result.user;
		state.isAdmin = isAdmin(result.token);

		this.$cookies.set('refreshToken', result.refresh_token);
		this.$cookies.set('authToken', result.token);
		this.$cookies.set('userInfo', result.user);
		this.commit('updateAxios');
		this.$router.back();
	},
	LOGOUT(state) {
		state.accessToken = null;
		state.isLogin = false;
		this.$cookies.removeAll();
		this.commit('updateAxios');
	},
	updateAxios(state) {
		this.$axios.defaults.baseURL = 'https://api.snkrs98.com/v1/';
		this.$axios.interceptors.request.use(
			function(config) {
				// Do something before request is sent
				const isLogin = state.isLogin;
				if (isLogin) {
					config.headers.Authorization = 'Bearer ' + state.authToken;
				} else {
					config.headers.Authorization = null;
				}

				return config;
			},
			function(error) {
				// Do something with request error
				return Promise.reject(error);
			},
		);
	},
};
export const state = () => ({
	mainData: [],
	timeline: [],
	authToken: null,
	isLogin: false,
	isAdmin: false,
	userInfo: {},
	notifyCount: 0,
	requestLog: null,
	history: '/',
	loading: false,
	layout: {
		hasHeader: true,
		hasFooter: true,
		hasNav: true,
		hasNavAction: false,
		navTransParent: false,
		title: '',
	},
});
export const getters = {
	getToken(state) {
		return state.authToken;
	},
	isLogin(state) {
		return state.isLogin;
	},
};

function isJwtExpired(state, token) {
	// 토큰 만료일을 쿠키 저장
	const date = moment().format('x');
	const decode = jwtdecode(token);
	const expires = moment(decode.exp) * 1000;
	const seconds = Math.floor((expires - date) / 1000);
	if (seconds < 300) {
		state.isLogin = false;
		return true;
	} else {
		state.isLogin = true;
		return false;
	}
}

function isAdmin(token) {
	const decode = jwtdecode(token);
	if (decode.role === 999) {
		return true;
	} else {
		return false;
	}
}
