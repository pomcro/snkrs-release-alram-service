<template>
	<div class="notice">
		<div class="notice_title">
			<h3 class="notice_type">공지사항</h3>
		</div>

		<ul>
			<li v-for="(notice, index) in noticeList.data" :key="'notice_' + index">
				<div class="notice_box">
					<nuxt-link :to="'/notice/' + notice.id">{{ notice.title }}</nuxt-link>
				</div>
			</li>
		</ul>
		<client-only>
			<div class="pagination_list">
				<!-- first-last-button="true"
					:first-button-text="'<<'"
					:last-button-text="'>>'" -->
				<paginate
					:page-count="pages"
					:page-range="3"
					:margin-pages="1"
					:click-handler="pageUpdate"
					:prev-text="'<'"
					:next-text="'>'"
					:container-class="'pagination'"
					:page-class="'page-item'"
				>
				</paginate>
			</div>
		</client-only>
	</div>
</template>

<script>
export default {
	beforeRouteEnter(to, from, next) {
		next(vm => {
			vm.$store.state.history = from.path;
			vm.prevRoute = from;
		});
	},
	async asyncData({ route, app, store }) {
		return await app.$axios
			.$get('web/notice/list?page=1&size=10')
			.then(res => {
				return { noticeList: res };
			})
			.catch(err => {
				console.log(err);
			});
	},
	data() {
		return {
			noticeList: [],
			pages: 1,
			size: 10,
			currentPages: 1,
		};
	},
	created() {
		const layout = {
			hasHeader: false, // Header 여부
			hasNav: false, // Nav(발매정보 / 타임라인) 여부
			hasNavAction: true, // Header 타입
			navTransParent: false, // 투명도 설정
			hasFooter: false, // Footer 여부
			title: '공지사항',
		};
		this.$store.state.layout = layout;
	},
	mounted() {
		this.pages = parseInt(this.noticeList.total / this.size) + 1;
	},
	methods: {
		pageUpdate(pageNum, sort) {
			// this.$nuxt.$loading.start();
			// if (this.query.length > 0) {
			// 	this.$router.push({
			// 		path: '/search',
			// 		query: { q: this.query, p: pageNum, sort },
			// 	});
			// 	this.$emit('search-method', { q: this.query, p: pageNum, sort });
			// } else {
			// 	this.$router.push({ path: '/list', query: { p: pageNum, sort } });
			// 	this.$emit('list-method', { p: pageNum });
			// }
		},
	},
	head() {
		return {
			title: 'SNKRS98 | 스니커즈98 - 공지사항',
			meta: [
				{
					hid: 'twitter:description',
					name: 'twitter:description',
					content: 'SNKRS98의 모든 공지사항을 확인해보세요!',
				},
				{
					hid: 'og:description',
					name: 'og:description',
					content: 'SNKRS98의 모든 공지사항을 확인해보세요!',
				},
			],
		};
	},
};
</script>

<style scoped>
ul,
li {
	list-style: none;
}
a {
	color: black;
	text-decoration: none;
}
.notice {
	margin-top: 64px;
	padding: 20px;
}
.notice_type {
	font-size: 24px;
	font-weight: bold;
}
.notice_title {
	padding-bottom: 16px;
	border-bottom: 2px solid #222;
}
.notice_box {
	display: flex;
	padding: 17px 0 19px;
	align-items: center;
	border-bottom: 1px solid #ebebeb;
	cursor: pointer;
}
.pagination {
	margin: auto;
}
.pagination_list {
	display: flex;
	padding-top: 28px;
}
</style>
