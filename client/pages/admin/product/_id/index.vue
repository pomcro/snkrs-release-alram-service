<template>
	<div v-if="!iteminfo.errorMessage" class="admin_mobile">
		<ItemAdminInfo :release-detail="iteminfo.data"></ItemAdminInfo>
		<ItemAdminVote :item="iteminfo.data"></ItemAdminVote>
		<ItemAdminDetail :item="iteminfo"></ItemAdminDetail>
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
import ItemAdminInfo from '@/components/admin/product/ItemAdminInfo.vue';
import ItemAdminVote from '@/components/admin/product/ItemAdminVote.vue';
import ItemAdminDetail from '@/components/admin/product/ItemAdminDetail.vue';
import error from '@/components/common/error.vue';
export default {
	middleware: 'adminAuthenticated',
	components: {
		ItemAdminInfo,
		ItemAdminDetail,
		ItemAdminVote,
		error,
	},
	async asyncData({ route, params, app, store }) {
		const log = {
			to: { fullpath: route.fullPath, params: route.params },
			from: store.state.requestLog,
		};
		const postData = { log };
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
		};
	},
	created() {
		const layout = {
			hasHeader: false, // Header 여부
			hasNav: false, // Nav(발매정보 / 타임라인) 여부
			hasNavAction: true, // Header 타입
			navTransParent: false, // 투명도 설정
			hasFooter: false, // Footer 여부
			title: '상품정보 수정',
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
		async deleteItem() {
			const result = await this.$axios.$post(
				'prod/' + this.$route.params.id + '/product/delete',
			);
			if (result) {
				this.$router.back();
			}
		},
		async updateItem() {
			this.$nuxt.$loading.start();
			// eslint-disable-next-line no-var
			var data = {};
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
				'prod/' + this.$route.params.id + '/product/edit',
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
	max-width: 430px;
	position: fixed;
	bottom: 0;
	width: 100%;
	height: 8%;
	font-size: 0.9rem;
	background: white;
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
