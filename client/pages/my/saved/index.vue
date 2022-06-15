<template>
	<div class="my_saved">
		<div class="title">관심제품</div>
		<div class="saved_item">
			<SavedComponent
				v-for="item in saveList"
				:key="item.data.id"
				:saved-data="item"
			></SavedComponent>
		</div>
	</div>
</template>

<script>
import SavedComponent from '@/components/user/saved/SavedComponent';
export default {
	components: { SavedComponent },
	middleware: 'authenticated',
	async asyncData({ route, app, store }) {
		return await app.$axios
			.$get('my/saved')
			.then(res => {
				return { saveList: res };
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
			title: '나의 관심제품',
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
.my_saved {
	margin-top: 70px;
}
.title {
	padding: 15px 5%;
	font-weight: bold;
	font-size: 20px;
}
.saved_item {
	padding: 0 5%;
}
</style>
