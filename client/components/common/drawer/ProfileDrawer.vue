<template>
	<b-sidebar
		id="sidebar-profile"
		aria-labelledby="sidebar-no-header-title"
		no-header
		width="300px"
		right
		backdrop
		shadow
		target="123"
		@change="toggleBodyScrollbar"
	>
		<template v-slot:default="{ hide }">
			<div
				class="p-3"
				style="color: black; padding: 0rem !important; z-index: 5"
			>
				<div class="p--3">
					<span class="p--3-l" @click="hide"
						><b-icon icon="x" size="1.8rem"></b-icon
					></span>
					<span v-if="$store.state.isLogin" class="p--3-r"
						><b-avatar
							v-if="profile.notifyCount != undefined"
							:badge="String(profile.notifyCount)"
							size="1.8rem"
							badge-variant="danger"
							badge-top
							icon="bell"
						></b-avatar
					></span>
				</div>
				<div class="profile">
					<div class="profile_info">
						<div v-if="$store.state.isLogin" class="info_name">
							{{ profile.data.username }}
							<div class="info_img">
								<b-avatar></b-avatar>
							</div>
						</div>
						<div v-else class="info_name">
							로그인을 해주세요.
							<div class="info_img">
								<b-avatar></b-avatar>
							</div>
						</div>
						<br />
						<!--
						<div class="info_raffle">
							<div class="raffle_nots">0</div>
							<div class="raffle_not">미응모</div>
						</div>
						-->
						<div v-if="$store.state.isLogin" class="info_data">
							<div class="info_raffle" @click="raffle">
								<div class="raffle_nots">{{ profile.drawCount }}</div>
								<div class="raffle_not">응모중</div>
							</div>
							<div class="info_raffle" @click="saved">
								<div class="raffle_nots">{{ profile.savedCount }}</div>
								<div class="raffle_not">관심</div>
							</div>
							<div class="info_raffle" @click="address">
								<div class="raffle_nots">{{ profile.addressCount }}</div>
								<div class="raffle_not">주소록</div>
							</div>
						</div>
						<div v-else class="btn_login" @click="login">로그인</div>
					</div>
				</div>
				<div class="menu_list">
					<!-- <div class="account_info">
                      <div class="l_1">프로필 수정</div>
                      <div class="r_1">
                        <b-icon icon="chevron-right"></b-icon>
                      </div>
                    </div> -->
					<!-- <div class="account_info">
                      <div class="l_1">나의 신발장</div>
                      <div class="r_1">
                        <b-icon icon="chevron-right"></b-icon>
                      </div>
                    </div> -->
					<!-- <div class="account_info2">
                      <div class="l_1">공지사항</div>
                      <div class="r_1">
                        <b-icon icon="chevron-right"></b-icon>
                      </div>
                    </div> -->
					<div class="line_top"></div>
					<nuxt-link :to="{ path: '/list', query: { p: '1' } }"
						><div class="menu">
							<div class="l_1">RELEASE</div>
							<div class="r_1">
								<b-icon icon="chevron-right"></b-icon>
							</div></div
					></nuxt-link>
					<nuxt-link :to="{ path: '/web/closed', query: { p: '1' } }"
						><div class="menu">
							<div class="l_1">CLOSED SOON</div>
							<div class="r_1">
								<b-icon icon="chevron-right"></b-icon>
							</div></div
					></nuxt-link>
					<nuxt-link :to="{ path: '/web/draw', query: { p: '1' } }"
						><div class="menu">
							<div class="l_1">ON DRAW</div>
							<div class="r_1">
								<b-icon icon="chevron-right"></b-icon>
							</div></div
					></nuxt-link>
					<nuxt-link :to="{ path: '/web/completed', query: { p: '1' } }"
						><div class="menu">
							<div class="l_1">COMPLETED</div>
							<div class="r_1">
								<b-icon icon="chevron-right"></b-icon>
							</div></div
					></nuxt-link>
					<div class="line_bottom"></div>
					<div class="menu top" @click="notice()">
						<div class="l_1">NOTICE</div>
						<div class="r_1">
							<b-icon icon="chevron-right"></b-icon>
						</div>
					</div>
					<div v-if="$store.state.isLogin" class="menu line" @click="logout()">
						<div class="l_1">LOGOUT</div>
						<div class="r_1">
							<b-icon icon="chevron-right"></b-icon>
						</div>
					</div>
				</div>
			</div>
		</template>
	</b-sidebar>
</template>

