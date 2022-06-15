<template>
	<div v-if="!iteminfo.errorMessage">
		<ShopAdminInfo :release-detail="iteminfo.data"></ShopAdminInfo>
		<ShopdminDetail :item="iteminfo"></ShopdminDetail>
		<div class="btn-admin-group">
			<button class="btn-update" @click="updateItem">업데이트</button>
			<button class="btn-delete" @click="deleteItem">삭제</button>
		</div>
	</div>
	<div v-else>
		<error></error>
	</div>
</template>

<script>
import ShopAdminInfo from '@/components/admin/shop/ShopAdminInfo.vue';
import ShopdminDetail from '@/components/admin/shop/ShopAdminDetail.vue';
import error from '@/components/common/error.vue';
export default {
	middleware: 'adminAuthenticated',
	components: {
		ShopAdminInfo,
		ShopdminDetail,
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
		const postData = { id: route.query.id, log };
		return await app.$axios
			.$post('prod/' + params.id + '/shop/get', postData)
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
			title: '발매사이트 수정',
		};
		this.$store.state.layout = layout;
	},
	methods: {
		async deleteItem() {
			const data = { id: this.$route.query.id };
			const result = await this.$axios.$post(
				'prod/' + this.$route.params.id + '/shop/delete',
				data,
			);
			if (result) {
				this.$router.back();
			}
		},
		async updateItem() {
			this.$nuxt.$loading.start();
			// eslint-disable-next-line no-var
			var data = { id: this.$route.query.id };
			const tags = ['textarea', 'input', 'select'];
			for (let i = 0; i < tags.length; i++) {
				const tag = document.getElementsByTagName(tags[i]);
				for (let index = 0; index < tag.length; index++) {
					const id = tag[index].id;
					// eslint-disable-next-line no-var
					var value = tag[index].value;
					if (value.length === 0) {
						value = null;
					}
					data[id] = value;
				}
			}
			const result = await this.$axios.$post(
				'prod/' + this.$route.params.id + '/shop/edit',
				data,
			);
			this.$nuxt.$loading.finish();
			if (result === true) {
				this.$router.back();
			}
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
	flex: 0 0 75%;
	border: 0;
}
.btn-delete {
	color: black;
	background-color: rgba(157, 160, 162, 0.09);
	flex: 0 0 25%;
	border: 0;
}
</style>
