<template>
	<div v-if="!iteminfo.errorMessage">
		<ItemInfo :release-detail="iteminfo"></ItemInfo>
		<client-only>
			<ItemVote
				v-if="
					iteminfo.data.vote.min_price > 0 &&
						iteminfo.data.recent_trade_price == 0
				"
				:vote-data="iteminfo.data"
				:is-voted="iteminfo.user.isVoted"
			></ItemVote>
		</client-only>
		<ItemRaffle
			v-if="iteminfo.raffles.length"
			:release-detail="iteminfo"
		></ItemRaffle>
		<ItemComment
			:comment="iteminfo.comment"
			@child-method="showComment"
		></ItemComment>
		<ItemMarket
			v-if="iteminfo.market.sales.length"
			:market="iteminfo.market"
			@child-method="updateData"
		></ItemMarket>
		<ItemRelated
			v-if="iteminfo.related.length"
			:related-items="iteminfo.related"
		></ItemRelated>
		<ItemDetail ref="itemDetail" :item="iteminfo"></ItemDetail>
		<ItemFooter
			v-if="iteminfo.raffles.length"
			v-show="footerVisible"
			:summary="iteminfo.data"
			:user="iteminfo.user"
			@child-method="showSizeSelector"
		></ItemFooter>
		<client-only>
			<slideout-panel></slideout-panel>
		</client-only>
	</div>
	<div v-else>
		<error></error>
	</div>
</template>

<script>
import ItemInfo from '@/components/item/ItemInfo.vue';
import ItemVote from '@/components/item/ItemVote.vue';
import ItemDetail from '@/components/item/ItemDetail.vue';
import ItemMarket from '@/components/item/ItemMarket.vue';
import ItemRaffle from '@/components/item/ItemRaffle.vue';
import ItemRelated from '@/components/item/ItemRelated.vue';
import ItemFooter from '@/components/item/ItemFooter.vue';
import ItemComment from '@/components/item/ItemComment.vue';
import SizeSelector from '@/components/item/SizeSelector.vue';
import Comment from '@/components/common/views/Comment.vue';
import error from '@/components/common/error.vue';
export default {
	components: {
		ItemInfo,
		ItemDetail,
		ItemVote,
		ItemMarket,
		ItemRaffle,
		ItemRelated,
		ItemComment,
		ItemFooter,
		error,
	},

	beforeRouteEnter(to, from, next) {
		next(vm => {
			vm.$store.state.history = from.path;
			vm.prevRoute = from;
		});
	},
	async asyncData({ route, params, app, store }) {
		const log = {
			to: { fullpath: route.fullPath, params: route.params },
			from: store.state.requestLog,
		};
		const postData = { size: -1, log };
		if (store.state.isLogin) {
			postData.size = store.state.userInfo.size;
		}
		return await app.$axios
			.$post('prod/' + params.id, postData)
			.then(res => {
				return { iteminfo: res };
			})
			.catch(err => {
				console.log(err);
			});
	},
	data() {
		return {
			log: null,
			scroll: null,
			footerVisible: true,
		};
	},
	created() {
		const layout = {
			hasHeader: true, // Header 여부
			hasNav: false, // Nav(발매정보 / 타임라인) 여부
			hasNavAction: false, // Header 타입
			navTransParent: false, // 투명도 설정
			hasFooter: false, // Footer 여부
		};
		this.$store.state.layout = layout;
		// eslint-disable-next-line nuxt/no-globals-in-created
	},
	mounted() {
		window.addEventListener('scroll', this.handleScroll);
	},
	destroyed() {
		window.removeEventListener('scroll', this.handleScroll);
	},
	methods: {
		handleScroll(event) {
			if (window.pageYOffset < 0) {
				return;
			}
			if (Math.abs(window.pageYOffset - this.lastScrollPosition) < 60) {
				return;
			}
			this.footerVisible = window.pageYOffset < this.lastScrollPosition;
			this.lastScrollPosition = window.pageYOffset;
		},
		async updateData(value) {
			const log = {
				to: { fullpath: this.$route.fullPath, params: this.$route.params },
				from: this.$store.state.requestLog,
			};
			const postData = { size: value.value, log };
			return await this.$axios
				.post('prod/' + this.$route.params.id, postData)
				.then(res => {
					this.$emit('update', res.data);
					return { iteminfo: res };
				})
				.catch(err => {
					console.log(err);
				});
		},
		showSizeSelector(data) {
			const panel1Handle = this.$showPanel({
				component: SizeSelector,
				openOn: 'bottom',
				height: 350,
				cssClass: 'slideout-custom',
				props: {
					// any data you want passed to your component
					currentSize: data.size,
				},
			});

			panel1Handle.promise.then(result => {
				if ('index' in result) {
					this.$emit('selector', result);
					this.updateData(result);
				}
			});
		},
		showComment() {
			const panel1Handle = this.$showPanel({
				component: Comment,
				height: '100%',
				openOn: 'bottom',
				cssClass: 'slideout-comment',
			});

			panel1Handle.promise.then(result => {});
		},
	},
	head() {
		const descText = `지금바로 ${this.iteminfo.data.name_kr}(${this.iteminfo.data.model})의 발매정보를 포함한 국내/해외 한정판 신발 응모/발매정보를 확인해보세요.`;
		return {
			title: `SNKRS98 | 스니커즈98 - ${this.iteminfo.data.name_kr}(${this.iteminfo.data.model})`,
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
					content: `${this.iteminfo.data.name_kr},  ${this.iteminfo.data.name}, model ${this.iteminfo.data.model}, colorway ${this.iteminfo.data.colorway}`,
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

<style>
::v-deep .slideout-panel .slideout-wrapper .slideout {
	transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
	transition-duration: 0.6s;
}
.slideout-custom {
	border-radius: 4% 4% 0 0;
}
</style>