<script>
export default {
	data() {
		return {
			profile: {
				drawCount: 0,
				savedCount: 0,
				data: {
					usernme: '',
				},
				recent_view: { data: [] },
			},
		};
	},
	methods: {
		async getProfile() {
			if (this.$store.state.isLogin) {
				await this.$axios.$post('my/drawer').then(res => {
					this.profile = res;
				});
			}
		},
		address() {
			this.toggleBodyScrollbar(false);
			this.$router.push('/my/address');
		},
		login() {
			this.toggleBodyScrollbar(false);
			this.$router.push('/login');
		},
		notice() {
			this.toggleBodyScrollbar(false);
			this.$router.push('/notice');
		},
		raffle() {
			this.toggleBodyScrollbar(false);
			this.$router.push('/my/raffle?q=1');
		},
		saved() {
			this.toggleBodyScrollbar(false);
			this.$router.push('/my/saved');
		},
		logout() {
			this.$store.dispatch('LOGOUT').then(res => {
				this.toggleBodyScrollbar(false);
			});
		},
		toggleBodyScrollbar(visible) {
			const el = document.body;
			if (visible) {
				el.classList.add('slideout-panel-open');
				this.getProfile();
			} else {
				el.classList.remove('slideout-panel-open');
			}
		},
	},
};
</script>

<style scoped>
/* 모바일 리스트 누르면 나오는 프로파일 */
.p--3 {
	padding: 1rem 1rem 0rem 1rem;
}
.p--3-l {
	float: left;
}
.p--3-r {
	float: right;
}
.p--3-r .badge-secondary {
	background-color: #f8f9fa;
	color: black;
}
.l_1 {
	color: #333;
	display: inline-block;
	float: left;
	font-size: 1.3rem;
	font-weight: bold;
}
.r_1 {
	font-size: 1rem;
	display: inline-block;
	float: right;
	position: absolute;
	right: 4%;
}
.recented_items {
	width: 100%;
	border-top: 6px solid rgb(237, 237, 237);
	padding: 4vw 0 4vw 4vw;
}
.recented_item {
	margin-top: 1vh;
	padding: 0.3rem 0.7rem 0.3rem 0.7rem;
	border-bottom: 6px solid rgb(237, 237, 237);
}
.swiper {
	z-index: 0;
}
.swiper-slide {
	width: 40vw !important;
}
.swiper_item {
	font-weight: bold;
	background: rgba(157, 160, 162, 0.09);
	padding: 0 0.3rem;
	border-radius: 5px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.item_info {
	height: 100%;
	background: rgb(243, 243, 243);
	border-radius: 4px;
}
.item_img img {
	width: 100%;
}
.item_title {
	font-size: 0.65rem;
	font-weight: 400;
}
.logout {
	padding: 0.3rem 0 1rem 0;
	text-align: center;
	width: 100%;
	font-size: 0.9rem;
	font-weight: 400;
	right: 0.4rem;
	bottom: 5px;
	position: absolute;
}
.btn_login {
	display: inline-block;
	width: 100%;
	text-align: center;
	font-size: 0.8rem;
	border-radius: 6px;
	padding: 4%;
	background: #eeeeee;
}
.profile {
	padding: 20% 7% 0 7%;
}
.profile > div {
}
.profile_info {
	width: 100%;
	text-align: left;
	padding-bottom: 3vh;
}
.info_name {
	color: black;
	font-weight: 700;
	width: 100%;
	display: flex;
	align-items: center;
}
.info_img {
	position: absolute;
	right: 7%;
}
.info_raffle {
	display: inline-block;
	font-size: 1.1rem;
	margin-right: 5px;
	color: rgb(94, 94, 94);
}
.raffle_nots {
	color: black;
	font-size: 1rem;
}
.raffle_not {
	margin-right: 5px;
	font-size: 0.6875rem;
}

.menu_list {
	padding: 0 16px 0rem 16px;
}
.menu {
	display: flex;
	padding: 3% 0 3% 0;
	cursor: pointer;
}
.line_top {
	width: 100%;
	border-top: 1px solid rgb(237, 237, 237);
	padding: 2% 0 2% 0;
}
.line_bottom {
	width: 100%;
	border-bottom: 1px solid rgb(237, 237, 237);
	padding: 2% 0 2% 0;
}
.menu_list .top {
	padding-top: 6%;
}
a {
	color: black;
	text-decoration: none;
}
.nuxt-link-exact-active.nuxt-link-active {
	color: black;
}
</style>
