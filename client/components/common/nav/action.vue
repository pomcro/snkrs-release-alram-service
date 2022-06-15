<template>
	<header>
		<div class="logo">
			<div class="logo_navbar">
				<b-navbar toggleable="sm">
					<svg-icon
						class="ico-arrow-back"
						name="ico-arrow-back"
						@click="back()"
					/>
					<div class="nav_title">
						<span>{{ this.$store.state.layout.title }}</span>
					</div>
				</b-navbar>
				<!-- <b-col></b-col>
        <b-col><img :src="img.logo"/></b-col>
        <b-col class="navbar_tools h5 mb-2">
          <b-icon icon="search" class="navbar_tool"></b-icon>
          <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>
        </b-col> -->
			</div>
		</div>
	</header>
</template>

<script>
export default {
	data() {
		return {
			isLogin: false,
			searchStr: '',
			navChk: false,
		};
	},
	methods: {
		back() {
			this.$router.push(this.$store.state.history);
		},
		navCheck() {
			this.navChk = !this.navChk;
		},
	},
};
</script>

<style scoped>
[class*='ico-'] {
	flex: 0 0 24px;
	width: 18px;
	height: 18px;
}
.navbar {
	box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.05);
	padding: 0 5%;
	height: 54px;
	display: flex;
}
.nav_title {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	flex: 0 0 calc(100% - 24px);
}
.nav_title span {
	text-align: center;
	padding-right: 24px;
}
.header {
	width: 100%;
	text-align: center;
	background: white;
	z-index: 3;
}
header {
	position: fixed;
	height: auto;
	max-width: 430px;
	width: 100%;
	top: 0;
	background: white;
	z-index: 3;
}
</style>
