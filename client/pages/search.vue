<template>
	<div>
		<Grid :item-data="list" :view-type="'A'" @search-method="search"></Grid>
	</div>
</template>

<script>
import Grid from '@/components/common/layout/Grid.vue';
export default {
	components: {
		Grid,
	},
	watchQuery(newQuery, oldQuery) {
		// Only execute component methods if the old query string contained `bar`
		// and the new query string contains `foo`
		// Router Push로 새로운 쿼리값이 업데이트 되는 것을 확인
		// 'q' 검색어
		this.search(newQuery);
	},
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
		const postData = {
			query: route.query.q,
			page: route.query.p,
			sort: route.query.sort,
		};
		return await app.$axios
			.$post('/search', postData)
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
		async search(query) {
			this.$nuxt.$loading.start();
			const data = {
				fullPath: this.$route.fullpath,
				name: this.$route.name,
				query: this.$route.query,
			};
			this.$store.state.requestLog = data;
			const postData = {
				query: query.q,
				page: query.p,
				sort: query.sort,
			};
			return await this.$axios
				.$post('/search', postData)
				.then(res => {
					this.$emit('update', res);
					return { list: res };
				})
				.catch(err => {
					console.log(err);
				});
		},
	},
	head() {
		return {
			title: `SNKRS98 | 스니커즈98 - ${this.$route.query.q} 검색결과`,
			description: `SNKRS98 | 스니커즈98 - ${this.$route.query.q} 검색결과`,
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: `SNKRS98 | 스니커즈98 - ${this.$route.query.q} 검색결과`,
				},
				{
					hid: 'twitter:description',
					name: 'twitter:description',
					content: `SNKRS98 | 스니커즈98 - ${this.$route.query.q} 검색결과 페이지`,
				},
				{
					hid: 'og:description',
					name: 'og:description',
					content: `SNKRS98 | 스니커즈98 - ${this.$route.query.q} 검색결과 페이지`,
				},
			],
		};
	},
};
</script>

<style></style>
