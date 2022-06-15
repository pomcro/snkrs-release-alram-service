<template>
	<div class="notice">
		<div class="notice_title">
			<h3 class="notice_type">공지사항</h3>
		</div>
		<div class="notice_info">
			<span class="date">{{ notice.updatedAt | datefilter }}</span
			><br />
			<p class="title">
				{{ notice.title }}
			</p>
		</div>
		<div class="notice_body">
			{{ notice.body }}
		</div>
		<div class="notice_tail">
			<nuxt-link to="/notice/">
				<button class="notice_list">
					목록보기
				</button>
			</nuxt-link>
		</div>
	</div>
</template>

<script>
import { datefilter } from '@/utils/datefilter.js';
export default {
	filters: {
		datefilter,
	},
	beforeRouteEnter(to, from, next) {
		next(vm => {
			vm.$store.state.history = from.path;
			vm.prevRoute = from;
		});
	},
	async asyncData({ app, params }) {
		return await app.$axios
			.$get('web/notice/get?id=' + params.id)
			.then(res => {
				return { notice: res };
			})
			.catch(err => {
				console.log(err);
			});
	},
	data() {
		return {};
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
	methods: {},
	head() {
		return {
			title: 'SNKRS98 | 스니커즈98 - 공지사항',
			meta: [
				{
					hid: 'twitter:description',
					name: 'twitter:description',
					content: `${this.notice.body}`,
				},
				{
					hid: 'og:description',
					name: 'og:description',
					content: `${this.notice.body}`,
				},
			],
		};
	},
};
</script>

<style scoped>
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
.notice_info {
	padding: 17px 0 19px;
	border-bottom: 1px solid #ebebeb;
	cursor: pointer;
}
.date {
	margin-bottom: 1px;
	display: inline-flex;
	font-size: 12px;
	line-height: 18px;
	letter-spacing: -0.06px;
}
.title {
	font-size: 15px;
	line-height: 22px;
	letter-spacing: -0.15px;
}
.notice_body {
	padding: 20px;
	word-break: keep-all;
	background-color: #fafafa;
	border-bottom: 1px solid #ebebeb;
	font-size: 14px;
	line-height: 20px;
	letter-spacing: -0.21px;
}
.notice_list {
	width: 100%;
	margin: 18px 0;
}
.notice_list {
	width: 100%;
	outline: none;
	border: 1px solid #d3d3d3;
	color: rgba(34, 34, 34, 0.8);
	border-radius: 6px;
	height: 37px;
	display: inline-block;
	cursor: pointer;
	vertical-align: middle;
	text-align: center;
	background-color: #fff;
}
.notice_tail a {
	color: rgba(34, 34, 34, 0.8);
	text-decoration: none;
}
</style>
