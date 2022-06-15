<template>
	<header>
		<div class="logo">
			<div class="logo_navbar">
				<b-navbar toggleable="sm">
					<nuxt-link to="/" class="logo_index">
						<svg-icon class="logo-icon" name="static/logo" />
					</nuxt-link>
					<div class="nav_btn_box">
						<div class="nav_btn mb-2 h5">
							<svg-icon
								v-b-toggle.sidebar-search
								style="pointer: cursor; outline: none"
								placeholder="Search"
								target="456"
								class="ico-search"
								name="ico-search"
							/>
							<SearchDrawer
								:search-lank="this.$store.state.mainData.searchLank"
							></SearchDrawer>
						</div>
						<div class="nav_btn nav_btn_last mb-2 h5">
							<svg-icon
								v-b-toggle.sidebar-search
								v-b-toggle.sidebar-profile
								style="pointer: cursor; outline: none"
								target="123"
								class="ico-menu"
								name="ico-menu"
							/>
							<ProfileDrawer></ProfileDrawer>
						</div>
					</div>
				</b-navbar>
				<!-- <b-col></b-col>
        <b-col><img :src="img.logo"/></b-col>
        <b-col class="navbar_tools h5 mb-2">
          <b-icon icon="search" class="navbar_tool"></b-icon>
          <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>
        </b-col> -->
			</div>
			<client-only>
				<div v-if="$store.state.layout.hasNav" class="logo_nav">
					<div class="nav_router">
						<NuxtLink :to="{ name: 'index' }" class="router">발매정보</NuxtLink>
					</div>
					<div class="nav_router">
						<nuxt-link to="/timeline" class="router">타임라인</nuxt-link>
					</div>
				</div>
			</client-only>
		</div>
	</header>
</template>

<script>
import ProfileDrawer from '@/components/common/drawer/ProfileDrawer.vue';
import SearchDrawer from '@/components/common/drawer/SearchDrawer.vue';
export default {
	components: {
		ProfileDrawer,
		SearchDrawer,
	},
	data() {
		return {
			isLogin: false,
			searchStr: '',
			navChk: false,
		};
	},
	methods: {
		navCheck() {
			this.navChk = !this.navChk;
		},
	},
};
</script>

<style scoped>
a {
	text-decoration: none;
	outline: none;
}

.logo-icon {
	width: 100px;
	height: 24px;
	vertical-align: top;
	margin-left: 4%;
}
.username {
	color: white;
}
header {
	width: 100%;
	max-width: 430px;
	text-align: center;
	background-color: white;
	position: fixed;
	height: auto;
	top: 0;
	box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.05);
	z-index: 3;
}
img {
	width: 50%;
}
/* 로고 모바일 */
.logo {
	width: 100%;
	display: block;
}
.logo_navbar {
	height: 54px;
	padding: 0;
	display: grid;
}
.logo_navbar img {
	width: 38%;
}
.navbar > .logo_index {
	margin-left: 8px;
	display: block;
	text-align: left;
}
.navbar {
	padding: 0;
}
.navbar-toggler {
	border: none;
	color: black;
}
.mb-2,
.my-2 {
	margin-bottom: 0 !important;
}
/* 모바일  로고 라우터 바 */
.logo_nav {
	width: 100%;
	height: 42px;
}
.nav_router {
	display: inline-block;
	width: 49.2%;
	height: 100%;
	line-height: 42px;
}
.router {
	display: block;
	width: 100%;
	height: 100%;
	font-size: 13px;
	font-weight: 300;
	color: black;
	text-decoration: none;
}
.nav_btn_box {
	position: absolute;
	right: 0;
}
.nav_btn_last {
	margin-right: 0.5rem;
}
.nav_btn {
	display: inline-block;
	outline: none;
	border-radius: 100px;
	width: 30px;
	height: 30px;
}
.nav_btn:hover,
.nav_btn:active {
	background: #e5e5e5;
}
/* 라우터 활성화시 모습 */
.router.nuxt-link-exact-active {
	display: block;
	width: 100%;
	height: 42px;
	padding: 0 1rem 0 1rem;
	font-size: 0.8rem;
	border-bottom: 0.3vh solid black;
	font-weight: 500 !important;
}
</style>
