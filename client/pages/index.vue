<template>
	<div class="main">
		<!-- need to  <client-only></client-only>-->
		<div>
			<div v-for="component in layout.components" :key="component.commponentId">
				<component :is="component.view_type" :item-data="component" />
			</div>
		</div>
		<a class="float" @click="showLiveChat()">
			c
		</a>
		<ChatInboxVue v-if="LiveChatVisible" class="live-chat"></ChatInboxVue>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import issue from '@/components/common/layout/ItemIssued.vue';
import list from '@/components/common/layout/ListItem.vue';
import swiper from '@/components/common/layout/SwiperItem.vue';
import swiper2 from '@/components/common/layout/SwiperSmallItem.vue';
import banner from '@/components/common/layout/Banner.vue';
import ChatInboxVue from '@/components/common/chat/ChatInbox.vue';
export default {
	components: {
		ChatInboxVue,
		issue,
		list,
		swiper,
		swiper2,
		banner,
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
		const layout = {
			hasHeader: true, // Header 여부
			hasNav: true, // Nav(발매정보 / 타임라인) 여부
			hasNavAction: false, // Header 타입
			navTransParent: false, // 투명도 설정
			hasFooter: true, // Footer 여부
		};
		store.state.layout = layout;
		const indexData = await app.$axios.get('prod/');
		store.commit('setData', indexData.data);
	},
	data() {
		return {
			LiveChatVisible: false,
			layouts: [],
			layout: {
				components: [],
			},
		};
	},
	computed: {
		...mapState(['mainData']),
	},
	mounted() {
		this.layouts = this.mainData.items;
		for (let i = 0; i < this.layouts.length; i++) {
			if (
				this.layouts[i].view_type === 'swiper' ||
				this.layouts[i].view_type === 'swiper2'
			) {
				if (this.layouts[i].data.length === 0) {
					continue;
				}
			}
			this.layouts[i].componentId = i;
			this.layout.components.push(this.layouts[i]);
		}
	},
	methods: {
		showLiveChat() {
			this.LiveChatVisible = !this.LiveChatVisible;
		},
	},

	// asyncData ({ params }) {
	//   return axios.get('https://api.snkrs98.com/v1/prod/')
	//     .then((res) => {
	//       return { title: res.data }
	//     })
	// }
};
</script>

<style scoped>
.main {
	margin-bottom: 3vh;
}
.live-chat {
	z-index: 999;
	position: fixed;
	bottom: 0;
	height: 45%;
}
.float {
	z-index: 999;
	position: fixed;
	width: 50px;
	height: 50px;
	bottom: 3%;
	right: 3%;
	background-color: #000;
	color: #fff;
	border-radius: 50px;
	text-align: center;
	box-shadow: 2px 2px 3px #999;
	line-height: 50px;
	text-decoration: none;
	outline: none;
}
</style>
