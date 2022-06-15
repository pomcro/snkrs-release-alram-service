<template>
	<div class="my_raffles">
		<div class="title">응모내역</div>
		<div class="type">
			<nuxt-link to="/my/raffle?q=1">
				응모진행중({{ drawList.active.length }})
			</nuxt-link>
			<nuxt-link to="/my/raffle?q=2"
				>응모내역({{ drawList.end.length }})</nuxt-link
			>
		</div>
		<div v-if="this.$route.query.q === '1'" class="raffle_item">
			<myRaffleComponent
				v-for="raffleData in drawList.active"
				:key="raffleData.id"
				:raffle-data="raffleData"
			></myRaffleComponent>
		</div>
		<div v-if="this.$route.query.q === '2'" class="raffle_item">
			<myRaffleComponent
				v-for="raffleData in drawList.end"
				:key="raffleData.id"
				:raffle-data="raffleData"
			></myRaffleComponent>
		</div>
	</div>
</template>

<script>
import myRaffleComponent from '@/components/user/raffle/myRaffleComponent';
export default {
	components: { myRaffleComponent },
	middleware: 'authenticated',
	async asyncData({ route, app, store }) {
		return await app.$axios
			.$get('my/draw')
			.then(res => {
				return { drawList: res };
			})
			.catch(err => {
				console.log(err);
			});
	},
	created() {
		const layout = {
			hasHeader: false, // Header 여부
			hasNav: false, // Nav(발매정보 / 타임라인) 여부
			hasNavAction: true, // Header 타입
			navTransParent: false, // 투명도 설정
			hasFooter: false, // Footer 여부
			title: '나의 응모내역',
		};
		this.$store.state.layout = layout;
	},
	beforeRouteEnter(to, from, next) {
		next(vm => {
			vm.$store.state.history = from.path;
			vm.prevRoute = from;
		});
	},
	methods: {
		back() {
			this.$router.back();
		},
	},
};
</script>

<style scoped>
.my_raffles {
	margin-top: 70px;
}
.title {
	padding: 15px 5%;
	font-weight: bold;
	font-size: 20px;
}
.type {
	padding: 0 5%;
}
.type a {
	display: inline-block;
	width: 49.2%;
	height: 35px;
	font-size: 13px;
	text-align: center;
	vertical-align: middle;
	line-height: 35px;
	border-radius: 2px;
	background-color: #f5f5f5;
	color: #000000;
	outline: none;
	border: none;
	text-decoration: none;
}
.type .nuxt-link-exact-active {
	background-color: #000000;
	color: #f5f5f5;
}
.raffle_item {
	padding: 0 5%;
}
</style>
