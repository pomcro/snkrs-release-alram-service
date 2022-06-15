/* global Kakao, var2 */
<template>
	<div class="login">
		<client-only>
			<div class="view">
				<div class="title">
					한정판 스니커즈 응모는<br />
					<span style="font-weight:bold;color:black">SNKRS98</span>
				</div>
				<div class="login_form">
					<label for="email">이메일 주소</label>
					<input id="email" v-model="email" type="email" class="inputtext" />
					<label for="password" class="pwlabel">
						<span style="float:left">비밀번호</span>
						<!--
						<span style="float:right;color:rgb(41, 128, 185)"
							>비밀번호를 잊으셨습니까?</span
						>-->
					</label>
					<input
						id="password"
						v-model="password"
						class="inputtext"
						type="password"
					/>
				</div>
				<button class="login_btn" @click="login({ email, pw: password })">
					로그인
				</button>
				<div class="search_id">
					회원이 아니십니까?
					<nuxt-link to="/signup"><span>회원가입</span></nuxt-link>
				</div>
				<div class="deco">
					<hr />
					<span>혹은</span>
					<hr />
				</div>
				<div class="another_login">
					<button
						href="#"
						type="button"
						class="btn_login_naver"
						@click="naverLogin"
					>
						<svg-icon class="logo-naver" name="ico-logo-naver" />
						네이버 계정으로 로그인
					</button>
					<button
						href="#"
						type="button"
						class="btn_login_kakao"
						@click="kakaoLogin"
					>
						<svg-icon class="logo-kakao" name="ico-logo-kakao" />
						카카오 계정으로 로그인
					</button>
					<!--
					<button
						href="#"
						type="button"
						class="btn_login_facebook"
						@click="facebookLogin"
					>
						<svg
							id="i-logo-facebook"
							xmlns="http://www.w3.org/2000/svg"
							class="logo-facebook"
							fill="none"
							viewBox="0 0 20 20"
						>
							<path
								fill="#ffffff"
								d="M11.344,5.71c0-0.73,0.074-1.122,1.199-1.122h1.502V1.871h-2.404c-2.886,0-3.903,1.36-3.903,3.646v1.765h-1.8V10h1.8v8.128h3.601V10h2.403l0.32-2.718h-2.724L11.344,5.71z"
							></path>
						</svg>
						페이스북 계정으로 로그인
					</button>
					-->
				</div>

				<div style="clear:both"></div>
			</div>
		</client-only>
	</div>
</template>

<script>
import Vue from 'vue';
export default {
	middleware: 'notAuthenticated',
	asyncData({ route, app, store }) {
		const data = {
			fullPath: route.fullpath,
			name: route.name,
			query: route.query,
		};
		store.state.requestLog = data;
	},
	data() {
		return {
			email: '',
			password: '',
			isKakaoLoad: false,
			gaEvent: {
				category: 'signin',
				action: 'sign in',
				label: '',
				value: 1,
			},
		};
	},
	beforeRouteEnter(to, from, next) {
		next(vm => {
			vm.$store.state.history = from.path;
			vm.prevRoute = from;
		});
	},
	created() {
		const layout = {
			hasHeader: true, // Header 여부
			hasNav: false, // Nav(발매정보 / 타임라인) 여부
			hasNavAction: true, // Header 타입
			navTransParent: true, // 투명도 설정
			hasFooter: false, // Footer 여부
			title: '로그인',
		};
		this.$store.state.layout = layout;
	},
	mounted() {
		// 카카오로 로그인하기 스크립트
		Vue.loadScript('https://developers.kakao.com/sdk/js/kakao.js')
			.then(() => {
				// Script is loaded, do something
				this.isKakaoLoad = true;
				// eslint-disable-next-line no-undef
				Kakao.init(process.env.VUE_APP_KAKAO_CLIENT_ID);
			})
			.catch(() => {
				// Failed to fetch script
			});
		// eslint-disable-next-line nuxt/no-globals-in-created
		// if (!window.FB) this.facebookInit();
	},
	methods: {
		facebookInit() {
			/* eslint-disable */
			window.fbAsyncInit = function() {
				FB.init({
					appId: process.env.VUE_APP_FACEBOOK_APP_ID,
					cookie: true,
					xfbml: true,
					version: process.env.VUE_APP_FACEBOOK_APP_VERSION,
				});

				FB.AppEvents.logPageView();
			};

			(function(d, s, id) {
				let js;
				const fjs = d.getElementsByTagName(s)[0];
				if (d.getElementById(id)) {
					return;
				}
				js = d.createElement(s);
				js.id = id;
				js.src = 'https://connect.facebook.net/en_US/sdk.js';
				fjs.parentNode.insertBefore(js, fjs);
			})(document, 'script', 'facebook-jssdk');
			/* eslint-enable */
		},
		facebookLogin() {
			// eslint-disable-next-line no-undef
			FB.getLoginStatus(function(response) {
				// See the onlogin handler
				if (response.status === 'connected') {
					// Logged into your webpage and Facebook.
					// eslint-disable-next-line no-undef
					FB.api('/me', function(response) {
						document.getElementById('status').innerHTML =
							'Thanks for logging in, ' + response.name + '!';
					});
				} else {
					// Not logged into your webpage or we are unable to tell.
					document.getElementById('status').innerHTML =
						'Please log ' + 'into this webpage.';
				}
			});
		},
		naverLogin() {
			this.gaEvent.label = 'naver login';
			this.$ga.event({
				eventCategory: this.gaEvent.category,
				eventAction: this.gaEvent.action,
				eventLabel: this.gaEvent.label,
				eventValue: this.gaEvent.value,
			});
			const redirectUri =
				process.env.NODE_ENV === 'production'
					? process.env.VUE_APP_WEB_URL
					: process.env.VUE_APP_WEB_DEV_URL;
			const redirectUrl = redirectUri + '/login/callback/naver';
			const rand = function() {
				return Math.random()
					.toString(36)
					.substr(2); //
			};
			// CSRF 공격 방지 State Token 생성
			const token = function() {
				return rand() + rand(); // to make it longer
			};
			const naverLogin =
				'https://nid.naver.com/oauth2.0/authorize?client_id=' +
				process.env.VUE_APP_NAVER_CLIENT_ID +
				'&response_type=code&redirect_uri=' +
				redirectUrl +
				'&state=' +
				token();
			window.location.href = naverLogin;
		},
		kakaoLogin() {
			if (this.isKakaoLoad) {
				this.gaEvent.label = 'kakao login';
				this.$ga.event({
					eventCategory: this.gaEvent.category,
					eventAction: this.gaEvent.action,
					eventLabel: this.gaEvent.label,
					eventValue: this.gaEvent.value,
				});
				this.$store.dispatch('kakaoLogin');
			}
		},
		login(data) {
			this.$nuxt.$loading.start();
			// 동일한 로직을 vuex action을 통해 구현한다
			this.gaEvent.label = 'login';
			this.$ga.event({
				eventCategory: this.gaEvent.category,
				eventAction: this.gaEvent.action,
				eventLabel: this.gaEvent.label,
				eventValue: this.gaEvent.value,
			});
			this.$store.dispatch('Login', { data }).then(res => {
				this.$nuxt.$loading.finish();
				if (res.code !== 0) {
					alert(res.message);
				}
			});
		},
	},
};
</script>

