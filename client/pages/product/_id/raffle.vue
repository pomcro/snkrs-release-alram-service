<template>
	<div>
		<ItemRaffleAll :detailraffle="raffles"></ItemRaffleAll>
	</div>
</template>

<script>
import ItemRaffleAll from '@/components/item/ItemRaffleAll.vue';
export default {
	components: {
		ItemRaffleAll,
	},
	beforeRouteEnter(to, from, next) {
		next(vm => {
			vm.$store.state.history = from.path;
			vm.prevRoute = from;
		});
	},
	async asyncData({ route, params, app, store }) {
		const data = {
			fullPath: route.fullpath,
			name: route.name,
			query: route.query,
		};
		store.state.requestLog = data;
		return await app.$axios.$get('prod/' + params.id + '/raffles').then(res => {
			return { raffles: res };
		});
	},
	created() {
		const layout = {
			hasHeader: false, // Header 여부
			hasNav: false, // Nav(발매정보 / 타임라인) 여부
			hasNavAction: true, // Header 타입
			navTransParent: false, // 투명도 설정
			hasFooter: false, // Footer 여부
			title: '발매정보',
		};
		this.$store.state.layout = layout;
	},
	head() {
		const descText = `${this.raffles.data.name_kr}(${this.raffles.data.model}) 실시간 전체 응모/발매정보`;
		return {
			title: `SNKRS98 | 스니커즈98 - ${this.raffles.data.name_kr}(${this.raffles.data.model}) 전체 발매정보`,
			description: descText,
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: descText,
				},
				{
					hid: 'keywords',
					name: 'keywords',
					content: `${this.raffles.data.name_kr},  ${this.raffles.data.name}, model ${this.raffles.data.model}, colorway ${this.raffles.data.colorway}`,
				},
				{
					hid: 'twitter:description',
					name: 'twitter:description',
					content: descText,
				},
				{
					hid: 'og:description',
					name: 'og:description',
					content: descText,
				},
				{
					hid: 'twitter:image',
					name: 'twitter:image',
					content: descText,
				},
				{
					hid: 'og:image',
					property: 'og:image',
					content: descText,
				},
			],
		};
	},
};
</script>

<style></style>
