<template>
	<div>
		<Grid
			:item-data="item_list"
			:view-type="'A'"
			@list-method="nextPage"
		></Grid>
	</div>
</template>

<script>
import Grid from '@/components/common/layout/Grid.vue';
export default {
	components: {
		Grid,
	},
	async asyncData({ route, app, store }) {
		const data = {
			fullPath: route.fullpath,
			name: route.name,
			query: route.query,
		};
		store.state.requestLog = data;
		if (route.query.p === undefined) {
			route.query.p = 1;
		}
		const postData = {
			page: route.query.p,
		};
		return await app.$axios
			.$post('/web/list', postData)
			.then(res => {
				return { item_list: res };
			})
			.catch(err => {
				console.log(err);
			});
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
			hasNavAction: false, // Header 타입
			navTransParent: false, // 투명도 설정
			hasFooter: true, // Footer 여부
		};
		this.$store.state.layout = layout;
	},
	methods: {
		async nextPage(query) {
			this.$nuxt.$loading.start();
			const data = {
				fullPath: this.$route.fullpath,
				name: this.$route.name,
				query: this.$route.query,
			};
			this.$store.state.requestLog = data;
			const postData = {
				page: query.p,
			};
			return await this.$axios
				.$post('/web/list', postData)
				.then(res => {
					this.$emit('update', res);
					return { item_list: res };
				})
				.catch(err => {
					console.log(err);
				});
		},
	},
	head() {
		return {
			title: `SNKRS98 | 스니커즈98 - 발매예정 스니커즈`,
			description: `지금 바로 발매가 예정되어있는 한정판 스니커즈를 확인해보세요!`,
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: `지금 바로 발매가 예정되어있는 한정판 스니커즈를 확인해보세요!`,
				},
				{
					hid: 'twitter:description',
					name: 'twitter:description',
					content: `지금 바로 발매가 예정되어있는 한정판 스니커즈를 확인해보세요!`,
				},
				{
					hid: 'og:description',
					name: 'og:description',
					content: `지금 바로 발매가 예정되어있는 한정판 스니커즈를 확인해보세요!`,
				},
			],
		};
	},
};
</script>

<style></style>
