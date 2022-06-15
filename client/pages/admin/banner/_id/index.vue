<template>
	<div v-if="!iteminfo.errorMessage" class="admin_mobile">
		<BannerAdminInfo :banner="iteminfo"></BannerAdminInfo>
		<div class="btn-admin-group">
			<button class="btn-update" @click="updateItem">업데이트</button>
			<button class="btn-preview" @click="previewItem">미리보기</button>
		</div>
	</div>
	<div v-else>
		<error></error>
	</div>
</template>

<script>
import BannerAdminInfo from '@/components/admin/banner/BannerAdminInfo.vue';
import error from '@/components/common/error.vue';
export default {
	middleware: 'adminAuthenticated',
	components: {
		BannerAdminInfo,
		error,
	},
	async asyncData({ route, params, app, store }) {
		const log = {
			to: { fullpath: route.fullPath, params: route.params },
			from: store.state.requestLog,
		};
		const postData = { log };
		return await app.$axios
			.$get('web/banner/get?id=' + params.id, postData)
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
		};
	},
	created() {
		const layout = {
			hasHeader: false, // Header 여부
			hasNav: false, // Nav(발매정보 / 타임라인) 여부
			hasNavAction: true, // Header 타입
			navTransParent: false, // 투명도 설정
			hasFooter: false, // Footer 여부
			title: '배너정보 수정',
		};
		this.$store.state.layout = layout;
	},
	methods: {
		beforeRouteEnter(to, from, next) {
			next(vm => {
				vm.$store.state.history = from.path;
				vm.prevRoute = from;
			});
		},
		previewItem() {
			this.$emit('preview');
		},
		updateItem() {
			this.$emit('update');
		},
	},
};
</script>

<style>
.btn-admin-group {
	display: flex;
	position: fixed;
	bottom: 0;
	width: 100%;
	height: 8%;
	font-size: 0.9rem;
	background: white;
	max-width: 430px;
}
.btn-update {
	color: white;
	background: black;
	flex: 0 0 65%;
	border: 0;
}
.btn-preview {
	color: black;
	background-color: rgba(157, 160, 162, 0.09);
	flex: 0 0 35%;
	border: 0;
}
</style>