<style scoped>
.btn_login_facebook {
	position: relative;
	background: #4267b2;
	width: 100%;
	border-radius: 12px;
	color: white;
	padding: 10px;
	margin-top: 10px;
}
.btn_login_naver {
	position: relative;
	background: #5ac451;
	width: 100%;
	border-radius: 12px;
	color: white;
	padding: 10px;
}
.logo-kakao,
.logo-facebook,
.logo-naver {
	position: absolute;
	width: 20px;
	height: 18px;
	top: 50%;
	margin-top: -9px;
	left: 18px;
}
.btn_login_kakao {
	position: relative;
	background: #fee500;
	width: 100%;
	border-radius: 12px;
	color: rgba(0, 0, 0, 0.85);
	padding: 10px;
	margin-top: 10px;
}
/* 모바일 뷰 */
.view {
	padding: 100px 7%;
}
.title {
	font-size: 1.8rem;
	color: rgb(127, 127, 127);
	margin-bottom: 10%;
}
.inputtext {
	background-color: rgb(243, 243, 243);
	border-radius: 5px;
	border-width: 0px;
	border-style: none;
	padding: 10px;
	font-size: 0.9rem;
	width: 100%;
	height: 34px;
	margin-top: 6px;
}
label {
	font-size: 12px;
	color: #333333;
}
.pwlabel {
	width: 100%;
	margin-top: 5%;
	margin-bottom: 0;
}
button {
	width: 100%;
	border: none;
	font-size: 16px;
	color: rgb(255, 255, 255);
	text-align: center;
	height: 40px;
	border-radius: 12px;
}
.login_btn {
	background-color: rgb(0, 0, 0);
	margin-top: 5%;
}
.search_id {
	margin-top: 5%;
	margin-bottom: 1%;
	text-align: center;
	font-size: 12px;
}
.search_id span {
	color: rgb(41, 128, 185);
}
.deco {
	line-height: 2.5%;
	vertical-align: top;
	margin-bottom: 2%;
	display: flex;
	align-items: center;
}
hr {
	display: inline-block;
	width: 40.3%;
}
hr + span {
	padding-top: 10px;
	padding-bottom: 10px;
	line-height: 10px;
	vertical-align: top;
	display: inline-block;
	width: 30px;
	font-size: 12px;
	text-align: center;
}
.naver {
	background-color: rgb(29, 200, 0);
}
.google {
	background-color: rgb(220, 78, 65);
}
.facebook {
	background-color: rgb(59, 89, 152);
}
.kakao {
	background-color: #ffd54f;
}
</style>
