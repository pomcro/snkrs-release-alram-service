<template>
	<div>
		<Grid :item-data="list" :view-type="'A'" @list-method="nextPage"></Grid>
	</div>
</template>

<script>
import Grid from '@/components/common/layout/Grid.vue';
export default {
	components: {
		Grid,
	},
	/*
	watchQuery(newQuery, oldQuery) {
		// Only execute component methods if the old query string contained `bar`
		// and the new query string contains `foo`
		// Router Push로 새로운 쿼리값이 업데이트 되는 것을 확인
		// 'q' 검색어
		this.search(newQuery.q, newQuery.p, newQuery.sort);
	},
	*/
	beforeRouteEnter(to, from, next) {
		next(vm => {
			vm.$store.state.history = from.path;
			vm.prevRoute = from;
		});
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
			.$post('/web/completed', postData)
			.then(res => {
				return { list: res };
			})
			.catch(err => {
				console.log(err);
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
				.$post('/web/completed', postData)
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
			title: `SNKRS98 | 스니커즈98 - 발매완료`,
			description: `SNKRS98 | 스니커즈98 - 발매완료`,
			meta: [
				{
					hid: 'twitter:description',
					name: 'twitter:description',
					content: `SNKRS98 | 스니커즈98 - 발매완료`,
				},
				{
					hid: 'og:description',
					name: 'og:description',
					content: `SNKRS98 | 스니커즈98 - 발매완료`,
				},
			],
		};
	},
};
</script>

<style></style>
