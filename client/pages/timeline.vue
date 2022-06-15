<template>
	<div>
		<dateSwiper :async-timeline="asyncTimeline"></dateSwiper>
	</div>
</template>
<script>
import dateSwiper from '@/components/main/timelinepage/dateSwiper.vue';
export default {
	components: { dateSwiper },
	async asyncData({ route, params, app, store }) {
		const layout = {
			hasHeader: true, // Header 여부
			hasNav: true, // Nav(발매정보 / 타임라인) 여부
			hasNavAction: false, // Header 타입
			navTransParent: false, // 투명도 설정
			hasFooter: true, // Footer 여부
		};
		store.state.layout = layout;

		const data = {
			fullPath: route.fullpath,
			name: route.name,
			query: route.query,
		};
		store.state.requestLog = data;
		const today = new Date();
		const month = today.getMonth();
		const rmonth = month + 1;
		const year = today.getFullYear();
		return await app.$axios
			.$get('timeline?y=' + year + '&m=' + rmonth + '&cursor=1')
			.then(res => {
				return { asyncTimeline: res };
			})
			.catch(err => {
				console.log(err);
			});
	},
	head() {
		return {
			title: `SNKRS98 | 스니커즈98 - 발매정보 타임라인`, // asyncData에서 리턴한 user 데이터를 사용할 수 있다.
			content: '출시된 스니커즈들의 리스트를 확인해보세요!',
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: '출시된 스니커즈들의 리스트를 확인해보세요!',
				},
				{
					hid: 'twitter:description',
					name: 'twitter:description',
					content: `출시된 스니커즈들의 리스트를 확인해보세요!`,
				},
				{
					hid: 'og:description',
					name: 'og:description',
					content: `출시된 스니커즈들의 리스트를 확인해보세요!`,
				},
			],
		};
	},
	beforeRouteEnter(to, from, next) {
		next(vm => {
			vm.$store.state.history = from.path;
			vm.prevRoute = from;
		});
	},
};
</script>

<style></style>
